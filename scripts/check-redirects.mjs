// Verifies vercel.json redirects.
//
//   node scripts/check-redirects.mjs [path/to/urls.txt]
//
// Checks that
//   1. every *.html URL in urls.txt is covered by a redirect (and every other
//      legacy URL, e.g. /blog/<slug>, is too),
//   2. every redirect is a 301, has a unique source and never points at itself,
//   3. every destination is a real page in src/pages.
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const urlsFile = process.argv[2] ?? '/workspace/urls.txt'

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
if (!existsSync(urlsFile)) {
  errors.push(`URL list not found: ${urlsFile}`)
} else {
  const paths = readFileSync(urlsFile, 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((u) => new URL(u).pathname)
  const legacy = paths.filter((p) => p.endsWith('.html') || p.startsWith('/blog/'))
  const uncovered = legacy.filter((p) => !matchers.some((m) => m.re.test(p)))
  for (const p of uncovered) errors.push(`no redirect covers ${p}`)
  const html = paths.filter((p) => p.endsWith('.html')).length
  console.log(`Checked ${paths.length} URLs from ${urlsFile} (${html} .html, ${legacy.length - html} blog posts) against ${redirects.length} redirects.`)
}

if (errors.length) {
  console.error(`\n${errors.length} problem(s):`)
  for (const e of errors) console.error('  - ' + e)
  process.exit(1)
}
console.log('OK: every legacy URL is covered, all redirects are 301 with unique sources and valid destinations.')
