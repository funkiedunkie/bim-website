// Verifies vercel.json redirects.
//
//   node scripts/check-redirects.mjs [path/to/urls.txt] [path/to/pages.json]
//
// Checks that
//   1. every *.html URL in urls.txt is covered by a redirect,
//   2. every redirect is a 301, has a unique source and never points at itself,
//   3. every destination is a real page in src/pages,
//   4. every old blog URL (all posts in scripts/blog-map.json plus every /blog/ URL in urls.txt and
//      pages.json) is EITHER a kept post whose built page exists in dist/blog and is not redirected,
//      OR is redirected (to_program posts to their program page, to_blog posts to /blog).
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const urlsFile = process.argv[2] ?? '/workspace/urls.txt'
const pagesFile = process.argv[3] ?? '/workspace/bim-site/pages.json'
const blogMap = JSON.parse(readFileSync(join(root, 'scripts/blog-map.json'), 'utf8'))

const config = JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf8'))
const redirects = config.redirects ?? []
const errors = []

if (config.cleanUrls !== true) errors.push('cleanUrls must be true')
if (config.trailingSlash !== false) errors.push('trailingSlash must be false')

// Minimal path-to-regexp matcher for the patterns we use (:name, :name*).
function toRegExp(source) {
  const pattern = source
    .split('/')
    .map((seg) => {
      if (/^:\w+\*$/.test(seg)) return '.*'
      if (/^:\w+$/.test(seg)) return '[^/]+'
      return seg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    })
    .join('/')
  return new RegExp('^' + pattern + '/?$')
}

const matchers = redirects.map((r) => ({ ...r, re: toRegExp(r.source) }))

// 2. structural checks
const seenSources = new Set()
for (const r of redirects) {
  if (seenSources.has(r.source)) errors.push(`duplicate source ${r.source}`)
  seenSources.add(r.source)
  if (r.statusCode !== 301) errors.push(`${r.source} is not a 301`)
  if (r.source === r.destination) errors.push(`${r.source} redirects to itself`)
}

// 3. destinations exist
const pages = new Set(
  readdirSync(join(root, 'src/pages'))
    .filter((f) => f.endsWith('.astro'))
    .map((f) => '/' + f.replace(/\.astro$/, '').replace(/^index$/, '')),
)
for (const r of redirects) {
  if (!pages.has(r.destination)) errors.push(`${r.source} -> ${r.destination}: no such page in src/pages`)
}

// A redirect source must not shadow a real page (that would make the page unreachable).
for (const page of pages) {
  const hit = matchers.find((m) => m.re.test(page))
  if (hit) errors.push(`page ${page} is shadowed by redirect ${hit.source}`)
}

// 1. coverage of legacy URLs
const redirectFor = (p) => matchers.find((m) => m.re.test(p))
let urlPaths = []
if (!existsSync(urlsFile)) {
  errors.push(`URL list not found: ${urlsFile}`)
} else {
  const paths = readFileSync(urlsFile, 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((u) => new URL(u).pathname)
  urlPaths = paths
  const legacy = paths.filter((p) => p.endsWith('.html'))
  for (const p of legacy) if (!redirectFor(p)) errors.push(`no redirect covers ${p}`)
  console.log(`Checked ${paths.length} URLs from ${urlsFile} (${legacy.length} .html) against ${redirects.length} redirects.`)
}

// 4. blog: every old post is a built kept page or a redirect
const keep = new Set(blogMap.keep)
const toProgram = blogMap.to_program
const toBlog = new Set(blogMap.to_blog)
const mapSlugs = [...keep, ...Object.keys(toProgram), ...toBlog]
if (new Set(mapSlugs).size !== mapSlugs.length) errors.push('blog-map.json lists a slug more than once')

let pagePaths = []
if (!existsSync(pagesFile)) {
  errors.push(`pages.json not found: ${pagesFile}`)
} else {
  pagePaths = JSON.parse(readFileSync(pagesFile, 'utf8')).map((p) => new URL(p.url).pathname)
}

const oldBlogPaths = new Set([
  ...mapSlugs.map((s) => `/blog/${s}`),
  ...urlPaths.filter((p) => p.startsWith('/blog/')),
  ...pagePaths.filter((p) => p.startsWith('/blog/')),
])

const dist = join(root, 'dist/blog')
const stats = { kept: 0, program: 0, blog: 0, pattern: 0 }
for (const p of [...oldBlogPaths].sort()) {
  const slug = p.slice('/blog/'.length)
  const hit = redirectFor(p)
  if (keep.has(slug)) {
    if (hit) errors.push(`kept post ${p} must not be redirected (matches ${hit.source})`)
    if (!existsSync(join(root, 'src/content/blog', slug + '.md'))) errors.push(`kept post ${p}: src/content/blog/${slug}.md is missing`)
    if (!existsSync(join(dist, slug + '.html'))) errors.push(`kept post ${p}: no built page dist/blog/${slug}.html (run the build first)`)
    stats.kept++
  } else if (slug in toProgram) {
    if (!hit) errors.push(`${p}: not redirected, expected -> ${toProgram[slug]}`)
    else if (hit.destination !== toProgram[slug]) errors.push(`${p} -> ${hit.destination}, expected ${toProgram[slug]}`)
    else stats.program++
  } else if (toBlog.has(slug)) {
    if (!hit) errors.push(`${p}: not redirected, expected -> /blog`)
    else if (hit.destination !== '/blog') errors.push(`${p} -> ${hit.destination}, expected /blog`)
    else stats.blog++
  } else if (hit && hit.destination === '/blog') {
    stats.pattern++ // archive / category / pagination patterns
  } else if (existsSync(join(dist, slug + '.html'))) {
    errors.push(`${p}: built page exists but the slug is not in blog-map.json keep list`)
  } else {
    errors.push(`${p}: neither a kept post nor redirected`)
  }
}
// No redirect may shadow a built blog page.
if (existsSync(dist)) {
  for (const f of readdirSync(dist).filter((f) => f.endsWith('.html'))) {
    const p = '/blog/' + f.replace(/\.html$/, '')
    const hit = redirectFor(p)
    if (hit) errors.push(`built page ${p} is shadowed by redirect ${hit.source}`)
    if (!keep.has(f.replace(/\.html$/, ''))) errors.push(`dist/blog/${f} is not a kept post in blog-map.json`)
  }
}
const sources = (re) => redirects.filter((r) => re.test(r.source)).length
console.log(
  `Blog URLs checked: ${oldBlogPaths.size} unique (${mapSlugs.length} posts in blog-map.json). ` +
    `kept & built: ${stats.kept} | 301 to program pages: ${stats.program} | 301 to /blog: ${stats.blog} | archive/category/pagination: ${stats.pattern}`,
)
console.log(
  `Blog redirects in vercel.json: ${redirects.filter((r) => r.source.startsWith('/blog/') && !r.source.includes(':')).filter((r) => r.destination !== '/blog').length} to program pages, ` +
    `${redirects.filter((r) => r.source.startsWith('/blog/') && !r.source.includes(':') && r.destination === '/blog').length} per-post to /blog, ` +
    `${sources(/^\/(blog\/(archives|category|previous)|updates)\//) + sources(/^\/(blog|updates)\.html$/)} listing/pattern (/blog.html, /updates.html, /updates/*, /blog/archives|category|previous/*).`,
)

if (errors.length) {
  console.error(`\n${errors.length} problem(s):`)
  for (const e of errors) console.error('  - ' + e)
  process.exit(1)
}
console.log('OK: every legacy URL is covered, every old blog URL is a built kept post or redirected, all redirects are 301 with unique sources and valid destinations.')
