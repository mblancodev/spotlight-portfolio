import { type Metadata } from 'next'

import { Container } from '@/components/Container'
import GlassSurface from '@/components/GlassSurface'
import { SelfPresentation } from '@/components/SelfPresentation'
import { aboutDescription } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description: aboutDescription,
}

export default function About() {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:items-start lg:gap-x-16">
        <div className="lg:order-first">
          <SelfPresentation />
        </div>
        <div className="lg:max-w-md lg:justify-self-end">
          <div className="rounded-[2rem] border border-foreground/8 bg-background p-1.5 shadow-sm">
            <div className="overflow-hidden rounded-[1.6rem]">
              <div
                role="img"
                aria-label="Portrait placeholder"
                className="flex aspect-square w-full items-center justify-center bg-foreground/5 font-serif text-5xl text-foreground/25"
              >
                MB
              </div>
            </div>
          </div>
          <GlassSurface className="mt-6" borderRadius={16}>
            <div className="space-y-3 p-4 text-xs leading-relaxed tracking-tight text-foreground/65">
              <p>
                AI tooling: Custom agent workflows · Claude Code · Codex ·
                Cursor · Grok · Playwright · MCP
              </p>
              <p>
                Stack: React ⚛️ · TypeScript 💙 · Node.js 🟢 · Python 🐍 ·
                FastAPI 🚀 · MongoDB 🍃 · Supabase ⚡ · Docker 🐳 · Tailwind 🌀
                · Module Federation 🧩
              </p>
            </div>
          </GlassSurface>
        </div>
      </div>
    </Container>
  )
}
