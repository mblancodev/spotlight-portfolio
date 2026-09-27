import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CaseStudy } from '@/components/CaseStudy'
import { HustlePocketShowcase } from '@/components/HustlePocketShowcase'
import { ProjectWall } from '@/components/ProjectWall'
import { getCaseStudy, isCaseStudyPublic } from '@/lib/caseStudies'
import { getProjectBySlug, projects } from '@/lib/projects'

export const dynamicParams = false

let personalProjects = projects.filter(
  (project) => project.section === 'personal' && project.caseStudySlug,
)

export function generateStaticParams() {
  return personalProjects.map((project) => ({ slug: project.caseStudySlug! }))
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

export default function PersonalProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  let project = getProjectBySlug(params.slug)
  if (!project || project.section !== 'personal') {
    notFound()
  }

  let study = getCaseStudy(params.slug)
  if (!study || !isCaseStudyPublic(study)) {
    notFound()
  }

  return (
    <CaseStudy
      study={study}
      extra={params.slug === 'hustlepocket' ? <HustlePocketShowcase /> : null}
      aside={
        <ProjectWall
          slug={params.slug}
          name={project.name}
          cover={project.image}
        />
      }
    />
  )
}
