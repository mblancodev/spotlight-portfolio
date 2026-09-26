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
  'Manuel Blanco — Senior Frontend Engineer & Co-Founder of Astrolle'

export const defaultDescription =
  'Senior frontend engineer and co-founder of Astrolle. I build scalable React and TypeScript frontends, including microfrontends.'

export const aboutDescription =
  'How I got into software, the stack I use, and what I do as co-founder of Astrolle.'

export const projectsDescription =
  'Selected work: my role, the stack, and a one-line outcome for each project.'

export const astrolleLead = 'I co-founded Astrolle and lead the frontend there.'

export const astrolleGap =
  'TODO(manuel): what Astrolle is, who it is for, what I own beyond the frontend lead role, and the stack.'

export const astrollePersonality =
  'The little racoon that eats the tech garbage my brain produces.'

export const impactTodo =
  'TODO(manuel): what you owned, key tech, and one result (e.g. "cut build time by X%")'
