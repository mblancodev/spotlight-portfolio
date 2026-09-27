// Generative ambient engine, "Night" variant. Tuned to A = 432 Hz. No dependencies.
// API: start(), stop(), toggle(), setVolume(0..1), isPlaying(), onNote(cb) where cb(midi, velocity, audioTime)
// Client-only: nothing here touches `window` or AudioContext until start() is called.

type Chord = { voices: number[]; bass: number }
type NoteListener = (midi: number, velocity: number, audioTime: number) => void

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext
  }
}

const A4 = 432;
const ROOT = 53;                       // F
const MODE = [0, 2, 4, 5, 7, 9, 11];   // Ionian
const BPM = 50;
const DENSITY = 0.3;
const BRIGHT = 700;                    // filter brightness (Hz)
const DEGREES = [0, 3, 5, 1, 2];       // I, IV, vi, ii, iii
const BEATS_PER_CHORD = 16;
const LOOKAHEAD = 3;                   // seconds; survives background-tab timer throttling

const hz = (m: number) => A4 * Math.pow(2, (m - 69) / 12);
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];

let ctx: AudioContext | null = null, master: GainNode, out: GainNode, revIn: GainNode, delayIn: GainNode, padBus: GainNode, lfoGain: GainNode;
let timer: ReturnType<typeof setInterval> | null = null, playing = false, volume = 0.7;
let nextBeat = 0, beat = 0, chord: Chord | null = null, degree = 0;
let melIdx = 7, phraseLeft = 0, restLeft = 0;
// Guard added: true while start() awaits ctx.resume(), so rapid toggles can't
// schedule a second interval, and a stop() during that gap cancels the start.
let starting = false;
const noteListeners = new Set<NoteListener>();

function impulse(sec: number, decay: number) {
  const c0 = ctx!;
  const len = c0.sampleRate * sec, buf = c0.createBuffer(2, len, c0.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c); let lp = 0;
    for (let i = 0; i < len; i++) {
      lp = lp * 0.72 + (Math.random() * 2 - 1) * 0.28;
      d[i] = lp * Math.pow(1 - i / len, decay);
    }
  }
  return buf;
}

function build() {
  ctx = new (window.AudioContext || window.webkitAudioContext!)();
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -20; comp.ratio.value = 3; comp.attack.value = 0.05; comp.release.value = 0.8;
  master = ctx.createGain(); master.gain.value = 0;
  out = ctx.createGain(); out.gain.value = volume;
  comp.connect(master).connect(out).connect(ctx.destination);

  const reverb = ctx.createConvolver(); reverb.buffer = impulse(7, 2.6);
  revIn = ctx.createGain(); revIn.gain.value = 0.9;
  const revOut = ctx.createGain(); revOut.gain.value = 0.75;
  revIn.connect(reverb).connect(revOut).connect(comp);

  delayIn = ctx.createGain(); delayIn.gain.value = 0.35;
  const dl = ctx.createDelay(3), dr = ctx.createDelay(3), fb = ctx.createGain(), dlp = ctx.createBiquadFilter();
  dlp.type = 'lowpass'; dlp.frequency.value = 1800; fb.gain.value = 0.42;
  dl.delayTime.value = dr.delayTime.value = (60 / BPM) * 0.75;
  const pl = ctx.createStereoPanner(), pr = ctx.createStereoPanner(); pl.pan.value = -0.6; pr.pan.value = 0.6;
  delayIn.connect(dl); dl.connect(dlp).connect(dr); dr.connect(fb).connect(dl);
  dl.connect(pl).connect(revIn); dr.connect(pr).connect(revIn); dl.connect(comp); dr.connect(comp);

  padBus = ctx.createGain(); padBus.gain.value = 0.5;
  padBus.connect(comp); padBus.connect(revIn);

  const lfo = ctx.createOscillator(); lfo.frequency.value = 0.045;
  lfoGain = ctx.createGain(); lfoGain.gain.value = 260; lfo.connect(lfoGain); lfo.start();

  const nb = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate), nd = nb.getChannelData(0); let last = 0;
  for (let i = 0; i < nd.length; i++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; nd[i] = last * 3.5; }
  const ns = ctx.createBufferSource(); ns.buffer = nb; ns.loop = true;
  const nf = ctx.createBiquadFilter(); nf.type = 'lowpass'; nf.frequency.value = 420;
  const ng = ctx.createGain(); ng.gain.value = 0.045;
  ns.connect(nf).connect(ng).connect(revIn); ng.connect(comp); ns.start();
}

