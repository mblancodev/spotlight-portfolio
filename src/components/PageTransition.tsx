'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { finishPageSwap, transitionTo } from '@/lib/useNativeNav'

const UNIT = 'article, header, footer, .project-card, [data-mdx-content] > *'

function isUnit(el: Element) {
  return el.matches(UNIT)
}

function hasUnit(el: Element) {
  return Boolean(el.querySelector(UNIT))
}

function collect(el: Element, out: HTMLElement[]) {
  if (!(el instanceof HTMLElement)) return
  if (
    el.matches(
      'script, style, noscript, .flex-carousel, .drift-wall, .accordion-gallery, .masonry, .project-detail',
    )
  ) {
    return
  }

  if (isUnit(el)) {
    out.push(el)
    return
  }

  let children = [...el.children]
  if (children.length === 0) {
    if (el.id !== 'main-content') out.push(el)
    return
  }

  let mixed = children.some((child) => isUnit(child) || hasUnit(child))
  if (mixed) {
    for (let child of children) {
      if (isUnit(child)) out.push(child as HTMLElement)
      else if (hasUnit(child)) collect(child, out)
      else out.push(child as HTMLElement)
    }
    return
  }

  if (el.matches('p, h1, h2, h3, ul, ol, pre, figure, blockquote')) {
    out.push(el)
    return
  }

  for (let child of children) collect(child, out)
}

function reveal(el: HTMLElement, delay: number) {
  if (el.classList.contains('is-in') || !el.classList.contains('reveal')) return
  el.style.animationDelay = `${delay}ms`
  el.classList.add('is-in')
  el.addEventListener(
    'animationend',
    (event) => {
      if (event.target !== el) return
      if (event.animationName !== 'page-fade') return
      el.classList.remove('reveal', 'is-in')
      el.style.animationDelay = ''
    },
    { once: true },
  )
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  let pathname = usePathname()
  let router = useRouter()
  let rootRef = useRef<HTMLDivElement>(null)

  // The new route has rendered: let the view transition capture it.
  useLayoutEffect(() => {
    finishPageSwap()
  }, [pathname])

  // Internal link clicks go through the shared glide-and-crossfade navigation.
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }
      let link = (event.target as Element | null)?.closest('a')
      if (!link || link.target || link.hasAttribute('download')) return
      let url = new URL(link.href)
      if (
        url.origin !== location.origin ||
        url.pathname === location.pathname
      ) {
        return
      }

      // Capture phase runs before next/link, which skips prevented clicks.
      event.preventDefault()
      transitionTo(router, url.pathname + url.search + url.hash)
    }

    window.addEventListener('click', onClick, true)
    return () => window.removeEventListener('click', onClick, true)
  }, [router])

  useLayoutEffect(() => {
    let root = rootRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }
    let targets: HTMLElement[] = []
    for (let child of root.children) collect(child, targets)
    targets = [...new Set(targets)].filter((el) => {
      if (targets.some((other) => other !== el && el.contains(other))) {
        return false
      }
      let rect = el.getBoundingClientRect()
      return rect.width > 0 || rect.height > 0
    })

    let below: HTMLElement[] = []
    for (let el of targets) {
      let rect = el.getBoundingClientRect()
      if (rect.top >= window.innerHeight * 0.94 || rect.bottom <= 72) {
        below.push(el)
      }
    }

    for (let el of below) el.classList.add('reveal')

    let io: IntersectionObserver | undefined
    let frame = requestAnimationFrame(() => {
      io = new IntersectionObserver(
        (entries) => {
          let visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          visible.forEach((entry, index) => {
            let el = entry.target as HTMLElement
            io?.unobserve(el)
            reveal(el, index * 20)
          })
        },
        { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
      )

      for (let el of below) io.observe(el)
    })

    function settlePassed() {
      for (let el of targets) {
        if (
          !el.classList.contains('reveal') ||
          el.classList.contains('is-in')
        ) {
          continue
        }
        if (el.getBoundingClientRect().bottom < 72) {
          io?.unobserve(el)
          el.classList.remove('reveal')
          el.style.animationDelay = ''
        }
      }
    }

    window.addEventListener('scroll', settlePassed, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', settlePassed)
      io?.disconnect()
      for (let el of below) {
        el.classList.remove('reveal', 'is-in')
        el.style.animationDelay = ''
      }
    }
  }, [pathname])

  return (
    <div key={pathname} ref={rootRef} className="flex flex-auto flex-col">
      {children}
    </div>
  )
}
