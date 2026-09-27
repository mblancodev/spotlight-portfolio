import { type Metadata } from 'next'

import { ProjectShowcase } from '@/components/ProjectShowcase'
import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata: Metadata = {
  title: 'Work experience',
  description: 'Platforms and client builds, most recent first.',
}

export default function WorkExperience() {
  return (
    <>
      <SimpleLayout
        title="Company and client work"
        intro="Platforms and client builds, most recent first."
      />
      <ProjectShowcase kind="professional" />
    </>
  )
}