function scaleNote(deg: number, base: number) {
  const d = ((deg % 7) + 7) % 7, o = Math.floor(deg / 7);
  return base + MODE[d] + 12 * o;
}
function makeChord(deg: number): Chord {
  const pcs = [2, 4, 6, 8].map((k) => scaleNote(deg + k, ROOT) % 12);
  const prev = chord ? chord.voices : [55, 59, 62, 66];
  const voices = pcs.map((pc, i) => {
    let best = 0, bd = 99;
    for (let m = 52; m <= 72; m++) if (m % 12 === pc) { const dd = Math.abs(m - prev[i]); if (dd < bd) { bd = dd; best = m; } }
    return best;
  });
  return { voices, bass: scaleNote(deg, ROOT - 24) };
}
function nextDegree() {
  const opts = DEGREES.filter((d) => d !== degree);
  return Math.random() < 0.35 && degree !== 0 ? 0 : pick(opts);
}

function pad(midi: number, t: number, dur: number, pan: number) {
  const c0 = ctx!;
  const f = hz(midi), g = c0.createGain(), flt = c0.createBiquadFilter(), p = c0.createStereoPanner();
  flt.type = 'lowpass'; flt.frequency.value = BRIGHT * 0.8; flt.Q.value = 0.6; lfoGain.connect(flt.frequency);
  p.pan.value = pan;
  const oscs = [-7, 7].map((c) => { const o = c0.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = c + rand(-2, 2); o.connect(flt); return o; });
  const sub = c0.createOscillator(); sub.type = 'sine'; sub.frequency.value = f / 2;
  const sg = c0.createGain(); sg.gain.value = 0.6; sub.connect(sg).connect(g); oscs.push(sub);
  flt.connect(g); g.connect(p).connect(padBus);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.05, t + 5);
  g.gain.setValueAtTime(0.05, t + dur);
  g.gain.linearRampToValueAtTime(0, t + dur + 7);
  oscs.forEach((o) => { o.start(t); o.stop(t + dur + 7.1); });
  sub.onended = () => { try { lfoGain.disconnect(flt.frequency); } catch (e) {} };
}
function bass(midi: number, t: number, dur: number) {
  const c0 = ctx!;
  const o = c0.createOscillator(), g = c0.createGain(); o.type = 'sine'; o.frequency.value = hz(midi);
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.14, t + 3);
  g.gain.setValueAtTime(0.14, t + dur); g.gain.linearRampToValueAtTime(0, t + dur + 5);
  o.connect(g).connect(padBus); o.start(t); o.stop(t + dur + 5.1);
}
function bell(midi: number, t: number, vel: number) {
  const c0 = ctx!;
  const f = hz(midi), g = c0.createGain(), p = c0.createStereoPanner();
  p.pan.value = rand(-0.45, 0.45);
  [[1, 1, 3.8], [2.001, 0.22, 1.4], [3, 0.06, 0.7], [0.5, 0.12, 3]].forEach(([r, a, d]) => {
    const o = c0.createOscillator(), og = c0.createGain();
    o.type = 'sine'; o.frequency.value = f * r;
    og.gain.setValueAtTime(0, t); og.gain.linearRampToValueAtTime(a * vel, t + 0.012);
    og.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(og).connect(g); o.start(t); o.stop(t + d + 0.05);
  });
  const lp = c0.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = BRIGHT * 2.4;
  g.gain.value = 0.22;
  g.connect(lp).connect(p); p.connect(revIn); p.connect(delayIn); p.connect(padBus);
  noteListeners.forEach((cb) => cb(midi, vel, t));
}

