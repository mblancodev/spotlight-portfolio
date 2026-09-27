import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import GlassSurface from '@/components/GlassSurface'

import { MaybeTodo, hasContent } from '@/components/Todo'
import { getCaseStudy, isCaseStudyPublic } from '@/lib/caseStudies'
import { projectHref, type Project } from '@/lib/projects'

const textLinkClassName =
  'focus-ring relative z-10 text-sm font-medium text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground'

/** Sole developer is already implied on independent products. */
function personalRole(role: string) {
  if (role === 'Sole developer') return undefined
  if (role === 'Sole developer and product owner') return 'Product owner'
  return role
}

export function ProjectCard({ project }: { project: Project }) {
  let href = projectHref(project)
  let study = project.caseStudySlug
    ? getCaseStudy(project.caseStudySlug)
    : undefined
  let caseStudyHref = study && isCaseStudyPublic(study) ? href : undefined
  let showLiveLink =
    project.section === 'personal'
      ? project.status !== 'Coming soon' && Boolean(project.link)
      : Boolean(project.link)
  let role =
    project.section === 'personal' ? personalRole(project.role) : project.role
  let meta = [
    role,
    project.section === 'personal' ? project.status : project.dates,
  ].filter(hasContent)

  return (
    <GlassSurface height="100%" borderRadius={24} className="h-full">
      <article className="project-card flex h-full w-full flex-col gap-4 rounded-3xl p-3 sm:p-3.5">
        <header className="flex items-center gap-2.5 px-1 pt-2">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-foreground/10 text-sm">
            <ProjectLogo project={project} />
          </span>
          <h3 className="text-sm font-medium tracking-tight text-foreground">
            {project.name}
          </h3>
        </header>
        <div className="project-card__image relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-foreground/5 ring-1 ring-foreground/5">
          <div className="project-card__image-inner absolute inset-0 flex items-center justify-center">
            {project.image ? (
              <Image
                src={project.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 540px, (min-width: 768px) 45vw, 100vw"
                className={clsx(
                  'object-cover',
                  project.imageTone === 'light' && 'dark:brightness-[0.72]',
                )}
              />
            ) : (
              <span className="text-5xl" aria-hidden="true">
                {project.logo}
              </span>
            )}
          </div>
        </div>
        {(hasContent(project.summary) ||
          hasContent(project.summaryTodo) ||
          project.personality) && (
          <p className="px-1 text-[14px] leading-normal tracking-tight break-words text-foreground/65 sm:text-[15px]">
            <MaybeTodo text={project.summary} />{' '}
            {project.summaryTodo && <MaybeTodo text={project.summaryTodo} />}
            {project.personality}
          </p>
        )}
        <div className="mt-auto">
          {meta.length > 0 && (
            <p className="px-1 pb-1 text-[12px] tracking-tight break-words text-foreground/50">
              {meta.map((part, index) => (
                <span key={`${project.name}-${index}`}>
                  {index > 0 && ' · '}
                  <MaybeTodo text={part} />
                </span>
              ))}
            </p>
          )}
          <ul className="flex flex-col gap-2 px-1 pb-2">
            {caseStudyHref && (
              <li>
                <Link href={caseStudyHref} className={textLinkClassName}>
                  Case study
                </Link>
              </li>
            )}
            {showLiveLink && project.link && (
              <li>
                <a
                  href={project.link.href}
                  className={textLinkClassName}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {project.link.label}
                </a>
              </li>
            )}
            {hasContent(project.repo) && (
              <li>
                <ExternalOrTodo label="GitHub" value={project.repo} />
              </li>
            )}
            {hasContent(project.npm) && (
              <li>
                <ExternalOrTodo label="npm" value={project.npm} />
              </li>
            )}
            {hasContent(project.demo) && (
              <li>
                <ExternalOrTodo label="Demo" value={project.demo} />
              </li>
            )}
          </ul>
        </div>
      </article>
    </GlassSurface>
  )
}

function ProjectLogo({ project }: { project: Project }) {
  if (project.logoSprite) {
    return <span className={project.logoSprite} aria-hidden="true" />
  }
  if (project.logoImage) {
    return (
      <Image
        src={project.logoImage}
        alt=""
        width={24}
        height={24}
        className={clsx(
          'h-6 w-6 object-contain',
          project.logoInvertInLight && 'invert dark:invert-0',
        )}
      />
    )
  }
  return project.logo
}

function ExternalOrTodo({ label, value }: { label: string; value: string }) {
  if (value.includes('TODO(manuel)')) {
    return (
      <span className="text-sm break-words text-foreground/65">
        {label}: <MaybeTodo text={value} />
      </span>
    )
  }

  return (
    <a
      href={value}
      className={textLinkClassName}
      target="_blank"
      rel="noreferrer noopener"
    >
      {label}
    </a>
  )
}
