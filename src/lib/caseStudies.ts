export type CaseStudy = {
  slug: string
  title: string
  description: string
  /** Hidden from production builds. Shown in `next dev`. */
  draft: boolean
  problem: string
  role: string
  /** A paragraph, or a list of separate points. */
  constraints: string | string[]
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
      'Astrolle has shipped 15 product modules and is live with companies in retail, agribusiness, construction, and services. The modular architecture lets teams ship in parallel and add product lines without reworking existing modules, and the agent workflows have handled more than 250 requirements so far.',
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
      'Network engineers, network operations teams, and telecom business development professionals needed a single map of the internet’s physical backbone: undersea cables, land-based fiber, datacenters, and internet exchange points.',
    role: 'Frontend developer at Infrapedia Inc. (2019–2022), with full ownership of the user-facing application. With no design team, I handled the interface, user experience, and visual design, as well as the architecture and development. I worked with the backend developer to agree on how data moved between systems, and reported to a product owner in Germany. All meetings, planning, and communication were in English.',
    constraints: [
      'No designer. Every interface and visual decision was mine to make.',
      'Heavy data, everyday devices. The map had to stay smooth with thousands of detailed data points on phones and mid-range laptops, not just high-end machines.',
      'Distributed team. I shared technical agreements with a backend developer and collaborated across time zones.',
    ],
    decisions: [
      'Built the interactive map from scratch, with separate layers for undersea cables, land fiber, datacenters, and exchange points, plus search and a detail view for every asset.',
      'Built in-map editing tools so users can draw, update, and manage cable routes, networks, and facilities themselves, without needing a developer.',
      'Tuned performance so dense data stays fast and usable on the devices people actually carry.',
      'Designed for professionals, keeping a complex technical dataset clear and easy to navigate.',
    ],
    outcome:
      'Shipped a production mapping platform used by network operators around the world. The editing tools let the dataset grow without developer involvement, and the performance work made the map practical on everyday hardware. I owned the frontend end to end within a distributed, English-speaking team.',
    stack: 'Built with Vue.js, Vuex, Sass, Mapbox GL, and MongoDB.',
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
      'Curated Lovers is a matchmaking service for people tired of dating apps: no swiping, no algorithm. Human curators vet members and match them personally, then invite them to blind dates or small curated events.',
    role: 'Founder, product owner, and sole developer. I defined the concept, brand, and user experience, and designed and built the entire platform, from interface and copy to accounts, email, and launch.',
    constraints: [
      'Pre-launch. The website is the brand’s public face and first point of contact, running in waitlist mode while the matchmaking operation is being set up.',
      'Two languages. Every page had to work fully in English and Spanish.',
    ],
    decisions: [
      'Waitlist first. Visitors can sign up, create an account, and join the waitlist now, so demand is measurable before launch.',
      'Automatic email. Sign-ups, account emails, and a newsletter keep future members engaged until launch.',
      'Built around cities. Medellín, Bogotá, Cali, and Caracas each have their own page, and events can be filtered by city, so the service feels local from day one.',
      'Trust built into the content. Pages for blind dates and events sit alongside an FAQ, the founder’s story, contact details, and clear terms and privacy policies. For a service asking people to meet strangers, credibility matters as much as features.',
      'Fully bilingual and easy to find. The whole site is available in both languages, optimized for search, and shows polished previews when shared on social media or messaging apps.',
    ],
    outcome:
      'The site is live and collecting waitlist sign-ups. Curated Lovers launches with a defined brand and a production-ready bilingual platform with accounts, a database, and email in place.',
    stack: 'Built with Next.js (React), Supabase, Resend, and Vercel.',
  },
  {
    slug: 'cuiklearn',
    title: 'CuikLearn',
    description:
      'A gamified learning app with a FastAPI backend that generates structured courses from uploaded material using the Claude API.',
    draft: false,
    problem:
      'Learning a technical skill or a new language on your own is easy to start and hard to stick with. CuikLearn borrows what makes language apps addictive: short game-based lessons, stars, coins, and daily streaks. It ships with paths for JavaScript fundamentals and Italian, plus visual roadmaps for frontend development, computer science, data science, and algorithms. Users can also upload their own study material and get a playable course back.',
    role: 'Sole developer. I built CuikLearn end to end as a hands-on way to learn and experiment, covering product design, interface and user experience, frontend architecture, a Python backend, AI integration, and deployment.',
    constraints: [
      'One experience for all content. Lessons I wrote by hand and lessons generated by AI had to look and play exactly the same.',
      'Zero budget. Everything runs on free hosting and database plans.',
    ],
    decisions: [
      'Turn any material into a course. Users upload notes, PDFs, Word documents, or images, and AI breaks them into topics, figures out which ones build on others, and creates games for each. Users review the result before anything is saved, so they stay in control.',
      'One game engine, many formats. A shared foundation handles lives, progress, scoring, and feedback. True/false, multiple choice, and flashcards plug into it, which keeps every lesson consistent and makes new game types quick to add.',
      'Motivation built in. Star ratings, streaks with streak protection, weekly and all-time leaderboards, an in-app currency, and a shop of power-ups give people reasons to come back.',
      'A mascot with personality. An animated duck reacts to the user’s progress. I also built an in-app tool to design and preview its animation sequences without touching code.',
      'Built to grow. Reusable interface components, automatically generated pages for new learning paths, and a documented process for adding games make the app easy to extend. It supports multiple languages, includes guided tours for new users, and saves progress between sessions.',
    ],
    outcome:
      'CuikLearn is live and served as a full-stack training ground: scalable React architecture, game and animation systems, a Python backend, and AI that produces reliable, structured content inside a real product. It is no longer actively maintained.',
    stack:
      'Built with React, TypeScript, Tailwind CSS, Zustand, TanStack Query, Framer Motion, i18next, Python (FastAPI), the Claude API, Supabase, and Vercel.',
  },
  {
    slug: 'hustlepocket',
    title: 'HustlePocket',
    description:
      'A job tracker with a Node.js API, PDF pipeline, Chrome extension, and MCP server so a personal agent can manage the search.',
    draft: false,
    problem:
      'A job search is scattered: the posting lives on one site, the CV in a file, the notes somewhere else. People who already use an AI assistant can keep it all in a folder, but the CV, saving job postings, and tracking applications still don’t connect. HustlePocket brings them into one place that the person’s own AI assistant can work in directly.',
    role: 'Sole developer, end to end. I designed the product and built the backend, the CV processing, the AI assistant integration, and the Chrome extension.',
    constraints: [
      'Security: private credentials could never be exposed in the browser, and most job sites block extensions from sending data out.',
      'Honesty: a tailored CV could never invent experience the person doesn’t have.',
      'Independence: it had to work with the AI assistant the buyer already uses. The core features need no AI subscription, and the paid version runs entirely on the buyer’s own computer, with no cloud account.',
    ],
    decisions: [
      'Every action is verified. Users sign in once, and the server checks each request, so people can only see and change their own data.',
      'One way in. Whether a job is saved from the browser extension, the built-in assistant, or an outside AI tool, it goes through the same entry point. That means fewer failure points and consistent data.',
      'A safely contained assistant. The built-in assistant runs on the AI tool the person already has installed, in an isolated workspace. It can search the web and update the board, but it can’t run commands or modify files.',
      'The original CV stays the source. The uploaded PDF is never replaced. Tailored versions are generated from it as clean new PDFs, and downloads stay private to the account.',
      'Try before signing up. Guest mode keeps everything on the device, so people can explore the board first. Uploads, tailoring, and the assistant require an account.',
    ],
    outcome:
      'HustlePocket runs locally and isn’t public yet. The Companion extension saves postings straight to the board, and an outside AI assistant can find and import listings based on the stored CV. When you edit your CV, the changes are written into a copy of your original PDF, keeping its layout, instead of producing a generic template. Tailored versions for each job are generated as separate new PDFs.',
    stack:
      'Built with React, TypeScript, Vite, and Tailwind CSS on the front end, Express and Appwrite on the back end, React PDF for CV generation, MCP for agent access, and a Chrome extension for capture.',
  },
  {
    slug: 'gwen',
    title: 'Gwen',
    description:
      'An open-source macOS app for dictation and translation in any app, with local Whisper speech-to-text and on-device translation.',
    draft: false,
    problem:
      'Dictation tools for the Mac are either tied to one app or send your voice to a server. I wanted to hold a key in any app, speak, and get clean text at the cursor, and to translate a selection or what I say, without audio or text leaving the machine.',
    role: 'Sole developer, end to end. I designed the product and built the macOS app, the listener, the punctuation rules, the translation flow, and the marketing site.',
    constraints: [
      'Local by default. Speech-to-text, punctuation, and translation run on the Mac. The one step that can leave it is opt-in and off.',
      'Any app. There is no plugin per editor, so the text has to land in whatever field has focus, including terminals.',
      'Never worse than what you said. Cleanup can add marks and fix spellings, but it cannot rewrite the take.',
    ],
    decisions: [
      'Two processes. A Swift app owns the keys, the microphone, the bottom bar, and the paste. A Python listener owns segmenting, Whisper, and text cleanup. The app writes 16 kHz audio into a FIFO and the listener reads it.',
      'Punctuation is rules, not a model. Spoken commands such as “new paragraph” come first, then each sentence gets its marks from its wording, in English and Spanish. A text no rule touches comes back byte for byte.',
      'Paste where the cursor is, and say so when it can’t. The clipboard is saved, used for the paste, and restored. With no text field in focus, the bar shows the text as copied instead of dropping it. In a terminal, line breaks are flattened so a dictation never runs a command.',
      'Learn from fixes. After a paste Gwen reads the field back while you are in it. The same spelling fixed twice becomes a rule, stored in a private file under ~/.gwen. Nothing is logged or sent.',
      'Translation uses Apple’s on-device framework, so it needs macOS 15 and no API key. Language detection is limited to Gwen’s six languages, so a short Spanish phrase is not misread as another language.',
      'Agent polish is opt-in. A local agent CLI can tidy each take, with no tools and a cost cap per take. If it is missing, slow, or changes what you said, the rules result is kept.',
    ],
    outcome:
      'Gwen is open source under the MIT license. It dictates into any app with a held key, a double tap, or “Hey Gwen”, translates a selection in place or what you say, and exposes a gwen:// URL scheme so other apps can start a dictation or a translation. It installs with one line from its site, gwen-chi.vercel.app.',
    stack:
      'Built with Swift and AppKit, Python, whisper.cpp, Apple’s Translation and NaturalLanguage frameworks, and the macOS Accessibility API.',
  },
  {
    slug: 'michelleos',
    title: 'MichelleOS',
    description:
      'A local-first voice assistant for macOS, with a persistent memory of your world, grounded answers, and passkey-gated actions.',
    draft: true,
    problem:
      'Most assistants are chat windows with amnesia. Each conversation starts from zero, answers sound confident whether or not anything backs them up, and the more useful an assistant becomes, the more it is trusted to act on your behalf with nothing stronger than a “yes.” I wanted an assistant that behaves like a trusted chief of staff: one that remembers what matters, shows its sources, and never touches anything important without proof that it is really me asking.',
    role: 'Sole developer, end to end. I designed the product and its architectural rules, and built the voice pipeline, the memory system, the security model, the macOS app, and the release tooling.',
    constraints: [
      'Privacy: notes, memory, and voice stay on the Mac. Speech recognition and speech synthesis run locally.',
      'Trust: a model can suggest an action, but it can never be the thing that authorizes it.',
      'Longevity: AI providers change every few months. Michelle’s memory and permissions had to survive swapping the model underneath.',
      'Honesty: when there is no evidence for an answer, Michelle has to say so instead of guessing.',
    ],
    decisions: [
      'One source of truth. Voice, the desktop HUD, the command line, and background jobs all read and write the same model of the user’s world. There is only ever one Michelle, not a separate one per screen.',
      'Touch ID for anything real. Notes can change freely, but any change to actual code needs a WebAuthn passkey confirmation. A spoken “yes” is never enough, and outside tools are blocked at the tool level, not just discouraged in a prompt.',
      'Answers come with receipts. Michelle retrieves evidence first, answers only from it, cites where each fact came from, and stays quiet when nothing supports the question. Facts, inferences, and preferences are stored separately so assumptions never pass as truth.',
      'Models are replaceable. Every AI call goes through a single router that picks a provider for the job. Claude and Codex are interchangeable, and when they write code they work in an isolated copy that Michelle checks before anything is promoted.',
      'Built to ship, not just to demo. Reproducible, hash-locked environments, a one-command installer, signed releases, and transactional upgrades with rollback, so a bad release can be undone in one step.',
    ],
    outcome:
      'MichelleOS runs daily in private alpha. It understands and answers in English, Spanish, Portuguese, and French, delivers morning and evening briefings grounded in real notes, and runs background skills for the inbox, calendar, habits, and reading, each leaving a record of what it did and why. New capabilities can be taught by voice, and every consequential action is traceable to what authorized it.',
    stack:
      'Built with Python on a Swift macOS app, local Whisper for speech recognition and mlx-audio and Kokoro for speech, SQLite for state, WebAuthn passkeys for authorization, MCP for Gmail, Calendar, and file tools, launchd for background services, and Claude and Codex behind a provider-agnostic model router. The HUD is plain HTML, CSS, and JavaScript over an Obsidian-compatible vault.',
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