function melodyPool() {
  const pool: { m: number; w: number }[] = [];
  for (let d = 0; d < 14; d++) {
    const m = scaleNote(d, ROOT + 12);
    if (MODE[d % 7] === 6) continue;
    const inChord = chord && chord.voices.concat(chord.bass).some((v) => v % 12 === m % 12);
    pool.push({ m, w: inChord ? 3 : 1 });
  }
  return pool;
}
function schedBeat(t: number, b: number) {
  const spb = 60 / BPM;
  if (b % BEATS_PER_CHORD === 0) {
    degree = b === 0 ? 0 : nextDegree();
    chord = makeChord(degree);
    const dur = spb * BEATS_PER_CHORD;
    chord.voices.forEach((v, i) => pad(v, t, dur, [-0.5, -0.15, 0.15, 0.5][i]));
    bass(chord.bass, t, dur);
  }
  for (let s = 0; s < 2; s++) {
    const tt = t + (s * spb) / 2 + rand(-0.02, 0.03);
    if (restLeft > 0) { restLeft--; continue; }
    if (phraseLeft <= 0) {
      if (Math.random() < DENSITY * 0.5) phraseLeft = Math.floor(rand(3, 7));
      else { restLeft = Math.floor(rand(1, 5)); continue; }
    }
    if (Math.random() > (s === 0 ? 0.85 : 0.45)) continue;
    const pool = melodyPool();
    melIdx = Math.max(0, Math.min(pool.length - 1, melIdx + pick([-2, -1, -1, 1, 1, 2, 0, -3, 3])));
    let n = pool[melIdx];
    if (phraseLeft === 1) {
      const near = pool.map((p, i) => ({ p, i })).filter((x) => x.p.w > 1)
        .sort((a, b) => Math.abs(a.i - melIdx) - Math.abs(b.i - melIdx))[0];
      if (near) { melIdx = near.i; n = near.p; }
      restLeft = Math.floor(rand(3, 8));
    }
    bell(n.m, tt, rand(0.55, 1));
    if (Math.random() < 0.12) bell(n.m + 12, tt + spb * 0.01, 0.25);
    phraseLeft--;
  }
}
function tick() {
  while (nextBeat < ctx!.currentTime + LOOKAHEAD) {
    schedBeat(nextBeat, beat);
    nextBeat += 60 / BPM; beat++;
  }
}

// Must be called from a user gesture (click/tap/keydown) the first time.
export async function start() {
  if (playing || starting) return;
  starting = true;
  if (!ctx) build();
  const c = ctx!;
  await c.resume();
  // stop() arrived while resuming: honor it instead of starting.
  if (!starting) return;
  starting = false;
  master.gain.cancelScheduledValues(c.currentTime);
  master.gain.setTargetAtTime(1, c.currentTime, 1.2);
  nextBeat = c.currentTime + 0.15; beat = 0; chord = null; phraseLeft = 0; restLeft = 4;
  tick(); timer = setInterval(tick, 250);
  playing = true;
}
export function stop() {
  if (starting) { starting = false; return; }
  if (!playing) return;
  const c = ctx!;
  if (timer) clearInterval(timer); timer = null;
  master.gain.cancelScheduledValues(c.currentTime);
  master.gain.setTargetAtTime(0, c.currentTime, 0.8);
  playing = false;
  setTimeout(() => { if (!playing && !starting && ctx === c) { c.close(); ctx = null; } }, 4000);
}
export const toggle = () => (playing || starting ? stop() : start());
export const isPlaying = () => playing;
// Added: the audio clock, so visuals can line note pulses up with when they sound.
export const currentTime = () => (ctx ? ctx.currentTime : 0);
export function setVolume(v: number) {
  volume = Math.max(0, Math.min(1, v));
  if (ctx) out.gain.setTargetAtTime(volume, ctx.currentTime, 0.1);
}
export function onNote(cb: NoteListener) { noteListeners.add(cb); return () => { noteListeners.delete(cb); }; }
