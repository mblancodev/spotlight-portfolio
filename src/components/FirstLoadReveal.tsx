'use client'

import { useEffect, useState } from 'react'

export function FirstLoadReveal({ children }: { children: React.ReactNode }) {
  let [opened, setOpened] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOpened(true)
      return
    }
    let timeout = window.setTimeout(() => setOpened(true), 1200)
    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <div
      className={opened ? 'relative min-h-full w-full' : 'first-load-reveal relative min-h-full w-full'}
      onAnimationEnd={() => setOpened(true)}
    >
      {children}
    </div>
  )
}
