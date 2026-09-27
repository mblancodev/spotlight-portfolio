import { AppBackground } from '@/components/AppBackground'
import { FirstLoadReveal } from '@/components/FirstLoadReveal'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { PageTransition } from '@/components/PageTransition'

function FrameCorner({ className }: { className: string }) {
  return (
    <svg
      className={className}
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      aria-hidden="true"
    >
      <path d="M0 0C0 34 16 50 50 50H0V0Z" fill="currentColor" />
    </svg>
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <FirstLoadReveal>
      <AppBackground />
      <div className="site-frame site-frame--top" aria-hidden="true" />
      <div className="site-frame site-frame--bottom" aria-hidden="true" />
      <div className="site-frame site-frame--left" aria-hidden="true" />
      <div className="site-frame site-frame--right" aria-hidden="true" />
      <FrameCorner className="site-corner site-corner--top-left" />
      <FrameCorner className="site-corner site-corner--top-right" />
      <FrameCorner className="site-corner site-corner--bottom-left" />
      <FrameCorner className="site-corner site-corner--bottom-right" />
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <div className="relative z-10 flex w-full flex-col">
        {/* Mirrors the footer's black fade at the top of the page. */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[16.5rem] bg-linear-to-b from-neutral-500/25 to-transparent dark:from-black/60"
          aria-hidden="true"
        />
        <Header />
        <PageTransition>
          <main id="main-content" className="flex-auto pt-24 sm:pt-28">
            {children}
          </main>
          <Footer />
        </PageTransition>
      </div>
    </FirstLoadReveal>
  )
}
