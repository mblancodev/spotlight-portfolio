# Portfolio (spotlight-portfolio)

Manuel's portfolio and blog at manuelblancodev.com, built on the Tailwind Plus "Spotlight" template. Next.js 14
with MDX articles. A push to `main` deploys on Netlify.

## Commands

| Do | Run |
| --- | --- |
| Dev at localhost:3000 | `npm run dev` |
| Build / lint | `npm run build` / `npm run lint` |
| Check the post publisher offline | `node mcp/posts-server.mjs --self-test` |

No tests.

## Map

| To change… | Go to | Grep |
| --- | --- | --- |
| Add or edit an article | `src/app/articles/writing-your-first-bash-script/page.mdx` is the shape: one folder per slug | |
| How articles are listed | `src/lib/articles.ts` | `getAllArticles` |
| The projects list | `src/lib/projects.ts` | `projects` |
| Case studies, and which are public | `src/lib/caseStudies.ts` | `caseStudies`, `isCaseStudyPublic` |
| Site-wide constants | `src/lib/site.ts` | |
| The CV download and upload | `src/app/api/cv/route.ts`, `src/lib/cvStore.ts` | `saveCv`, `readCv` |
| A page | `src/app/about`, `src/app/projects`, `src/app/work-experience` and their siblings | |
| Shared UI | `src/components/` | |
| The RSS feed | `src/app/feed.xml` | |
| MDX rendering and prose styles | `mdx-components.tsx`, `typography.ts` | |
| Publishing a post from an agent | `mcp/posts-server.mjs`, wired in `.mcp.json` | |

## Invariants

- **Publishing through the MCP server commits to `main` over the GitHub API**, which deploys. There is no draft
  step: a published post is live.
- **The CV is stored in Netlify Blobs in production** and falls back to a local or bundled file elsewhere
  (`CvSource` in `src/lib/cvStore.ts`). Uploads are authorized and capped at 6 MB.
- **Ask what to optimize for before a meaningful design decision** (rule zero of `design.md`).
- The template is under the Tailwind Plus license (`LICENSE.md`): don't republish it as a template.

## Deep docs

| Read | When |
| --- | --- |
| `design.md` | Any UI, motion or styling work. |

## Skills

| Skill | When |
| --- | --- |
| `.agents/skills/ip-as-logo` | Making a logo or mark |
