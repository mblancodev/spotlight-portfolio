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
  screenshots: string
  stack: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'astrolle',
    title: 'Astrolle',
    description:
      'Draft case study: co-founder and frontend tech lead work at Astrolle.',
    draft: true,
    problem:
      'TODO(manuel): the problem Astrolle’s product is solving, in concrete terms.',
    role: 'Co-Founder & Frontend Tech Lead at Astrolle Inc, from Sep 2025.',
    constraints: 'TODO(manuel): technical or product constraints.',
    decisions: [
      'TODO(manuel): key technical decisions, and why you made them.',
    ],
    outcome:
      'TODO(manuel): outcome with real metrics (e.g. "cut build time by X%").',
    screenshots: 'TODO(manuel): add screenshots',
    stack:
      'TODO(manuel): the stack you own at Astrolle. Do not copy the personal stack list from About unless it is accurate here.',
  },
  {
    slug: 'infrapedia',
    title: 'Infrapedia',
    description:
      'Draft case study: software engineering work on Infrapedia, a network and data-center infrastructure tool.',
    draft: true,
    problem:
      'Infrapedia provides information about network and data center infrastructure. TODO(manuel): the specific problem this case study should open with.',
    role: 'Software Engineer at Infrapedia Inc, 2019–2022.',
    constraints: 'TODO(manuel): technical or product constraints.',
    decisions: [
      'TODO(manuel): key technical decisions, and why you made them.',
    ],
    outcome:
      'TODO(manuel): outcome with real metrics (e.g. "cut build time by X%").',
    screenshots: 'TODO(manuel): add screenshots',
    stack: 'TODO(manuel): stack used on Infrapedia.',
  },
  {
    slug: 'timeline-range-picker',
    title: 'Timeline Range Picker',
    description:
      'Draft case study: Timeline Range Picker. Role, stack, and outcome still to be filled in.',
    draft: true,
    problem: 'TODO(manuel): what problem Timeline Range Picker solves.',
    role: 'TODO(manuel): your role on Timeline Range Picker.',
    constraints: 'TODO(manuel): technical or product constraints.',
    decisions: [
      'TODO(manuel): key technical decisions, and why you made them.',
    ],
    outcome:
      'TODO(manuel): outcome with real metrics (e.g. "cut build time by X%").',
    screenshots: 'TODO(manuel): add screenshots',
    stack: 'TODO(manuel): stack for Timeline Range Picker.',
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
