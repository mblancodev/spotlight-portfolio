import glob from 'fast-glob'

interface Article {
  title: string
  description: string
  author: string
  date: string
}

export interface ArticleWithSlug extends Article {
  slug: string
}

async function importArticle(
  articleFilename: string,
): Promise<ArticleWithSlug> {
  let { article } = (await import(`../app/articles/${articleFilename}`)) as {
    default: React.ComponentType
    article: Article
  }

  return {
    slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
    ...article,
  }
}

export async function getAllArticles() {
  let articleFilenames = await glob('*/page.mdx', {
    cwd: './src/app/articles',
  })

  let articles = await Promise.all(articleFilenames.map(importArticle))

  return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}

/** Home shows the microfrontends series only. Part II, then Part I. */
const homeArticleSlugs = [
  'scalable-and-maintainable-frontends-microfrontends-part-2',
  'scalable-and-maintainable-frontends-microfrontends',
]

export async function getHomeArticles() {
  let articles = await getAllArticles()

  return homeArticleSlugs.flatMap((slug) => {
    let article = articles.find((item) => item.slug === slug)
    return article ? [article] : []
  })
}
