import { type Metadata } from 'next'
import Link from 'next/link'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { MaybeTodo, Todo } from '@/components/Todo'
import { getCaseStudy, isCaseStudyPublic } from '@/lib/caseStudies'
import { projects } from '@/lib/projects'
import { projectsDescription } from '@/lib/site'

function LinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

let factClassName = 'text-sm text-zinc-600 break-words dark:text-zinc-400'

let textLinkClassName =
  'relative z-30 inline-flex items-center text-sm font-medium text-teal-500 outline-offset-2 transition hover:text-teal-600 focus-visible:text-teal-600'

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-medium text-zinc-800 dark:text-zinc-100">{label}</dt>
      <dd className={factClassName}>
        <MaybeTodo text={value} />
      </dd>
    </div>
  )
}

function ExternalOrTodo({ label, value }: { label: string; value: string }) {
  if (value.includes('TODO(manuel)')) {
    return (
      <li className={factClassName}>
        {label}: <Todo>{value}</Todo>
      </li>
    )
  }

  return (
    <li>
      <a
        href={value}
        className={textLinkClassName}
        target="_blank"
        rel="noreferrer noopener"
      >
        {label}
      </a>
    </li>
  )
}

export const metadata: Metadata = {
  title: 'Projects',
  description: projectsDescription,
}

export default function Projects() {
  return (
    <SimpleLayout
      title="Things I’ve Built That Actually Work"
      intro="I’ve worked on a lot of small projects over the years. These are the ones I’m most proud of. A repository is linked on the card only when I have a public URL for it."
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => {
          let study = project.caseStudySlug
            ? getCaseStudy(project.caseStudySlug)
            : undefined
          let caseStudyHref =
            study && isCaseStudyPublic(study)
              ? `/projects/${study.slug}`
              : undefined

          return (
            <Card as="li" key={project.name}>
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-semibold text-zinc-800 shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-0">
                {project.logo}
              </div>
              <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                {project.link ? (
                  <Card.Link
                    target="_blank"
                    href={project.link.href}
                    rel="noreferrer noopener nofollow"
                  >
                    {project.name}
                  </Card.Link>
                ) : caseStudyHref ? (
                  <Card.Link href={caseStudyHref}>{project.name}</Card.Link>
                ) : (
                  project.name
                )}
              </h2>
              <Card.Description>
                {project.summary.includes('TODO(manuel)') ? (
                  <Todo>{project.summary}</Todo>
                ) : (
                  project.summary
                )}{' '}
                {project.summaryTodo && <Todo>{project.summaryTodo}</Todo>}{' '}
                {project.personality}
              </Card.Description>
              <dl className="relative z-10 mt-4 space-y-3">
                <Fact label="Role" value={project.role} />
                <Fact label="Stack" value={project.stack} />
                <Fact label="Outcome" value={project.outcome} />
              </dl>
              {project.link && (
                <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                  <LinkIcon className="h-6 w-6 flex-none" />
                  <span className="ml-2 break-all">{project.link.label}</span>
                </p>
              )}
              <ul className="relative z-30 mt-4 flex flex-col gap-2">
                {caseStudyHref && (
                  <li>
                    <Link href={caseStudyHref} className={textLinkClassName}>
                      Case study
                      <span aria-hidden="true" className="ml-1">
                        →
                      </span>
                    </Link>
                  </li>
                )}
                {project.repo && (
                  <ExternalOrTodo label="GitHub" value={project.repo} />
                )}
                {project.npm && (
                  <ExternalOrTodo label="npm" value={project.npm} />
                )}
                {project.demo && (
                  <ExternalOrTodo label="Demo" value={project.demo} />
                )}
              </ul>
            </Card>
          )
        })}
      </ul>
    </SimpleLayout>
  )
}
