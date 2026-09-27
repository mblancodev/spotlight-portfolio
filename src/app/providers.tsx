'use client'

import { createContext, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { ThemeProvider, useTheme } from 'next-themes'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

function usePrevious<T>(value: T) {
  let ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

function ThemeWatcher() {
  let { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    let media = window.matchMedia('(prefers-color-scheme: dark)')

    function onMediaChange() {
      let systemTheme = media.matches ? 'dark' : 'light'
      if (resolvedTheme === systemTheme) {
        setTheme('system')
      }
    }

    onMediaChange()
    media.addEventListener('change', onMediaChange)

    return () => {
      media.removeEventListener('change', onMediaChange)
    }
  }, [resolvedTheme, setTheme])

  return null
}

let lenisInstance: Lenis | null = null

/** The active smooth scroller, or null when reduced motion is on. */
export function getLenis() {
  return lenisInstance
}

// Eases wheel scrolling for a slower, weightier feel. Touch keeps native scrolling.
function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let lenis = new Lenis({ autoRaf: true, lerp: 0.07, wheelMultiplier: 0.85 })
    lenisInstance = lenis
    return () => {
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  return null
}

export const AppContext = createContext<{ previousPathname?: string }>({})

export function Providers({ children }: { children: React.ReactNode }) {
  let pathname = usePathname()
  let previousPathname = usePrevious(pathname)

  return (
    <AppContext.Provider value={{ previousPathname }}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <ThemeWatcher />
        <SmoothScroll />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  )
}
