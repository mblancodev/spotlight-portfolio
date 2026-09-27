'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

import './HustleAgent.css'

/**
 * HustlePocket's agent mascot with its blink and breathe loops. The hop-in
 * entrance plays once, when the mascot scrolls into view.
 */
export function HustleAgent({
  markup,
  className,
}: {
  markup: string
  className?: string
}) {
  let ref = useRef<HTMLSpanElement>(null)
  let [hop, setHop] = useState(false)
  // The shadow copy needs its own ids so its gradients don't clash with the body's.
  let cast = markup
    .replace(/\bid="/g, 'id="cast-')
    .replace(/url\(#/g, 'url(#cast-')

  useEffect(() => {
    let el = ref.current
    if (!el) return
    let io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setHop(true)
        io.disconnect()
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <span
      ref={ref}
      className="agent-icon relative inline-block"
      data-hop={hop || undefined}
      aria-hidden="true"
    >
      {hop && (
        <span
          className="agent-icon-cast"
          dangerouslySetInnerHTML={{ __html: cast }}
        />
      )}
      <span
        className={clsx(
          'agent-icon-body block [&>svg]:block [&>svg]:h-full [&>svg]:w-full',
          className,
        )}
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    </span>
  )
}
