import fs from 'fs-extra'
import path from 'path'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import Prism from 'markdown-it-prism'
import LinkAttributes from 'markdown-it-link-attributes'
import anchor from 'markdown-it-anchor'
import string from 'string'

type DocEntry = {
  slug: string
  route: string
  title: string
  description?: string
  heading?: string
  section: 'docs' | 'pages'
  html?: string // Optional for index, required for full content
}



const md = new MarkdownIt({
  html: true,
  linkify: true,
})

md.use(anchor, {
  slugify: (text: string) => string(text).slugify().toString(),
})
md.use(Prism)
md.use(LinkAttributes, {
  matcher: (link: string) => /^https?:\/\//.test(link),
  attrs: {
    target: '_blank',
    rel: 'noopener noreferrer',
  },
})

const runnableFlags = new Set(['run', 'runnable'])
const defaultFenceRenderer = md.renderer.rules.fence
const fileFlagMatcher = /^(file|filename)=(.+)$/i

function escapeAttribute(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
}

function parseFenceInfo(info: string) {
  const parts = info.split(/\s+/).filter(Boolean)
  const flags: string[] = []
  let fileName: string | undefined

  for (const part of parts.slice(1)) {
    const match = part.match(fileFlagMatcher)
    if (match) {
      fileName = match[2].replace(/^['"]|['"]$/g, '')
      continue
    }

    flags.push(part)
  }

  return { flags, fileName }
}

md.renderer.rules.fence = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  const info = (token.info || '').trim()
  const { flags, fileName } = parseFenceInfo(info)
  const isRunnable = flags.some((flag) => runnableFlags.has(flag))
  const rendered = defaultFenceRenderer
    ? defaultFenceRenderer(tokens, idx, options, env, self)
    : self.renderToken(tokens, idx, options)

  const attributes: string[] = []
  if (isRunnable) {
    attributes.push('data-run="true"')
  }
  if (fileName) {
    attributes.push(`data-file="${escapeAttribute(fileName)}"`)
  }

  if (!attributes.length) {
    return rendered
  }

  const attributeString = ` ${attributes.join(' ')}`
  return rendered
    .replace('<pre', `<pre${attributeString}`)
    .replace('<code', `<code${attributeString}`)
}

const lightBulbIcon = `
<svg aria-hidden="true" viewBox="0 0 32 32" fill="none" class="h-8 w-8 flex-none [--icon-foreground:var(--color-slate-900)] [--icon-background:var(--color-white)]">
  <defs>
    <radialGradient id=":r6:-gradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 21 -21 0 20 11)">
      <stop stop-color="#fbbf24"></stop>
      <stop stop-color="#fb923c" offset=".527"></stop>
      <stop stop-color="#f87171" offset="1"></stop>
    </radialGradient>
    <radialGradient id=":r6:-gradient-dark" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 24.5001 -19.2498 0 16 5.5)">
      <stop stop-color="#fbbf24"></stop>
      <stop stop-color="#fb923c" offset=".527"></stop>
      <stop stop-color="#f87171" offset="1"></stop>
    </radialGradient>
  </defs>
  <g class="dark:hidden">
    <circle cx="20" cy="20" r="12" fill="url(#:r6:-gradient)"></circle>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M20 24.995c0-1.855 1.094-3.501 2.427-4.792C24.61 18.087 26 15.07 26 12.231 26 7.133 21.523 3 16 3S6 7.133 6 12.23c0 2.84 1.389 5.857 3.573 7.973C10.906 21.494 12 23.14 12 24.995V27a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.005Z" class="fill-(--icon-background)" fill-opacity="0.5"></path>
    <path d="M25 12.23c0 2.536-1.254 5.303-3.269 7.255l1.391 1.436c2.354-2.28 3.878-5.547 3.878-8.69h-2ZM16 4c5.047 0 9 3.759 9 8.23h2C27 6.508 21.998 2 16 2v2Zm-9 8.23C7 7.76 10.953 4 16 4V2C10.002 2 5 6.507 5 12.23h2Zm3.269 7.255C8.254 17.533 7 14.766 7 12.23H5c0 3.143 1.523 6.41 3.877 8.69l1.392-1.436ZM13 27v-2.005h-2V27h2Zm1 1a1 1 0 0 1-1-1h-2a3 3 0 0 0 3 3v-2Zm4 0h-4v2h4v-2Zm1-1a1 1 0 0 1-1 1v2a3 3 0 0 0 3-3h-2Zm0-2.005V27h2v-2.005h-2ZM8.877 20.921C10.132 22.136 11 23.538 11 24.995h2c0-2.253-1.32-4.143-2.731-5.51L8.877 20.92Zm12.854-1.436C20.32 20.852 19 22.742 19 24.995h2c0-1.457.869-2.859 2.122-4.074l-1.391-1.436Z" class="fill-(--icon-foreground)"></path>
    <path d="M20 26a1 1 0 1 0 0-2v2Zm-8-2a1 1 0 1 0 0 2v-2Zm2 0h-2v2h2v-2Zm1 1V13.5h-2V25h2Zm-5-11.5v1h2v-1h-2Zm3.5 4.5h5v-2h-5v2Zm8.5-3.5v-1h-2v1h2ZM20 24h-2v2h2v-2Zm-2 0h-4v2h4v-2Zm-1-10.5V25h2V13.5h-2Zm2.5-2.5a2.5 2.5 0 0 0-2.5 2.5h2a.5.5 0 0 1 .5-.5v-2Zm2.5 2.5a2.5 2.5 0 0 0-2.5-2.5v2a.5.5 0 0 1 .5.5h2ZM18.5 18a3.5 3.5 0 0 0 3.5-3.5h-2a1.5 1.5 0 0 1-1.5 1.5v2ZM10 14.5a3.5 3.5 0 0 0 3.5 3.5v-2a1.5 1.5 0 0 1-1.5-1.5h-2Zm2.5-3.5a2.5 2.5 0 0 0-2.5 2.5h2a.5.5 0 0 1 .5-.5v-2Zm2.5 2.5a2.5 2.5 0 0 0-2.5-2.5v2a.5.5 0 0 1 .5.5h2Z" class="fill-(--icon-foreground)"></path>
  </g>
  <g class="hidden dark:inline">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M16 2C10.002 2 5 6.507 5 12.23c0 3.144 1.523 6.411 3.877 8.691.75.727 1.363 1.52 1.734 2.353.185.415.574.726 1.028.726H12a1 1 0 0 0 1-1v-4.5a.5.5 0 0 0-.5-.5A3.5 3.5 0 0 1 9 14.5V14a3 3 0 1 1 6 0v9a1 1 0 1 0 2 0v-9a3 3 0 1 1 6 0v.5a3.5 3.5 0 0 1-3.5 3.5.5.5 0 0 0-.5.5V23a1 1 0 0 0 1 1h.36c.455 0 .844-.311 1.03-.726.37-.833.982-1.626 1.732-2.353 2.354-2.28 3.878-5.547 3.878-8.69C27 6.507 21.998 2 16 2Zm5 25a1 1 0 0 0-1-1h-8a1 1 0 0 0-1 1 3 3 0 0 0 3 3h4a3 3 0 0 0 3-3Zm-8-13v1.5a.5.5 0 0 1-.5.5 1.5 1.5 0 0 1-1.5-1.5V14a1 1 0 1 1 2 0Zm6.5 2a.5.5 0 0 1-.5-.5V14a1 1 0 1 1 2 0v.5a1.5 1.5 0 0 1-1.5 1.5Z" fill="url(#:r6:-gradient-dark)"></path>
  </g>
</svg>
`

const warningIcon = `
<svg aria-hidden="true" viewBox="0 0 32 32" fill="none" class="h-8 w-8 flex-none [--icon-foreground:var(--color-amber-900)] [--icon-background:var(--color-amber-100)]">
  <defs>
    <radialGradient id=":rh:-gradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(65.924 1.519 20.92) scale(25.7391)">
      <stop stop-color="#fbbf24"></stop>
      <stop stop-color="#fb923c" offset=".527"></stop>
      <stop stop-color="#f87171" offset="1"></stop>
    </radialGradient>
    <radialGradient id=":rh:-gradient-dark" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 24.5 -24.5 0 16 5.5)">
      <stop stop-color="#fbbf24"></stop>
      <stop stop-color="#fb923c" offset=".527"></stop>
      <stop stop-color="#f87171" offset="1"></stop>
    </radialGradient>
  </defs>
  <g class="dark:hidden">
    <circle cx="20" cy="20" r="12" fill="url(#:rh:-gradient)"></circle>
    <path d="M3 16c0 7.18 5.82 13 13 13s13-5.82 13-13S23.18 3 16 3 3 8.82 3 16Z" fill-opacity="0.5" class="fill-(--icon-background) stroke-(--icon-foreground)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="m15.408 16.509-1.04-5.543a1.66 1.66 0 1 1 3.263 0l-1.039 5.543a.602.602 0 0 1-1.184 0Z" class="fill-(--icon-foreground) stroke-(--icon-foreground)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M16 23a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill-opacity="0.5" stroke="currentColor" class="fill-(--icon-background) stroke-(--icon-foreground)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
  </g>
  <g class="hidden dark:inline">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14-6.268 14-14 14S2 23.732 2 16Zm11.386-4.85a2.66 2.66 0 1 1 5.228 0l-1.039 5.543a1.602 1.602 0 0 1-3.15 0l-1.04-5.543ZM16 20a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" fill="url(#:rh:-gradient-dark)"></path>
  </g>
</svg>
`

function titleFromSlug(slug: string) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function extractBaseTitle(content: string) {
  const titleMatch = content.match(/<base-title[^>]*>([\s\S]*?)<\/base-title>/)
  const heading = titleMatch ? titleMatch[1].trim() : undefined
  const cleaned = content.replace(/<base-title[\s\S]*?<\/base-title>/g, '')
  return { heading, cleaned }
}

function replaceCustomBlocks(content: string) {
  return content
    .replace(
      /<base-disclaimer(?:\s[^>]*)?>/g,
      '<div class="my-8 rounded-2xl bg-amber-50 p-6 dark:bg-zinc-800/60 dark:ring-1 dark:ring-zinc-300/10">',
    )
    .replace(/<\/base-disclaimer>/g, '</div></div>')
    .replace(
      /<base-disclaimer-title[^>]*>/g,
      `<div class="flex items-center gap-4">${lightBulbIcon}<p class="m-0 font-display text-xl leading-tight text-amber-900 dark:text-amber-400!">`,
    )
    .replace(/<\/base-disclaimer-title>/g, '</p></div>')
    .replace(
      /<base-disclaimer-content[^>]*>/g,
      '<div class="dark:!prose-code:text-zinc-300 prose mt-2.5 text-amber-800 [--tw-prose-background:var(--color-sky-50)] prose-a:text-amber-900! prose-a:decoration-amber-600 prose-a:decoration-2 prose-a:underline-offset-0 prose-code:text-amber-900 dark:text-zinc-300 dark:prose-a:text-amber-400!"><p>',
    )
    .replace(/<\/base-disclaimer-content>/g, '</p></div>')
    .replace(
      /<base-warning(?:\s[^>]*)?>/g,
      '<div class="my-8 rounded-2xl bg-amber-50 p-6 dark:bg-zinc-800/60 dark:ring-1 dark:ring-zinc-300/10">',
    )
    .replace(/<\/base-warning>/g, '</div></div>')
    .replace(
      /<base-warning-title[^>]*>/g,
      `<div class="flex items-center gap-4">${warningIcon}<p class="m-0 font-display text-xl leading-tight text-amber-900 dark:text-amber-500">`,
    )
    .replace(/<\/base-warning-title>/g, '</p></div>')
    .replace(
      /<base-warning-content[^>]*>/g,
      '<div class="prose mt-2.5 text-amber-800 [--tw-prose-background:var(--color-amber-50)] [--tw-prose-underline:var(--color-amber-400)] prose-a:text-amber-900 prose-code:text-amber-900 dark:text-zinc-300 dark:[--tw-prose-underline:var(--color-amber-700)] dark:prose-code:text-zinc-300"><p>',
    )
    .replace(/<\/base-warning-content>/g, '</p></div>')
}

function normalizeBaseUrl(raw: string | undefined) {
  if (!raw) {
    return 'http://localhost:3000'
  }
  if (/^https?:\/\//.test(raw)) {
    return raw
  }
  return `https://${raw}`
}

async function readMarkdownFiles(directory: string) {
  const files = await fs.readdir(directory)
  const markdownFiles = files.filter((file) => file.endsWith('.md'))
  return markdownFiles.map((file) => path.join(directory, file))
}

async function buildDocs() {
  const docsDir = path.resolve(process.cwd(), 'docs/cheatsheet')
  const pagesDir = path.resolve(process.cwd(), 'src/pages')

  const docsFiles = await readMarkdownFiles(docsDir)
  const pagesFiles = await readMarkdownFiles(pagesDir)

  const docs = await Promise.all(
    docsFiles.map(async (file) => {
      const slug = path.basename(file, '.md')
      const raw = await fs.readFile(file, 'utf-8')
      const parsed = matter(raw)
      const { heading, cleaned } = extractBaseTitle(parsed.content)
      const normalized = replaceCustomBlocks(cleaned)
      const html = md.render(normalized)

      return {
        slug,
        route: `/cheatsheet/${slug}`,
        title: parsed.data.title || heading || titleFromSlug(slug),
        description: parsed.data.description,
        heading,
        html,
        section: 'docs',
      } as DocEntry
    }),
  )

  const pages = await Promise.all(
    pagesFiles.map(async (file) => {
      const slug = path.basename(file, '.md')
      const raw = await fs.readFile(file, 'utf-8')
      const parsed = matter(raw)
      const { heading, cleaned } = extractBaseTitle(parsed.content)
      const normalized = replaceCustomBlocks(cleaned)
      const html = md.render(normalized)

      return {
        slug,
        route: `/${slug}`,
        title: parsed.data.title || heading || titleFromSlug(slug),
        description: parsed.data.description,
        heading,
        html,
        section: 'pages',
      } as DocEntry
    }),
  )

  const outputDir = path.resolve(process.cwd(), 'src/content')
  await fs.ensureDir(outputDir)
  
  const entriesDir = path.join(outputDir, 'entries')
  await fs.ensureDir(entriesDir)

  // Write individual content files
  for (const doc of [...docs, ...pages]) {
    await fs.writeJson(
      path.join(entriesDir, `${doc.slug}.json`),
      doc,
      { spaces: 2 }
    )
  }

  // Write lightweight index (metadata only, no HTML)
  const docsIndex = docs.map(({ html, ...rest }) => rest)
  const pagesIndex = pages.map(({ html, ...rest }) => rest)

  await fs.writeJson(
    path.join(outputDir, 'docs.json'),
    { docs: docsIndex, pages: pagesIndex },
    {
      spaces: 2,
    },
  )

  const routes = [
    '/',
    ...pages.map((page) => page.route),
    ...docs.map((doc) => doc.route),
  ]
  await fs.writeJson(path.join(outputDir, 'routes.json'), routes, { spaces: 2 })

  const baseUrl = normalizeBaseUrl(process.env.VITE_BASE_URL)
  const sitemapEntries = routes
    .map((route) => {
      const url = new URL(route, baseUrl).toString()
      return `  <url><loc>${url}</loc></url>`
    })
    .join('\n')
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`
  await fs.writeFile(
    path.resolve(process.cwd(), 'public', 'sitemap.xml'),
    sitemap,
  )
}

buildDocs().catch((error) => {
  console.error(error)
  process.exit(1)
})
