import Link from 'next/link'

import { Button } from '@/components/Button'
import { SocialLinks } from '@/components/SocialLinks'
import { contactEmail, copyrightYear } from '@/lib/site'

const links = [
  { href: '/about', label: 'About' },
  { href: '/articles', label: 'Articles' },
  { href: '/work-experience', label: 'Work' },
  { href: '/projects', label: 'Projects' },
]

export function Footer() {
  return (
    <footer className="relative mt-24 flex-none sm:mt-32">
      {/* Black in both themes; fades out where the link row's text starts (pb-20 + one line). */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[16.5rem] bg-linear-to-t from-neutral-500/25 to-transparent dark:from-black/60"
        aria-hidden="true"
      />
      <div
        className="h-px w-full bg-linear-to-r from-transparent via-foreground/30 to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto w-full max-w-[68.75rem] px-6 sm:px-10 lg:ml-[20vw] lg:pl-0">
        <div className="flex flex-col items-start gap-5 py-16 sm:py-20">
          <h2 className="font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Let’s build something
          </h2>
          <p className="max-w-[36ch] text-[15px] leading-normal tracking-tight text-foreground/65 sm:text-base">
            I’m co-founding Astrolle and open to senior full-stack roles. Email
            is the fastest way to reach me.
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <Button href={`mailto:${contactEmail}`}>Email me</Button>
            <Button href="/projects" variant="secondary">
              See my work
            </Button>
          </div>
          <SocialLinks />
        </div>
        <div className="flex flex-col items-start justify-between gap-4 pb-20 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm font-medium">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="focus-ring text-foreground/70 transition hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-sm text-foreground/50">
            &copy; {copyrightYear} Manuel Blanco
          </p>
        </div>
      </div>
    </footer>
  )
}
