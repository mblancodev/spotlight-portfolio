import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import GlassSurface from '@/components/GlassSurface'
import { SimpleLayout } from '@/components/SimpleLayout'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <article className="article-card md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 max-md:hidden"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Articles on frontend architecture and Webpack Module Federation, plus early tutorials on Bash and Python.',
}

export default async function ArticlesIndex() {
  let articles = await getAllArticles()

  return (
    <SimpleLayout
      title="Writing"
      intro="Practical write-ups on frontend architecture, plus a few tutorials from when I was starting out."
    >
      <GlassSurface borderRadius={24} className="max-w-3xl">
        {/* Padding clears the cards' hover glass, which extends 24px out. */}
        <div className="flex flex-col space-y-16 px-8 py-10 sm:px-10">
          {articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </GlassSurface>
    </SimpleLayout>
  )
}
