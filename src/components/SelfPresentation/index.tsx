import { Button } from '@/components/Button'
import { Todo } from '@/components/Todo'
import {
  astrolleGap,
  astrolleLead,
  astrollePersonality,
  contactEmail,
} from '@/lib/site'
import { SocialLinks } from '../SocialLinks'

export const SelfPresentation = ({
  shorten = false,
}: {
  shorten?: boolean
}) => (
  <div className="max-w-2xl">
    <h1 className="pointer-events-none text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
      Hey! I’m Manuel Blanco
    </h1>
    <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
      {shorten ? (
        <>
          <p className="pointer-events-none">
            I’m a senior frontend engineer and co-founder of Astrolle. I
            specialize in scalable React and TypeScript frontends, including
            microfrontends with Module Federation.
          </p>
          <p className="pointer-events-none">
            <Todo>TODO(manuel): one measurable result</Todo>
          </p>
          <p>
            {astrolleLead} <Todo>{astrolleGap}</Todo> {astrollePersonality}
          </p>
          <p className="pointer-events-none">
            Currently building a small 2D game with Lua and Love2D.
          </p>
          <Button
            href={`mailto:${contactEmail}`}
            className="max-w-full text-center whitespace-normal"
          >
            Open to senior frontend roles — email me
          </Button>
        </>
      ) : (
        <>
          <p className="pointer-events-none">I still play piano — amateur.</p>
          <p className="pointer-events-none">
            I’ve been obsessed with tech since the first time I cracked open a
            website and realized I could change it. From hacking together games
            as a teen to engineering SaaS and ERP platforms, this has always
            been more than a job. Same curiosity, better tools, more Git
            commits.
          </p>
        </>
      )}
    </div>
    <SocialLinks />
  </div>
)
