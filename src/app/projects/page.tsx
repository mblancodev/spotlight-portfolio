import { type Metadata } from 'next'

import { ProjectShowcase } from '@/components/ProjectShowcase'
import { SimpleLayout } from '@/components/SimpleLayout'
import { projectsDescription } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Projects',
  description: projectsDescription,
}

export default function Projects() {
  return (
    <>
      <SimpleLayout
        title="Independent products"
        intro="Products I designed, built, and launched myself."
      />
      <ProjectShowcase kind="personal" />
    </>
  )
}
