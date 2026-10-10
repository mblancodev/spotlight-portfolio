import Link from 'next/link'

import { Container } from '@/components/Container'
import { ProjectCard } from '@/components/ProjectCard'
import { type ArticleWithSlug, getHomeArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import { projects } from '@/lib/projects'
import { contactEmail } from '@/lib/site'
import { Button } from '@/components/Button'

const featuredNames = [
  'Astrolle',
  'Gwen',
  'HustlePocket',
  'Curated Lovers',
  'Infrapedia',
]

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <article className="border-t border-foreground/8 py-6">
      <p className="text-sm text-foreground/50">{formatDate(article.date)}</p>
      <h3 className="mt-2 text-lg font-medium tracking-tight text-foreground">
        <Link
          href={`/articles/${article.slug}`}
          className="focus-ring hover:underline"
        >
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 text-[15px] leading-normal tracking-tight text-foreground/65">
        {article.description}
      </p>
    </article>
  )
}

export default async function Home() {
  let articles = await getHomeArticles()
  let featured = featuredNames.map((name) => {
    let project = projects.find((item) => item.name === name)
    if (!project) {
      throw new Error(`Missing project: ${name}`)
    }
    return project
  })

  return (
    <div className="flex flex-col gap-20 sm:gap-28">
      <section>
        <Container>
          <div className="flex max-w-[54rem] flex-col items-start gap-10 md:flex-row md:items-center md:gap-14">
            <div className="flex flex-1 flex-col gap-4">
              <p className="text-[20px] leading-tight font-medium tracking-tight text-foreground">
                Manuel Blanco · Senior full-stack engineer
              </p>
              <h1 className="text-[1.7rem] leading-[1.05] font-medium tracking-tight text-balance text-foreground sm:text-[2.4rem] lg:text-[2.75rem]">
                I build products end to end, and the systems that help teams
                ship them.
              </h1>
              <p className="max-w-[34ch] text-[18px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[22px]">
                I co-founded Astrolle, where I lead a React micro-frontend
                platform of 15 product modules, its CI/CD, and AI agent
                workflows that turn spoken requirements into tested pull
                requests. Since 2018 I’ve built frontends and backends in React,
                TypeScript, Node.js, and Python.
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <Button href={`mailto:${contactEmail}`}>Get in touch</Button>
                <Button
                  href="/work-experience"
                  variant="secondary"
                  className="group"
                >
                  See my work
                  <ArrowRightIcon />
                </Button>
              </div>
            </div>
            <div className="w-full shrink-0 md:w-[22rem] lg:w-[24rem]">
              <div className="rounded-[2rem] border border-foreground/8 bg-background p-1.5 shadow-sm">
                <div className="overflow-hidden rounded-[1.6rem]">
                  <div
                    role="img"
                    aria-label="Portrait placeholder"
                    className="flex aspect-square w-full items-center justify-center bg-foreground/5 font-serif text-5xl text-foreground/25"
                  >
                    MB
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <div className="flex flex-col items-start gap-5 pb-10 sm:pb-14">
            <h2 className="font-serif text-2xl leading-[1.05] font-medium tracking-tight text-foreground sm:text-4xl">
              Selected work
            </h2>
            <p className="max-w-[36ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
              Platforms I’ve led, client builds, and products I launched myself.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
            {featured.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
          <div className="mt-6 flex sm:mt-8">
            <Button href="/projects" variant="secondary" className="group">
              All projects
              <ArrowRightIcon />
            </Button>
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground sm:text-4xl">
              Writing
            </h2>
            <p className="mt-4 max-w-[36ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
              Notes on frontend architecture, starting with a series on Module
              Federation.
            </p>
            <div className="mt-6">
              {articles.map((article) => (
                <Article key={article.slug} article={article} />
              ))}
            </div>
            <Link
              href="/articles"
              className="focus-ring mt-6 inline-flex text-sm font-medium text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground"
            >
              All articles
            </Link>
          </div>
        </Container>
      </section>
    </div>
  )
}
