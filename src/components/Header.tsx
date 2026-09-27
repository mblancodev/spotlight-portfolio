'use client'

import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import clsx from 'clsx'

import { currentTime, onNote, start, stop } from '@/lib/ambient-night'

const links = [
  { href: '/', label: 'Home' },
  { href: '/work-experience', label: 'Work' },
  { href: '/projects', label: 'Projects' },
  { href: '/articles', label: 'Articles' },
  { href: '/about', label: 'About' },
]

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
    </svg>
  )
}

function rotatePoint(x: number, y: number, cssDeg: number) {
  let a = (-cssDeg * Math.PI) / 180
  let cos = Math.cos(a)
  let sin = Math.sin(a)
  let dx = x - 12
  let dy = y - 12
  return [12 + dx * cos - dy * sin, 12 + dx * sin + dy * cos]
}

/** Triangle outline, tip last-to-first, so each point has a short trip to the wave. */
function trianglePoints(cssDeg: number) {
  let verts = [
    [9, 6.2],
    [19, 12],
    [9, 17.8],
  ].map(([x, y]) => rotatePoint(x, y, cssDeg))
  let points: number[][] = []
  let perEdge = 9
  for (let edge = 0; edge < 2; edge++) {
    let from = verts[edge]
    let to = verts[edge + 1]
    for (let step = 0; step < perEdge; step++) {
      let u = step / perEdge
      points.push([
        from[0] + (to[0] - from[0]) * u,
        from[1] + (to[1] - from[1]) * u,
      ])
    }
  }
  return points
}

function MusicMark({ angle, active }: { angle: number; active: boolean }) {
  let pathRef = useRef<SVGPathElement>(null)
  let angleRef = useRef(angle)
  let activeRef = useRef(active)
  angleRef.current = angle
  activeRef.current = active

  useEffect(() => {
    // Each bell note becomes a pulse, released when its audio time arrives.
    let pending: { time: number; velocity: number }[] = []
    let pulse = 0
    let unsubscribe = onNote((_midi, velocity, time) => {
      pending.push({ time, velocity })
    })
    let blend = 0
    let from = 0
    let to = 0
    let since = performance.now()
    let level = 0
    let frame = 0
    let reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function draw(now: number) {
      let target = activeRef.current ? 1 : 0
      if (target !== to) {
        from = blend
        to = target
        since = now
      }
      let u = reduce ? 1 : Math.min(1, Math.max(0, (now - since) / 520))
      let eased = u * u * (3 - 2 * u)
      blend = from + (to - from) * eased
      let t = blend

      let audioNow = currentTime()
      while (pending.length && pending[0].time <= audioNow) {
        pulse = Math.max(pulse, pending.shift()!.velocity)
      }
      if (t > 0) {
        level += (pulse - level) * (pulse > level ? 0.04 : 0.02)
        pulse *= 0.97
      } else {
        level += (0 - level) * 0.08
        pending = []
        pulse = 0
      }

      let phase = reduce ? 0 : (now / 1000) * 0.85
      let amp = (3.6 + level * 2.4) * t
      let play = trianglePoints(angleRef.current * (1 - t))
      let d = ''
      for (let i = 0; i < 18; i++) {
        let waveX = 1.5 + (i / 17) * 21
        let waveY = 12 + Math.sin(i * 0.58 + phase) * amp
        let x = play[i][0] + (waveX - play[i][0]) * t
        let y = play[i][1] + (waveY - play[i][1]) * t
        d += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
      }
      if (t < 0.55) d += 'Z'

      let path = pathRef.current
      if (path) {
        path.setAttribute('d', d)
        path.setAttribute(
          'fill-opacity',
          (1 - Math.min(1, t / 0.65)).toFixed(3),
        )
        path.setAttribute('stroke-opacity', Math.min(1, t / 0.35).toFixed(3))
      }
      frame = requestAnimationFrame(draw)
    }

    frame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frame)
      unsubscribe()
    }
  }, [])

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="nav-music-icon h-4 w-5"
    >
      <path
        ref={pathRef}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function applyThemeClass(theme: 'light' | 'dark') {
  let root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(theme)
  root.style.colorScheme = theme
}

function ThemeToggle() {
  let { resolvedTheme, setTheme } = useTheme()
  let [mounted, setMounted] = useState(false)
  let revealing = useRef(false)
  let otherTheme: 'light' | 'dark' = resolvedTheme === 'dark' ? 'light' : 'dark'

  useEffect(() => {
    setMounted(true)
  }, [])

  function toggleTheme(event: React.MouseEvent<HTMLButtonElement>) {
    if (revealing.current) return

    let nextTheme = otherTheme
    let reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    let button = event.currentTarget
    let reveal = document.startViewTransition?.bind(document)

    let update = () => {
      applyThemeClass(nextTheme)
      flushSync(() => setTheme(nextTheme))
    }

    if (!reveal || reduceMotion) {
      update()
      return
    }

    let rect = button.getBoundingClientRect()
    let x = rect.left + rect.width / 2
    let y = rect.top + rect.height / 2
    let startRadius = rect.width / 2
    let endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )

    revealing.current = true
    let transition
    try {
      transition = reveal(() => {
        update()
      })
    } catch {
      revealing.current = false
      return
    }

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(${startRadius}px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 700,
            easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        )
      })
      .catch(() => {})

    transition.finished.finally(() => {
      revealing.current = false
    })
  }

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${otherTheme} theme` : 'Toggle theme'}
      className="focus-ring relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background ring-1 ring-foreground/8"
      onClick={toggleTheme}
    >
      {mounted && resolvedTheme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

function MusicToggle({ angle }: { angle: number }) {
  let [active, setActive] = useState(false)

  // Generative ambience from the Web Audio API; start() needs this click as its user gesture.
  function toggle() {
    let next = !active
    setActive(next)
    if (next) start().catch(() => setActive(false))
    else stop()
  }

  return (
    <button
      type="button"
      aria-label={active ? 'Pause music' : 'Play music'}
      aria-pressed={active}
      className="nav-music focus-ring inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-foreground"
      onClick={toggle}
    >
      <MusicMark angle={angle} active={active} />
    </button>
  )
}

export function Header() {
  let pathname = usePathname()

  return (
    <nav
      aria-label="Primary"
      // w-max: a fixed element at left-1/2 otherwise shrinks to half the viewport.
      className="fixed top-6 left-1/2 z-50 w-max max-w-[calc(100vw-2rem)] -translate-x-1/2"
    >
      <div className="nav-pill relative flex items-center overflow-hidden rounded-full border border-foreground/8 bg-background p-1.5 shadow-sm">
        <div className="nav-rail">
          <div className="nav-rail-inner">
            <ul className="flex items-center gap-0.5 whitespace-nowrap">
              {links.map((link) => {
                let active = isActive(pathname, link.href)
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={clsx(
                        'focus-ring inline-flex items-center justify-center rounded-full px-2 py-1.5 text-[13px] font-medium transition-colors sm:px-4 sm:text-sm',
                        active
                          ? 'text-foreground'
                          : 'text-foreground/60 hover:text-foreground',
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <MusicToggle angle={0} />
        <div className="nav-rail">
          <div className="nav-rail-inner nav-theme">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
