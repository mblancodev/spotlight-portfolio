#!/usr/bin/env node
// MCP server for publishing blog posts to the portfolio.
//
// Posts are MDX files at src/app/articles/<slug>/page.mdx, compiled at build time.
// Publishing commits the file to GitHub through the REST API; the push to main
// triggers the Netlify deploy, so no local clone or manual push is needed.
//
// Env:
//   GITHUB_TOKEN   fine-grained token with Contents: read and write on the repo (needed to publish)
//   POSTS_REPO     owner/name, default mblancodev/spotlight-portfolio
//   POSTS_BRANCH   default main
//   POSTS_SITE_URL default https://manuelblancodev.com
//
// Run `node mcp/posts-server.mjs --self-test` to check the post format without network access.

import { compile } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'
import { z } from 'zod'

const REPO = process.env.POSTS_REPO ?? 'mblancodev/spotlight-portfolio'
const BRANCH = process.env.POSTS_BRANCH ?? 'main'
const TOKEN = process.env.GITHUB_TOKEN
const SITE_URL = (process.env.POSTS_SITE_URL ?? 'https://manuelblancodev.com').replace(/\/$/, '')
const ARTICLES_DIR = 'src/app/articles'
const AUTHOR = 'Manuel Blanco'
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const DATE = /^\d{4}-\d{2}-\d{2}$/

// --- Post format -------------------------------------------------------------

const DEFAULT_EXPORT = 'export default (props) => <ArticleLayout article={article} {...props} />'

/** The same shape as the existing hand-written articles. */
export function buildPost({ title, description, date, author = AUTHOR, body }) {
  return `import { ArticleLayout } from '@/components/ArticleLayout'

export const article = {
  author: ${JSON.stringify(author)},
  date: ${JSON.stringify(date)},
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)},
}

export const metadata = {
  title: article.title,
  description: article.description,
}

${DEFAULT_EXPORT}

${body.trim()}
`
}

/** Reads the article fields and body back out of a post file. */
export function parsePost(source) {
  let field = (name) => {
    let match = source.match(new RegExp(`\\b${name}:\\s*(['"])((?:\\\\.|(?!\\1).)*)\\1`))
    if (!match) return undefined
    return match[1] === '"' ? JSON.parse(`"${match[2]}"`) : match[2].replace(/\\'/g, "'")
  }
  let at = source.indexOf(DEFAULT_EXPORT)
  let body = at === -1 ? undefined : source.slice(at + DEFAULT_EXPORT.length).trim()
  return { title: field('title'), description: field('description'), date: field('date'), author: field('author'), body }
}

export function slugify(title) {
  return title
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/, '')
}

/**
 * Edits an existing post in place: replaces article fields and/or the body and
 * keeps everything else (image imports, extra exports) exactly as it was.
 */
export function editPost(source, { title, description, body }) {
  let at = source.indexOf(DEFAULT_EXPORT)
  if (at === -1) throw new Error('post does not use the standard layout line')
  let head = source.slice(0, at)
  let setField = (text, name, value) =>
    value === undefined
      ? text
      : text.replace(new RegExp(`(\\b${name}:\\s*)(['"])(?:\\\\.|(?!\\2).)*\\2`), (_, prefix) => prefix + JSON.stringify(value))
  head = setField(setField(head, 'title', title), 'description', description)
  let currentBody = source.slice(at + DEFAULT_EXPORT.length).trim()
  return `${head}${DEFAULT_EXPORT}\n\n${(body ?? currentBody).trim()}\n`
}

/** Compiles the MDX with the site's remark plugins, so a broken post can't break the deploy. */
export async function validatePost(source) {
  try {
    await compile(source, { remarkPlugins: [remarkGfm] })
    return null
  } catch (error) {
    // Report the position within the body, which is what the author wrote.
    let bodyStart = source.slice(0, source.indexOf(DEFAULT_EXPORT)).split('\n').length + 2
    let line = error.line ? error.line - bodyStart + 1 : 0
    let where = line > 0 ? ` (body line ${line}${error.column ? `, column ${error.column}` : ''})` : ''
    return `${error.reason ?? error.message}${where}`
  }
}

const today = () => new Date().toISOString().slice(0, 10)
const postPath = (slug) => `${ARTICLES_DIR}/${slug}/page.mdx`
const postUrl = (slug) => `${SITE_URL}/articles/${slug}`

