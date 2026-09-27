import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CaseStudy } from '@/components/CaseStudy'
import { ProjectWall } from '@/components/ProjectWall'
import { getCaseStudy, isCaseStudyPublic } from '@/lib/caseStudies'
import { getProjectBySlug, projects } from '@/lib/projects'

export const dynamicParams = false

export function generateStaticParams() {
  return projects
    .filter(
      (project) => project.section === 'professional' && project.caseStudySlug,
    )
    .map((project) => ({ slug: project.caseStudySlug! }))
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
  }
}

export default function WorkCaseStudy({
  params,
}: {
  params: { slug: string }
}) {
  let project = getProjectBySlug(params.slug)
  if (project && project.section !== 'professional') {
    notFound()
  }

  let study = getCaseStudy(params.slug)
  if (!study || !isCaseStudyPublic(study)) {
    notFound()
  }

  return (
    <CaseStudy
      study={study}
      aside={
        <ProjectWall
          slug={params.slug}
          name={project?.name ?? study.title}
          cover={project?.image}
        />
      }
    />
  )
}
