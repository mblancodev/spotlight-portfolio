import { type Metadata } from 'next'
import Image from 'next/image'

import { Container } from '@/components/Container'
import portraitImage from '@/images/portrait.png'
import { SocialLinks } from '@/components/SocialLinks'
import { SelfPresentation } from '@/components/SelfPresentation'

export const metadata: Metadata = {
  title: 'About',
  description:
    "I'm Manuel Blanco. I'm a senior dev and entrepreneur, basically obsessed with building web stuff that helps businesses blow up",
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
          <p className="pointer-events-none mt-10 rounded-lg border border-gray-100 p-4 text-xs text-zinc-600 dark:border-zinc-400/10 dark:text-zinc-400">
            React ⚛️ · TypeScript 💙 · Vite ⚡ · Zustand/ReduxToolkit 💡 ·
            Tailwind 🌀 · Module Federation 🧩 · Node.js 🟢 · Docker 🐳 · Python
            🐍 · MongoDB 🍃
          </p>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <SelfPresentation />
        </div>
        <div className="lg:pl-20">
          <SocialLinks altStyles />
        </div>
      </div>
    </Container>
  )
}
