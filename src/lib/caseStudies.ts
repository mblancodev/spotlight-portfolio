export type CaseStudy = {
  slug: string
  title: string
  description: string
  /** Hidden from production builds. Shown in `next dev`. */
  draft: boolean
  problem: string
  role: string
  constraints: string
  decisions: string[]
  outcome: string
  screenshots?: string
  stack: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'astrolle',
    title: 'Astrolle',
    description:
      'How I lead Astrolle’s 15-module micro-frontend platform, its CI/CD on Azure, and agent workflows that turned 250+ requirements into tested pull requests.',
    draft: false,
    problem:
      'Astrolle centralizes a company’s information and automates repetitive work across clients, sales, scheduling and reservations, automations, team management, forms, and reporting. Work is defined once, as stages with their own rules, and each task is assigned in real time to whoever is best placed to do it: a person, an AI agent, a robot, or a drone.',
    role: 'Co-founder and Lead Engineer (Head of Web Engineering) at Astrolle Inc, from Sep 2025. I lead the web platform’s architecture and development, design the data structures behind its modules, and own configuration, deployment, and the CI/CD pipelines for each application. I hired three of the current engineers and handle most code reviews.',
    constraints:
      'Each product module has to be owned by its own team and deployed on its own, so a new product line does not require changing the others. The same workflow has to be assignable to a person, an AI agent, or a machine.',
    decisions: [
      'Each product module is an independent micro-frontend. A container application delegates navigation, and each module owns its routes with React Router.',
      'An in-house library of components and utilities is released by version and shared by every application, so design and behavior stay consistent.',
      'Earlier modules use Redux Toolkit. New modules, especially the editors, use Zustand.',
      'The workflow and approval editor configures Glup events and approval flows. An API validates the requests and forwards them to a workflow service.',
      'The container shows live notifications with NATS over WebSockets.',
      'Each micro-frontend has its own GitHub Actions pipeline that builds a Docker image and deploys it to Azure, so a team can release its module without redeploying the others.',
      'Requirements go through custom agent workflows built with Claude Code, Codex, Cursor, and Grok. A spoken requirement is transcribed, then structured by a custom skill into a plan for new or ongoing work. The agent implements it with tests and checks it end to end with Playwright. It opens a pull request only after an engineer approves the changes.',
    ],
    outcome:
      'Astrolle has shipped 15 product modules and is live with companies in retail, agribusiness, construction, and services. TODO(manuel): active users. The modular architecture lets teams ship in parallel and add product lines without reworking existing modules, and the agent workflows have handled more than 250 requirements so far.',
    stack:
      'TypeScript, React, micro-frontends with React Router, Zustand, Redux Toolkit, Tailwind CSS, MongoDB, and NATS over WebSockets (nats.ws). An in-house component and utilities library is shared across the applications. CI/CD runs on GitHub Actions, with Docker images deployed to Azure. Agent workflows use Claude Code, Codex, Cursor, and Grok, with Playwright for end-to-end tests.',
  },
  {
    slug: 'infrapedia',
    title: 'Infrapedia',
    description:
      'Building a Mapbox GL map of submarine cables, fiber, datacenters, and exchange points, with on-map editors and performance that holds up on everyday devices.',
    draft: false,
    problem:
      'Network engineers, NOC teams, and telecom business development professionals needed one map of the internet’s physical infrastructure: submarine cables, terrestrial fiber, datacenters, and internet exchange points.',
    role: 'Frontend developer at Infrapedia Inc, 2019–2022, with full ownership of the client application. With no design team, I made the UI, UX, layout, and visual decisions, and I owned the architecture and implementation. I coordinated API contracts and data structures with the backend developer and reported to a Germany-based product owner. Meetings, planning, and communication were in English.',
    constraints:
      'There was no design team. The map had to render large, dense geospatial datasets smoothly on phones and mid-range laptops, not only on high-end machines. API contracts were shared with a backend developer, and the team worked across time zones.',
    decisions: [
      'Built the Mapbox GL map from scratch, with layered data for submarine cables, terrestrial fiber, datacenters, and internet exchange points, plus search and detail views for each asset.',
      'Built custom editors so people can draw, edit, and manage cable routes, networks, and facilities on the map, with create, read, update, and delete for each asset type.',
      'Optimized rendering and data handling so dense datasets stay usable on mobile devices and mid-range laptops.',
      'Designed the interface for a professional audience working with a dense technical dataset, without a separate design team.',
    ],
    outcome:
      'Shipped a production mapping application used by the global network operator community. The editors let the dataset grow without a developer, and the performance work made the map usable on the devices that audience actually uses. I owned the frontend end to end in a distributed, English-speaking team.',
    stack: 'Vue.js, Redux, Sass, Mapbox GL, and MongoDB.',
  },
  {
    slug: 'amauz-group',
    title: 'Amauz Group',
    description:
      'A freelance Next.js build that gave three restaurants branded, mobile-first sites with near-zero running costs.',
    draft: false,
    problem:
      'A small restaurant group needed an online presence for three distinct brands without the cost or upkeep of a custom ordering system.',
    role: 'Freelance full-stack developer. I handled requirements with the owner, information architecture, UI design, development, domain and subdomain setup, and deployment.',
    constraints:
      'The site could not depend on a custom ordering system. Staff had to update menus, handle orders, and review feedback without touching code.',
    decisions: [
      'A central group site routes customers to a dedicated page for each restaurant.',
      'Subdomain routing gives each restaurant its own URL on a single Vercel deployment, at no extra hosting cost.',
      'Menu, online ordering, reservations, feedback, and contact link out to Google Drive, Google Forms, WhatsApp, and the owner’s existing ordering and reservation tools.',
      'Each restaurant page has its own SEO and Open Graph and Twitter metadata.',
      'A data-processing policy page covers Colombian data protection law.',
    ],
    outcome:
      'Three restaurants gained branded, mobile-first web presences under one domain, with a unified path from browsing to ordering, booking, and reviewing. The owner updates menus, orders, and feedback in tools they already manage, so content maintenance needs no developer and running costs stay near zero.',
    stack:
      'Next.js (React) on Vercel, responsive CSS, and subdomain-based routing. SEO and Open Graph and Twitter metadata are set per restaurant. Menus come from Google Drive, feedback from Google Forms, and contact from WhatsApp, plus external ordering and reservation links.',
  },
  {
    slug: 'curated-lovers',
    title: 'Curated Lovers',
    description:
      'A bilingual matchmaking platform with authentication, a waitlist, and city pages, built end to end on Next.js and Supabase.',
    draft: false,
    problem:
      'Curated Lovers is a matchmaking service positioned as an alternative to dating apps: no swiping, no algorithm. Members are vetted and matched by human curators, then invited to blind dates or small curated events.',
    role: 'Sole developer and product owner. I defined the product concept, brand, and user experience, and designed and built the platform end to end, from UI and content to backend, authentication, email, and deployment.',
    constraints:
      'The website is the public face and entry point, and it is in waitlist mode ahead of launch. The operational side of the service is still in progress. The site has to work in English and Spanish.',
    decisions: [
      'Registration, login, and the waitlist run on Supabase authentication and the database.',
      'Resend sends waitlist and account email, plus a newsletter subscription.',
      'Four launch cities — Medellín, Bogotá, Cali, and Caracas — each have a page, and the events list can be filtered by city.',
      'Service pages cover blind dates and curated events, alongside an FAQ, founder story, contact page, and terms and privacy policy.',
      'Locale-based routing covers the whole site in English and Spanish, with SEO metadata and dynamically generated Open Graph images.',
    ],
    outcome:
      'The website is finished and live, collecting waitlist sign-ups for launch. It is a positioned brand and a production-ready bilingual platform with authentication, a database, and email. The operational side of the service is still in progress.',
    stack:
      'Next.js (React), Supabase for the database and authentication, and Resend for transactional and marketing email, deployed on Vercel. Bilingual English and Spanish with locale-based routing, SEO metadata, and dynamically generated Open Graph images.',
  },
  {
    slug: 'cuiklearn',
    title: 'CuikLearn',
    description:
      'A gamified learning app with a FastAPI backend that generates structured courses from uploaded material using the Claude API.',
    draft: false,
    problem:
      'CuikLearn is a Duolingo-style learning platform. People move through paths of short games and earn stars, coins, and streaks. It ships with paths for JavaScript fundamentals and Italian, plus skill-graph roadmaps for frontend development, computer science, data science, and algorithms. People can also upload their own material and get a playable path back.',
    role: 'Sole developer. I designed and built the project end to end as a hands-on way to learn and experiment, covering product design, UI and UX, frontend architecture, a Python backend, AI integration, and deployment.',
    constraints:
      'Handcrafted lessons and AI-generated lessons have to play through the same game shell. The app runs on the Vercel and Supabase free tiers, and it is no longer actively maintained.',
    decisions: [
      'A FastAPI service sends uploaded text, PDFs, Word documents, or images to Claude with a structured schema prompt, then returns skill nodes, dependencies, and games. People preview and confirm before anything is saved.',
      'A shared game shell manages lives, progress, scoring, and feedback. True/false, multiple choice, and flashcards are templates, so handcrafted and AI-generated content render the same way.',
      'Progress includes star ratings, streaks with streak shields, weekly and all-time scores, an in-app currency, and a shop of power-ups.',
      'An animated duck mascot is driven by a spritesheet, with a data-driven way to chain animation sequences and an in-app tool for building and previewing them.',
      'The UI uses an atomic component structure, routes for new learning paths are generated, and adding a game follows a documented workflow. The app is internationalized, has guided tours, and keeps progress across sessions.',
    ],
    outcome:
      'The project was a learning ground for full-stack work: React architecture (atomic design, state management, internationalization), game and animation systems, a Python FastAPI service, and structured output from the Claude API inside a real product flow. It is live on the Vercel and Supabase free tiers and is no longer actively maintained.',
    stack:
      'Frontend: React 18 with TypeScript and Vite, Tailwind CSS, Zustand with persisted client state, TanStack Query, React Router, dnd-kit, Framer Motion, i18next, and React Joyride. Backend: Python with FastAPI and the Anthropic Claude API. Infrastructure: Supabase, deployed on Vercel with Vercel Analytics.',
  },
  {
    slug: 'hustlepocket',
    title: 'HustlePocket',
    description:
      'A job tracker with a Node.js API, PDF pipeline, Chrome extension, and MCP server so a personal agent can manage the search.',
    draft: true,
    problem:
      'A job search splits across the posting, a CV file, and notes. People who already use an agent can keep that in a folder, but then the uploaded PDF, the capture step, and the board are separate. HustlePocket is for one person who wants those in one system their agent can write into.',
    role: 'Sole developer. I designed and built the product, the API, the PDF pipeline, the MCP server, and the Chrome extension.',
    constraints: 'TODO(manuel): technical or product constraints.',
    decisions: [
      'TODO(manuel): key technical decisions, and why you made them.',
    ],
    outcome:
      'It runs locally. The Companion extension saves a posting onto the board, and an agent connected over MCP can import listings from the stored CV. Text edits patch the uploaded PDF rather than generating a new generic resume. It is not public yet.',
    stack:
      'React, TypeScript, Vite, and Tailwind CSS. Node.js with Express. Appwrite for the database, file storage, and authentication. PDF parsing and generation, an MCP server, and a Chrome extension.',
  },
]

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug)
}

/** Drafts stay reachable in development and drop out of production builds. */
export function isCaseStudyPublic(study: CaseStudy) {
  return !study.draft || process.env.NODE_ENV !== 'production'
}

export function getPublicCaseStudies() {
  return caseStudies.filter(isCaseStudyPublic)
}
