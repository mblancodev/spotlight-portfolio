import fs from 'fs'
import path from 'path'

import DriftWall from '@/components/DriftWall'

const COLUMNS = 3

/**
 * Screenshots in public/projects/<slug>/, read at build time. Sorted names put each
 * page's light and dark captures side by side, so columns mix both themes.
 * Falls back to the cover image when there are none.
 */
function wallItems(slug: string, name: string, cover?: string) {
  let dir = path.join(process.cwd(), 'public/projects', slug)
  let files = fs.existsSync(dir)
    ? fs
        .readdirSync(dir)
        .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
        .sort()
    : []
  let images = files.length
    ? files.map((file) => `/projects/${slug}/${file}`)
    : cover
      ? [cover]
      : []
  // Tiles are dealt round-robin into columns; with few images each column would
  // repeat one. Repeat the set with an offset so every column cycles through all.
  if (images.length > 1 && images.length < COLUMNS * 2) {
    images = images.flatMap((_, shift) =>
      images.map((_, i) => images[(i + shift) % images.length]),
    )
  }
  return images.map((image) => ({ image, title: name, interactive: true }))
}

/** Drift wall of a project's screenshots, shown beside its case study. */
export function ProjectWall({
  slug,
  name,
  cover,
}: {
  slug: string
  name: string
  cover?: string
}) {
  return (
    <DriftWall
      items={wallItems(slug, name, cover)}
      columns={COLUMNS}
      turn={0}
      zoom={2}
      fade={0.2}
      // Tint follows the theme, so tiles read in light mode too.
      overlayColor="var(--background)"
      dim={0.8}
      shade={0.2}
    />
  )
}
