import { Container } from '@/components/Container'
import { ProjectCard } from '@/components/ProjectCard'
import { projects } from '@/lib/projects'

const order = {
  professional: ['Astrolle', 'Neostella', 'Infrapedia', 'Amauz Group'],
  personal: ['HustlePocket', 'Curated Lovers', 'CuikLearn'],
}

export function ProjectShowcase({
  kind,
}: {
  kind: 'professional' | 'personal'
}) {
  let items = order[kind].map((name) => {
    let project = projects.find((item) => item.name === name)
    if (!project) throw new Error(`Missing project: ${name}`)
    return project
  })

  return (
    <Container className="mt-12 sm:mt-16">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
        {items.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </Container>
  )
}
