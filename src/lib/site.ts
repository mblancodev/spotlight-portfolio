export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://manuelblancodev.com'
).replace(/\/$/, '')

/** Public address already used on the site. DECISIONS left the choice unfilled. */
export const contactEmail = 'manuel@astrolle.com'

/**
 * Read when this module evaluates (once per build, or once per server process).
 * Calling `new Date()` inside Footer inlined a year into each static route on
 * its own, so a page still serving an older build could show a different year
 * from one rendered later. The Work "Present" year is separate: it comes from
 * the client clock in the resume card.
 */
export const copyrightYear = new Date().getFullYear()

export const defaultTitle =
  'Manuel Blanco — Senior Full-Stack Engineer'

export const defaultDescription =
  'Senior full-stack engineer and Astrolle co-founder. I lead a 15-module React platform and AI agent workflows that turned 250+ requirements into pull requests.'

export const aboutDescription =
  'How I went from frontend developer to full-stack engineer and co-founder, and how I use AI agents to ship software at Astrolle.'

export const projectsDescription =
  'Case studies from Astrolle, Infrapedia, and independent products. Each covers the problem, my role, the stack, and what shipped.'

export const astrolleLead =
  'Operations platform that routes each task to a person, an AI agent, or a machine. I lead the web platform (15 modules shipped) and the agent workflows behind how we ship.'

export const astrollePersonality =
  'The little raccoon that eats the tech garbage my brain produces.'

export const impactTodo =
  'TODO(manuel): what you owned, key tech, and one result (e.g. "cut build time by X%")'
