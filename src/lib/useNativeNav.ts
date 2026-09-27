'use client'

import { useRouter } from 'next/navigation'

import { getLenis } from '@/app/providers'

type Router = ReturnType<typeof useRouter>

// Resolves the running view transition once the new route has rendered.
let pendingSwap: (() => void) | null = null

/** Called by PageTransition when the pathname changes. */
export function finishPageSwap() {
  pendingSwap?.()
  pendingSwap = null
}

/**
 * Page change used by links and programmatic navigation alike: glide to the
 * top, then crossfade with a view transition. It snapshots the whole page,
 * background included, so glass surfaces render correctly throughout.
 */
export function transitionTo(router: Router, href: string) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    router.push(href)
    return
  }

  function swap() {
    if (!document.startViewTransition) {
      router.push(href)
      return
    }
    // Marks this as a page change so the root snapshot gets the fade-in,
    // not the theme toggle's circular reveal.
    let root = document.documentElement
    root.classList.add('page-transition')
    let transition = document.startViewTransition(
      () =>
        new Promise<void>((resolve) => {
          pendingSwap = resolve
          router.push(href)
        }),
    )
    transition.finished.finally(() => root.classList.remove('page-transition'))
  }

  // A newer navigation replaces the pending scroll, so only the last one runs.
  let lenis = getLenis()
  if (lenis && window.scrollY > 0) {
    lenis.scrollTo(0, {
      duration: Math.min(0.9, 0.35 + window.scrollY / 5000),
      lock: true,
      onComplete: swap,
    })
  } else {
    swap()
  }
}

export function useNativeNav() {
  let router = useRouter()

  function go(
    href: string,
    _direction: 'forward' | 'back' | 'instant' = 'forward',
  ) {
    transitionTo(router, href)
  }

  return { go }
}
