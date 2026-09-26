import { astrolleGap, astrolleLead, astrollePersonality } from '@/lib/site'

export type Project = {
  name: string
  logo: string
  summary: string
  summaryTodo?: string
  personality?: string
  role: string
  stack: string
  outcome: string
  link?: { href: string; label: string }
  repo?: string
  npm?: string
  demo?: string
  caseStudySlug?: string
}

export const projects: Project[] = [
  {
    name: 'Astrolle',
    logo: '🚀',
    summary: astrolleLead,
    summaryTodo: astrolleGap,
    personality: astrollePersonality,
    role: 'Co-Founder & Frontend Tech Lead',
    stack: 'TODO(manuel): stack you own at Astrolle.',
    outcome: 'TODO(manuel): one-line outcome with a real result.',
    link: { href: 'https://astrolle.com/', label: 'astrolle.com' },
    caseStudySlug: 'astrolle',
  },
  {
    name: 'Infrapedia',
    logo: '📔',
    summary:
      'Infrapedia is a tool that provides information about network and data center infrastructure.',
    role: 'Software Engineer',
    stack: 'TODO(manuel): stack used on Infrapedia.',
    outcome: 'TODO(manuel): one-line outcome with a real result.',
    link: { href: 'https://www.infrapedia.com/', label: 'infrapedia.com' },
    caseStudySlug: 'infrapedia',
  },
  {
    name: 'Amauz Group',
    logo: '🍝',
    summary:
      '3 small websites that represent the online presence of a restaurant group that offers dining services, online ordering, and events planning.',
    role: 'TODO(manuel): your role on Amauz Group.',
    stack: 'TODO(manuel): stack for the Amauz Group sites.',
    outcome: 'TODO(manuel): one-line outcome with a real result.',
    link: { href: 'https://www.amauzgroup.com/', label: 'amauzgroup.com' },
  },
  {
    name: 'Learn By Play',
    logo: '🎲',
    summary:
      'A free, donation-based platform for learning through play, open to the public.',
    role: 'TODO(manuel): your role on Learn By Play.',
    stack: 'TODO(manuel): stack for Learn By Play.',
    outcome: 'TODO(manuel): one-line outcome with a real result.',
    link: {
      href: 'https://learn-by-play-dusky.vercel.app/',
      label: 'learn-by-play-dusky.vercel.app',
    },
  },
  {
    name: 'Curated Lovers',
    logo: '💌',
    summary: 'A paid service currently in the making.',
    role: 'TODO(manuel): your role on Curated Lovers.',
    stack: 'TODO(manuel): stack for Curated Lovers.',
    outcome: 'TODO(manuel): one-line outcome with a real result.',
    link: {
      href: 'https://curated-lovers-0-1.vercel.app/',
      label: 'curated-lovers-0-1.vercel.app',
    },
  },
  {
    name: 'Timeline Range Picker',
    logo: 'TR',
    summary: 'TODO(manuel): one-sentence description of Timeline Range Picker.',
    role: 'TODO(manuel): your role on Timeline Range Picker.',
    stack: 'TODO(manuel): stack for Timeline Range Picker.',
    outcome: 'TODO(manuel): one-line outcome with a real result.',
    repo: 'TODO(manuel): GitHub repo URL',
    npm: 'TODO(manuel): npm page URL',
    demo: 'TODO(manuel): demo URL',
    caseStudySlug: 'timeline-range-picker',
  },
]
