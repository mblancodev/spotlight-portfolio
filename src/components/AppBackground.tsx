'use client'

import { useTheme } from 'next-themes'

import GhostFibers from '@/components/GhostFibers'

export function AppBackground() {
  let { resolvedTheme } = useTheme()

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <GhostFibers lightMode={resolvedTheme === 'light'} />
    </div>
  )
}
