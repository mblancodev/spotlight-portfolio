import { astrolleLead, astrollePersonality } from '@/lib/site'

export type Project = {
  name: string
  logo: string
  /** Image shown in place of the text logo. */
  logoImage?: string
  /** White artwork: shown inverted (black) in the light theme. */
  logoInvertInLight?: boolean
  /** A bright image among dark ones: toned down in the dark theme. */
  imageTone?: 'light'
  /** CSS-animated sprite shown in place of the text logo (see tailwind.css). */
  logoSprite?: 'duck-waddle'
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
  section: 'professional' | 'personal'
  /** Shown on professional entries. Use a TODO when the site has no dates. */
  dates?: string
  /** Shown as a badge on personal projects. */
  status?: string
  /** Public image path. Empty keeps the monogram well. */
  image?: string
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.caseStudySlug === slug)
}

export function projectHref(project: Project) {
  if (!project.caseStudySlug) return undefined
  if (project.section === 'personal')
    return `/projects/${project.caseStudySlug}`
  return `/work-experience/${project.caseStudySlug}`
}

export const projects: Project[] = [
  {
    name: 'Astrolle',
    logo: '🚀',
    logoImage: '/projects/astrolle-logo.png',
    summary: astrolleLead,
    personality: astrollePersonality,
    role: 'Co-founder and Lead Engineer',
    stack:
      'TypeScript and React micro-frontends, React Router, Zustand, Redux Toolkit, Tailwind CSS, MongoDB, and NATS over WebSockets, with GitHub Actions, Docker, and Azure for CI/CD and deployment. A shared component library is used by every module.',
    outcome:
      '15 product modules shipped and live with companies in retail, agribusiness, construction, and services. Custom agent workflows have handled more than 250 requirements.',
    link: { href: 'https://astrolle.com/', label: 'astrolle.com' },
    caseStudySlug: 'astrolle',
    section: 'professional',
    dates: 'Sep 2025 — Present',
    image: '/projects/astrolle-hero.jpg',
  },
  {
    name: 'Neostella',
    logo: 'N',
    logoImage: '/projects/neostella-logo.png',
    summary: '[Draft]',
    role: 'Front End Engineer II',
    stack: 'TODO(manuel): key technologies.',
    outcome: 'TODO(manuel): one concrete result.',
    link: { href: 'https://neostella.com/', label: 'neostella.com' },
    section: 'professional',
    dates: 'May 2025 — Sep 2025',
    image: '/projects/neostella-hero.jpg',
  },
  {
    name: 'Infrapedia',
    logo: '📔',
    logoImage: '/projects/infrapedia-logo.png',
    summary:
      'The interactive map network engineers use to explore the internet’s physical infrastructure. I owned the frontend end to end.',
    role: 'Frontend developer',
    stack: 'Vue.js, Vuex, Sass, Mapbox GL, and MongoDB.',
    outcome:
      'A production map the operator community uses. Editors grow the dataset without a developer, and the map stays usable on phones and mid-range laptops.',
    link: { href: 'https://www.infrapedia.com/', label: 'infrapedia.com' },
    caseStudySlug: 'infrapedia',
    section: 'professional',
    dates: '2019 — 2022',
    image: '/projects/infrapedia-map.jpg',
    imageTone: 'light',
  },
  {
    name: 'Amauz Group',
    logo: '🍝',
    logoImage: '/projects/amauz-group-logo.png',
    logoInvertInLight: true,
    summary:
      'One domain, three restaurant brands. Each has its own site for menus, ordering, and reservations, run from tools the owner already uses.',
    role: 'Freelance full-stack developer',
    stack:
      'Next.js on Vercel, responsive CSS, per-restaurant subdomains, and SEO plus Open Graph and Twitter metadata. Menus, feedback, and contact use Google Drive, Google Forms, and WhatsApp.',
    outcome:
      'Three branded, mobile-first restaurant sites on one domain. The owner updates content without a developer.',
    link: { href: 'https://www.amauzgroup.com/', label: 'amauzgroup.com' },
    caseStudySlug: 'amauz-group',
    section: 'professional',
    dates: 'Jan 2022',
    image: '/projects/amauz-group-hero.jpg',
  },
  {
    name: 'CuikLearn',
    logo: '🎲',
    logoSprite: 'duck-waddle',
    summary:
      'Learning paths made of short games. Upload your notes and a Python API uses Claude to turn them into a playable course.',
    role: 'Sole developer',
    stack:
      'React 18, TypeScript, and Vite, with a Python FastAPI backend and the Claude API. Supabase, deployed on Vercel.',
    outcome:
      'Live on the Vercel and Supabase free tiers, and no longer maintained. It was a learning ground for React architecture, a Python API, and structured model output.',
    link: {
      href: 'https://learn-by-play-dusky.vercel.app/',
      label: 'learn-by-play-dusky.vercel.app',
    },
    caseStudySlug: 'cuiklearn',
    section: 'personal',
    status: 'Live · No longer maintained',
    image: '/projects/cuiklearn-italian.jpg',
  },
  {
    name: 'Curated Lovers',
    logo: '💌',
    logoImage: '/projects/curated-lovers-logo.svg',
    summary:
      'Matchmaking without swiping. Human curators vet members and invite them to blind dates and small events. Now in waitlist mode.',
    role: 'Sole developer and product owner',
    stack:
      'Next.js, Supabase, and Resend on Vercel. English and Spanish, with SEO metadata and generated Open Graph images.',
    outcome:
      'The public site is live and collecting waitlist sign-ups. The operational side of the service is still in progress.',
    link: {
      href: 'https://www.curated-lovers.com',
      label: 'curated-lovers.com',
    },
    caseStudySlug: 'curated-lovers',
    section: 'personal',
    status: 'Live · Waitlist',
    image: '/projects/curated-lovers-hero.jpg',
  },
  {
    name: 'Gwen',
    logo: '🎙️',
    logoImage: '/projects/gwen-logo.png',
    summary:
      'Dictation and translation in any Mac app. Hold a key, speak, and the text is pasted at the cursor. Speech and translation stay on the Mac.',
    role: 'Sole developer',
    stack:
      'Swift and AppKit for the menu bar app and bottom bar, Python for the listener, a local whisper.cpp server for speech-to-text, and Apple’s on-device Translation framework.',
    outcome:
      'Open source under the MIT license. Dictation with rule-based punctuation in English and Spanish, translation across six languages, and a gwen:// URL scheme other apps can call.',
    link: {
      href: '/articles/gwen-local-dictation-and-translation-for-macos',
      label: 'Launch post',
    },
    repo: 'https://github.com/mblancodev/gwen',
    demo: 'https://gwen-chi.vercel.app',
    caseStudySlug: 'gwen',
    section: 'personal',
    status: 'Open source · MIT',
    image: '/projects/gwen-hero.jpg',
  },
  {
    name: 'HustlePocket',
    logo: 'HP',
    logoImage: '/projects/hustlepocket-logo.png',
    summary:
      'A job-search board your own AI agent can work in. Postings, your CV, and browser captures in one place, connected over MCP.',
    role: 'Sole developer',
    stack:
      'React, TypeScript, Vite, and Tailwind CSS. Node.js with Express. Appwrite for the database, file storage, and authentication. PDF parsing and generation, an MCP server, and a Chrome extension.',
    outcome:
      'Running locally: the board, the Companion extension, and an MCP server. An agent can import a posting, and CV edits patch the uploaded PDF instead of replacing it.',
    caseStudySlug: 'hustlepocket',
    section: 'personal',
    status: 'Coming soon',
    image: '/projects/hustlepocket-board.jpg',
  },
  {
    name: 'MichelleOS',
    logo: 'M',
    summary:
      'A personal voice assistant that runs on your Mac. It keeps one memory of your world, answers from evidence, and asks for Touch ID before it changes anything that matters.',
    role: 'Sole developer and product owner',
    stack:
      'Python and Swift on macOS, local Whisper speech-to-text and Kokoro text-to-speech, SQLite, WebAuthn passkeys, MCP, and launchd, with Claude and Codex behind a provider-agnostic model router.',
    outcome:
      'In private alpha on my own machine, with a signed installer and release channel. It speaks four languages, delivers daily briefings, and runs background skills that report what they did.',
    caseStudySlug: 'michelleos',
    section: 'personal',
    status: 'Private alpha',
  },
]