// --- GitHub ------------------------------------------------------------------

async function github(path, init = {}) {
  let response = await fetch(`https://api.github.com/repos/${REPO}${path}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'portfolio-posts-mcp',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
      ...init.headers,
    },
  })
  if (response.status === 404) return null
  if (!response.ok) {
    let detail = await response.text()
    throw new Error(`GitHub ${response.status} on ${path}: ${detail.slice(0, 300)}`)
  }
  return response.json()
}

async function readPost(slug) {
  let file = await github(`/contents/${postPath(slug)}?ref=${BRANCH}`)
  if (!file) return null
  return { sha: file.sha, source: Buffer.from(file.content, 'base64').toString('utf8') }
}

async function commitPost(slug, source, message, sha) {
  if (!TOKEN) throw new Error('GITHUB_TOKEN is not set, so the post cannot be committed. Use dry_run to preview.')
  let result = await github(`/contents/${postPath(slug)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      content: Buffer.from(source, 'utf8').toString('base64'),
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    }),
  })
  return result.commit.html_url
}

// --- Self-test (no network) --------------------------------------------------

async function selfTest() {
  let assert = (ok, message) => {
    if (!ok) throw new Error(`self-test failed: ${message}`)
  }
  let post = buildPost({
    title: 'Shipping "fast" with Module Federation',
    description: "It's about remotes.",
    date: '2026-09-27',
    body: '## Intro\n\nHello **world**.\n\n| a | b |\n| - | - |\n| 1 | 2 |',
  })
  let parsed = parsePost(post)
  assert(parsed.title === 'Shipping "fast" with Module Federation', `title round-trip: ${parsed.title}`)
  assert(parsed.description === "It's about remotes.", `description round-trip: ${parsed.description}`)
  assert(parsed.date === '2026-09-27' && parsed.author === AUTHOR, 'date and author round-trip')
  assert(parsed.body.startsWith('## Intro'), 'body round-trip')
  assert((await validatePost(post)) === null, 'valid post compiles')
  assert((await validatePost(buildPost({ ...parsed, body: 'Broken <div> tag' }))) !== null, 'unclosed JSX is rejected')
  let edited = editPost(`import hero from './banner.jpg'\n\n${post}`, { title: 'New title', body: 'New body.' })
  assert(edited.startsWith("import hero from './banner.jpg'"), 'edit keeps image imports')
  assert(parsePost(edited).title === 'New title' && parsePost(edited).description === "It's about remotes.", 'edit changes only given fields')
  assert(parsePost(edited).body === 'New body.', 'edit replaces body')

  // Every existing article must parse, so update_post works on it.
  let { readdirSync, readFileSync } = await import('node:fs')
  let dir = new URL(`../${ARTICLES_DIR}/`, import.meta.url)
  let slugs = readdirSync(dir, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name)
  for (let slug of slugs) {
    let source = readFileSync(new URL(`${slug}/page.mdx`, dir), 'utf8')
    let fields = parsePost(source)
    assert(fields.title && fields.date && fields.body, `existing article parses: ${slug}`)
    assert(editPost(source, {}).trim() === source.trim(), `no-op edit is lossless: ${slug}`)
  }
  assert(slugify('Él dijo: ¡Hola, Mundo! 2.0') === 'el-dijo-hola-mundo-2-0', `slugify: ${slugify('Él dijo: ¡Hola, Mundo! 2.0')}`)
  console.log('self-test passed')
}

if (process.argv.includes('--self-test')) {
  await selfTest()
  process.exit(0)
}

// --- MCP server --------------------------------------------------------------

const { McpServer } = await import('@modelcontextprotocol/sdk/server/mcp.js')
const { StdioServerTransport } = await import('@modelcontextprotocol/sdk/server/stdio.js')

const server = new McpServer({ name: 'portfolio-posts', version: '1.0.0' })
const text = (value) => ({ content: [{ type: 'text', text: typeof value === 'string' ? value : JSON.stringify(value, null, 2) }] })
const fail = (message) => ({ content: [{ type: 'text', text: message }], isError: true })

