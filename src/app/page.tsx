import { Card } from '@/components/Card'
import { Container } from '@/components/Container'

import Link from 'next/link'

import { type ArticleWithSlug, getHomeArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import { SelfPresentation } from '@/components/SelfPresentation'
import { Resume } from '@/components/Resume'

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

export default async function Home() {
  let articles = await getHomeArticles()

  return (
    <>
      <Container className="mt-9">
        <SelfPresentation shorten />
      </Container>
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
            <Link
              href="/articles"
              className="inline-flex items-center text-sm font-medium text-teal-500 outline-offset-2 transition hover:text-teal-600 focus-visible:text-teal-600"
            >
              All articles
              <span aria-hidden="true" className="ml-1">
                →
              </span>
            </Link>
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}
