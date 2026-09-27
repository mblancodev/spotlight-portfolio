'use client'

import { useContext } from 'react'
import { AppContext } from '@/app/providers'
import { useNativeNav } from '@/lib/useNativeNav'
import { Container } from '@/components/Container'
import GlassSurface from '@/components/GlassSurface'
import { Prose } from '@/components/Prose'
import { formatDate } from '@/lib/formatDate'

function ArrowLeftIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArticleLayout({
  article,
  aside,
  children,
}: {
  article: {
    title: string
    date?: string
  }
  aside?: React.ReactNode
  children: React.ReactNode
}) {
  let { go } = useNativeNav()
  let { previousPathname } = useContext(AppContext)

  return (
    <Container>
      <div>
        <div className="max-w-2xl">
          {previousPathname && (
            <button
              type="button"
              onClick={() => go(previousPathname, 'back')}
              aria-label="Go back to articles"
              className="focus-ring group mb-8 flex h-10 w-10 items-center justify-center rounded-full border border-foreground/8 bg-background transition"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-foreground/60 transition group-hover:stroke-foreground" />
            </button>
          )}
          <article className="relative">
            <header className="flex flex-col">
              <h1 className="mt-6 font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
                {article.title}
              </h1>
              {article.date && (
                <time
                  dateTime={article.date}
                  className="order-first text-sm tracking-tight text-foreground/50"
                >
                  {formatDate(article.date)}
                </time>
              )}
            </header>
            <GlassSurface borderRadius={24} refraction={false} className="mt-8">
              {/* Trim the outer margins so the panel padding sets the spacing. */}
              <Prose
                className="px-6 py-8 sm:px-10 [&>:first-child]:mt-0 [&>:first-child>:first-child]:mt-0 [&>:last-child]:mb-0 [&>:last-child>:last-child]:mb-0"
                data-mdx-content
              >
                {children}
              </Prose>
            </GlassSurface>
            {aside && (
              // Right of the 42rem column to the viewport edge (less scrollbar), from
              // the title down to the end of the panel. Sticks below the nav on scroll.
              <div className="absolute top-6 bottom-0 left-full hidden w-[calc(80vw-42rem-1.25rem)] xl:block">
                <div className="sticky top-28 h-[calc(100vh-7rem)]">
                  {aside}
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    </Container>
  )
}
