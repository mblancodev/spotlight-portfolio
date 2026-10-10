import Image from 'next/image'

import { Section } from '@/components/CaseStudy'

const SITE = 'https://gwen-chi.vercel.app'

/** Gwen-only section for its case study: the marketing site, with captures of it. */
export function GwenShowcase() {
  return (
    <Section title="The marketing site">
      <p>
        Gwen has a site at{' '}
        <a href={SITE} target="_blank" rel="noreferrer">
          gwen-chi.vercel.app
        </a>
        . It is one static HTML file that Vercel serves as is, with no build
        step. The hero plays the bottom bar through a dictation, a translation,
        the wake word, and a hands-free take, so you see what the app does
        before you install anything.
      </p>
      <Image
        src="/projects/gwen/site-hero.jpg"
        alt="The Gwen site’s hero: “Dictate and translate in any app”, above a demo of the bottom bar over a Notes window"
        width={1600}
        height={1585}
      />
      <p>
        The features section covers what is not obvious from one take: the keys,
        the language chip on the idle bar, the words Gwen learns from your
        fixes, and “Hey Gwen”. Each card shows the piece of the bar it describes
        instead of an illustration.
      </p>
      <Image
        src="/projects/gwen/site-features.jpg"
        alt="The features section of the Gwen site, with cards for voice input, the language chip, learned words, and the Hey Gwen wake word"
        width={1600}
        height={1143}
      />
      <p>
        The site is also how Gwen is installed. It serves the script behind a
        one-line install that clones the repository, builds the app, and starts
        it at login, and it links a disk image for Apple silicon and Intel.
      </p>
      <Image
        src="/projects/gwen/site-install.jpg"
        alt="The install section of the Gwen site, with the one-line curl command and a Download for Mac button"
        width={1600}
        height={870}
      />
    </Section>
  )
}
