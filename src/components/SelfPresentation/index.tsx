import { SocialLinks } from '../SocialLinks'

export const SelfPresentation = ({
  shorten = false,
}: {
  shorten?: boolean
}) => (
  <div className="max-w-2xl">
    {' '}
    <h1 className="pointer-events-none text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
      Hey! I’m Manuel Blanco
      {shorten
        ? null
        : '— a Senior Frontend Developer who builds scalable web apps that don’t just look good, they get stuff done.'}
    </h1>
    <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
      {shorten ? (
        <>
          <p className="pointer-events-none">
            I’m a Senior Developer and entrepreneur, borderline obsessed with
            building web products that help businesses level up. I co-founded
            Astrolle, where we’re crafting tech that puts companies in control —
            helping them streamline operations, scale faster, and actually win.
            Not just dashboards and features — real impact. For me, it’s all
            about taking bold ideas, breaking them down, and turning them into
            sleek, functional digital products that actually move the needle.
            Let’s be real: building the future is way more fun when it works and
            looks good.
          </p>
          <p className="pointer-events-none">
            — Currently diving into Lua 🧠 and Love2D 🎮, building a fun,
            fast-paced 2D game. Small in scope, but big on creativity
          </p>
        </>
      ) : (
        <>
          <p className="pointer-events-none">
            These days, I’m all about pushing the limits of modern web tech —
            React, Vite, Tailwind, Module Federation, you name it — and turning
            complex problems into clean, performant, human-friendly interfaces.
          </p>
          <p className="pointer-events-none">
            I’ve been obsessed with tech since the first time I cracked open a
            website and realized, “Wait, I can actually change this?” That
            moment lit the fuse — and I’ve been deep in the code ever since.
            From hacking together games as a teen to engineering full-blown SaaS
            and ERP platforms today, this has always been more than just a job —
            it’s my playground.
          </p>
          <p className="pointer-events-none">
            Still the same curious kid at heart. Just with better tools and a
            lot more Git commits.
          </p>
        </>
      )}
    </div>
    <SocialLinks />
  </div>
)
