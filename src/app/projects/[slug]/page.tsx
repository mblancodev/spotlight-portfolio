import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CaseStudy } from '@/components/CaseStudy'
import {
  getCaseStudy,
  getPublicCaseStudies,
  isCaseStudyPublic,
} from '@/lib/caseStudies'

export const dynamicParams = false

export function generateStaticParams() {
  return getPublicCaseStudies().map((study) => ({ slug: study.slug }))
}

export function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Metadata {
  let study = getCaseStudy(params.slug)

  if (!study || !isCaseStudyPublic(study)) {
    return {}
  }

  return {
    title: study.title,
    description: study.description,
    robots: study.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      title: study.title,
      description: study.description,
    },
    twitter: {
      title: study.title,
      description: study.description,
    },
  }
}

export default function ProjectCaseStudy({
  params,
}: {
  params: { slug: string }
}) {
  let study = getCaseStudy(params.slug)

  if (!study || !isCaseStudyPublic(study)) {
    notFound()
  }

  return <CaseStudy study={study} />
}