server.registerTool(
  'list_posts',
  {
    title: 'List posts',
    description: 'Lists the published blog posts (slug, title, date, description, URL), newest first.',
    inputSchema: {},
  },
  async () => {
    let entries = (await github(`/contents/${ARTICLES_DIR}?ref=${BRANCH}`)) ?? []
    let slugs = entries.filter((entry) => entry.type === 'dir').map((entry) => entry.name)
    let posts = await Promise.all(
      slugs.map(async (slug) => {
        let post = await readPost(slug)
        if (!post) return null
        let { title, date, description } = parsePost(post.source)
        return { slug, title, date, description, url: postUrl(slug) }
      }),
    )
    return text(posts.filter(Boolean).sort((a, b) => (b.date ?? '').localeCompare(a.date ?? '')))
  },
)

server.registerTool(
  'get_post',
  {
    title: 'Get post',
    description: 'Returns the full MDX source of a post, to read it or to base an update on it.',
    inputSchema: { slug: z.string().describe('The post slug, as returned by list_posts.') },
  },
  async ({ slug }) => {
    let post = await readPost(slug)
    return post ? text(post.source) : fail(`No post named "${slug}".`)
  },
)

server.registerTool(
  'publish_post',
  {
    title: 'Publish post',
    description:
      'Publishes a new blog post by committing it to the main branch; the site redeploys in a minute or two. ' +
      'The body is Markdown/MDX (GitHub-flavored Markdown, code blocks, and <Image> are supported). ' +
      'The post is compiled first and rejected if the MDX is invalid. Use dry_run to preview without committing.',
    inputSchema: {
      title: z.string().min(1),
      description: z.string().min(1).describe('One or two sentences, shown in the article list and link previews.'),
      body: z.string().min(1).describe('The post content in Markdown/MDX, without the title (the layout renders it).'),
      slug: z.string().regex(SLUG).optional().describe('URL slug; derived from the title if omitted.'),
      date: z.string().regex(DATE).optional().describe('Publication date, YYYY-MM-DD; defaults to today.'),
      dry_run: z.boolean().optional().describe('Validate and return the file without committing.'),
    },
  },
  async ({ title, description, body, slug, date, dry_run }) => {
    slug ??= slugify(title)
    if (!SLUG.test(slug)) return fail(`Could not derive a valid slug from the title; pass one explicitly.`)
    if (await readPost(slug)) return fail(`A post named "${slug}" already exists. Use update_post to change it.`)

    let source = buildPost({ title, description, date: date ?? today(), body })
    let error = await validatePost(source)
    if (error) return fail(`The post is not valid MDX and was not published: ${error}`)
    if (dry_run) return text({ slug, path: postPath(slug), url: postUrl(slug), source })

    let commit = await commitPost(slug, source, `feat(posts): publish "${title}"`)
    return text({ published: true, slug, url: postUrl(slug), commit, note: 'Live once the Netlify deploy for this commit finishes.' })
  },
)

server.registerTool(
  'update_post',
  {
    title: 'Update post',
    description:
      'Updates the title, description, and/or body of an existing post and commits the change to main. ' +
      'Fields left out keep their current value; the publication date and author never change. ' +
      'The result is compiled first and rejected if the MDX is invalid. Use dry_run to preview.',
    inputSchema: {
      slug: z.string().regex(SLUG),
      title: z.string().min(1).optional(),
      description: z.string().min(1).optional(),
      body: z.string().min(1).optional().describe('Replaces the whole body. Fetch it with get_post first to edit part of it.'),
      dry_run: z.boolean().optional(),
    },
  },
  async ({ slug, title, description, body, dry_run }) => {
    let current = await readPost(slug)
    if (!current) return fail(`No post named "${slug}".`)
    let fields = parsePost(current.source)
    if (fields.body === undefined || !fields.title || !fields.date) {
      return fail(`"${slug}" does not follow the standard post layout, so it can't be updated safely here. Edit it in the repo instead.`)
    }

    let source = editPost(current.source, { title, description, body })
    if (source === current.source) return text({ updated: false, slug, note: 'Nothing changed.' })
    let error = await validatePost(source)
    if (error) return fail(`The updated post is not valid MDX and was not committed: ${error}`)
    if (dry_run) return text({ slug, path: postPath(slug), url: postUrl(slug), source })

    let commit = await commitPost(slug, source, `feat(posts): update "${title ?? fields.title}"`, current.sha)
    return text({ updated: true, slug, url: postUrl(slug), commit, note: 'Live once the Netlify deploy for this commit finishes.' })
  },
)

await server.connect(new StdioServerTransport())
