import { SocialLinks } from '../SocialLinks'

export const SelfPresentation = ({ shorten = false }: { shorten?: boolean }) => (
  <div className="max-w-2xl">
    <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
      Hey there! 👋🏼 {"I'm"} Manuel Blanco{' '}
      {shorten
        ? null
        : ', a Senior Developer specialized in building scalable web applications.'}
    </h1>
    <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
      {shorten ? (
        <p>
          So, {"I'm"} a senior dev and entrepreneur, basically obsessed with
          building web stuff that helps businesses blow up. I co-founded
          Astrolle, where {"we're"} cooking up some cool tech that lets companies
          run their own show and actually see some serious wins. Basically, I
          just love turning wild ideas into real, digital things that actually
          make a difference.
        </p>
      ) : (
        <>
          <p>
            Seriously, {"I've"} been a tech nerd since forever. My coding journey
            kicked off when I realized I could mess with website files and
            actually change stuff—total game-changer! That little spark turned
            into a full-on obsession, and before I knew it, I was hacking
            together games, throwing up websites, and basically bending the
            internet to my will.
          </p>
          <p>
            Now, {"I'm"} deep into building SaaS and ERP apps, trying to see how far
            we can push things with all the cool web tech out there. But
            honestly, {"I'm"} still just that kid who loves to tinker and figure
            stuff out. Only now, I get to build tools that help businesses,
            connect people, and make ideas real.
          </p>
          <p>{"Let's"} make some awesome stuff happen! 🚀</p>
        </>
      )}
    </div>
    <SocialLinks />
  </div>
)
