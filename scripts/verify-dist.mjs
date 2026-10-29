// Post-build SEO sanity check:  npm run build && node scripts/verify-dist.mjs
// Full pages must have exactly one <h1>, a canonical, business (ChildCare, or EntertainmentBusiness for the
// activity pages) + FAQPage JSON-LD and no noindex.
// Stub pages must have exactly one <h1> and noindex,follow. The sitemap must list only the full pages.
// /blog (indexable listing, CollectionPage + Blog JSON-LD) and every post in src/content/blog
// (BlogPosting JSON-LD, canonical, one h1, no noindex, no sawyer) are checked separately.
import { readFileSync, readdirSync, existsSync as existsDir } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const SITE = 'https://bodiesinmotionidaho.com'
const full = {
  index: '/',
  'infant-toddler-care': '/infant-toddler-care',
  preschool: '/preschool',
  'after-school-care': '/after-school-care',
  camps: '/camps',
  'birthday-parties': '/birthday-parties',
  'parents-night-out': '/parents-night-out',
  'open-play': '/open-play',
  'ninja-warrior': '/ninja-warrior',
  'fitness-classes': '/fitness-classes',
  'ropes-course': '/ropes-course',
  pickleball: '/pickleball',
  'trunk-or-treat': '/trunk-or-treat',
  'team-building': '/team-building',
  about: '/about',
  hours: '/hours',
  reviews: '/reviews',
  contact: '/contact',
  jobs: '/jobs',
  waiver: '/waiver',
  privacy: '/privacy',
}
// Care pages carry ChildCare JSON-LD; the activity pages carry the EntertainmentBusiness node instead.
const activity = new Set([
  'camps',
  'birthday-parties',
  'parents-night-out',
  'open-play',
  'ninja-warrior',
  'fitness-classes',
  'ropes-course',
  'pickleball',
  'trunk-or-treat',
  'team-building',
  'about',
  'hours',
  'reviews',
  'contact',
  'jobs',
  'waiver',
  'privacy',
])
const errors = []

const count = (s, re) => (s.match(re) ?? []).length
const hasType = (b, t) => b['@type'] === t || (Array.isArray(b['@type']) && b['@type'].includes(t))


for (const file of readdirSync(dist).filter((f) => f.endsWith('.html') && f !== 'blog.html')) {
  const name = file.replace('.html', '')
  const html = readFileSync(join(dist, file), 'utf8')
  const h1 = count(html, /<h1[\s>]/g)
  if (h1 !== 1) errors.push(`${file}: ${h1} <h1> elements`)
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
  const noindex = /<meta name="robots" content="noindex,[^"]*"/.test(html)
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1]
  if (!title || !desc) errors.push(`${file}: missing title/description`)

  if (name in full) {
    const expected = SITE + (full[name] === '/' ? '/' : full[name])
    if (canonical !== expected) errors.push(`${file}: canonical ${canonical} != ${expected}`)
    if (noindex) errors.push(`${file}: full page must not be noindex`)
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]))
    const types = blocks.map((b) => b['@type'])
    if (activity.has(name)) {
      if (!blocks.some((b) => hasType(b, 'EntertainmentBusiness'))) errors.push(`${file}: missing EntertainmentBusiness JSON-LD`)
      if (blocks.some((b) => hasType(b, 'ChildCare'))) errors.push(`${file}: unexpected ChildCare JSON-LD`)
    } else if (!blocks.some((b) => hasType(b, 'ChildCare'))) errors.push(`${file}: missing ChildCare JSON-LD`)
    if (!types.includes('FAQPage')) errors.push(`${file}: missing FAQPage JSON-LD`)
    if (!/twitter:card" content="summary_large_image"/.test(html)) errors.push(`${file}: missing twitter:card summary_large_image`)
    if (name !== 'index' && name !== 'privacy' && !blocks.some((b) => hasType(b, 'BreadcrumbList'))) errors.push(`${file}: missing BreadcrumbList JSON-LD`)
    const faq = blocks.find((b) => b['@type'] === 'FAQPage')
    const visible = count(html, /<details class="[^"]*faq__item/g)
    if (faq && faq.mainEntity.length !== visible) errors.push(`${file}: ${faq.mainEntity.length} FAQ schema items vs ${visible} visible`)
    console.log(`full  ${file.padEnd(26)} h1=${h1} canonical=ok jsonld=[${types.join(', ')}] faq=${visible} title="${title}"`)
  } else {
    if (!noindex) errors.push(`${file}: stub page missing noindex,follow`)
    console.log(`stub  ${file.padEnd(26)} h1=${h1} noindex=${noindex} title="${title}"`)
  }
  if (/hisawyer\.com|sawyer/i.test(html)) errors.push(`${file}: contains a Sawyer link`)
  if (/555|50,000|Now open|Jessica M|Tyler R|Amanda S|Meridian, ID/.test(html.replace(/areaServed[\s\S]*?\]/g, ''))) {
    errors.push(`${file}: contains a banned/invented string`)
  }
}

// Blog posts: one per markdown file in the content collection.
const postSlugs = readdirSync(join(root, 'src/content/blog'))
  .filter((f) => f.endsWith('.md'))
  .map((f) => f.replace(/\.md$/, ''))
const jsonLdBlocks = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]))
// Hashed asset URLs can contain digits like "555"; look at visible markup only.
const visibleOnly = (html) => html.replace(/\s(src|srcset|href|content)="[^"]*"/g, '')
const bannedRe = /555|50,000|Now open|Jessica M|Tyler R|Amanda S|Meridian, ID/

const blogHtml = readFileSync(join(dist, 'blog.html'), 'utf8')
{
  const h1 = count(blogHtml, /<h1[\s>]/g)
  if (h1 !== 1) errors.push(`blog.html: ${h1} <h1> elements`)
  if (blogHtml.match(/<link rel="canonical" href="([^"]+)"/)?.[1] !== SITE + '/blog') errors.push('blog.html: wrong canonical')
  if (/name="robots" content="noindex/.test(blogHtml)) errors.push('blog.html: must not be noindex')
  if (!/<title>[^<]+<\/title>/.test(blogHtml) || !/<meta name="description" content="[^"]+"/.test(blogHtml)) errors.push('blog.html: missing title/description')
  const blocks = jsonLdBlocks(blogHtml)
  const collection = blocks.find((b) => [].concat(b['@type']).includes('CollectionPage') && [].concat(b['@type']).includes('Blog'))
  if (!collection) errors.push('blog.html: missing CollectionPage/Blog JSON-LD')
  else if (collection.blogPost.length !== postSlugs.length) errors.push(`blog.html: ${collection.blogPost.length} blogPost entries vs ${postSlugs.length} posts`)
  const cards = count(blogHtml, /class="post-card"/g)
  if (cards !== postSlugs.length) errors.push(`blog.html: ${cards} cards vs ${postSlugs.length} posts`)
  const dates = [...blogHtml.matchAll(/class="post-card__date">\s*<time datetime="([^"]+)"/g)].map((m) => m[1])
  if (dates.join() !== [...dates].sort().reverse().join()) errors.push('blog.html: cards are not sorted by pubDate descending')
  if (/sawyer/i.test(blogHtml) || bannedRe.test(visibleOnly(blogHtml))) errors.push('blog.html: contains a banned string')
  console.log(`blog  blog.html${' '.repeat(16)} h1=${h1} canonical=ok jsonld=[${blocks.map((b) => [].concat(b['@type']).join('+')).join(', ')}] cards=${cards}`)
}

const postFiles = existsDir(join(dist, 'blog')) ? readdirSync(join(dist, 'blog')).filter((f) => f.endsWith('.html')) : []
if (postFiles.length !== postSlugs.length) errors.push(`dist/blog has ${postFiles.length} pages, expected ${postSlugs.length}`)
const seenTitles = new Set()
const seenDescs = new Set()
for (const slug of postSlugs) {
  const file = `blog/${slug}.html`
  if (!postFiles.includes(slug + '.html')) {
    errors.push(`${file}: not built`)
    continue
  }
  const html = readFileSync(join(dist, file), 'utf8')
  const h1 = count(html, /<h1[\s>]/g)
  if (h1 !== 1) errors.push(`${file}: ${h1} <h1> elements`)
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
  if (canonical !== `${SITE}/blog/${slug}`) errors.push(`${file}: canonical ${canonical}`)
  if (/name="robots" content="noindex/.test(html)) errors.push(`${file}: must not be noindex`)
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1]
  if (!title || !desc) errors.push(`${file}: missing title/description`)
  else {
    if (seenTitles.has(title)) errors.push(`${file}: duplicate title`)
    if (seenDescs.has(desc)) errors.push(`${file}: duplicate description`)
    seenTitles.add(title)
    seenDescs.add(desc)
  }
  const posting = jsonLdBlocks(html).find((b) => b['@type'] === 'BlogPosting')
  if (!posting) errors.push(`${file}: missing BlogPosting JSON-LD`)
  else {
    for (const k of ['headline', 'description', 'datePublished', 'dateModified', 'author', 'publisher', 'mainEntityOfPage']) if (!posting[k]) errors.push(`${file}: BlogPosting missing ${k}`)
    if (posting.dateModified !== '2026-10-21') errors.push(`${file}: dateModified ${posting.dateModified}`)
    if (!posting.publisher?.logo?.url) errors.push(`${file}: publisher logo missing`)
    if (posting.mainEntityOfPage?.['@id'] !== `${SITE}/blog/${slug}`) errors.push(`${file}: mainEntityOfPage mismatch`)
  }
  if (!/Updated <time datetime="2026-10-21">Oct 21, 2026<\/time> · originally published <time datetime="\d{4}-\d{2}-\d{2}">/.test(html)) errors.push(`${file}: missing "Updated Oct 21, 2026 · originally published" line`)
  if (!/class="cta-box"/.test(html)) errors.push(`${file}: missing CTA box`)
  const internal = (html.match(/<article[\s\S]*?<\/article>/)?.[0].match(/<a href="\/(?!blog)[^"]*"/g) ?? []).length
  if (internal < 2) errors.push(`${file}: only ${internal} internal program links in the body`)
  if (/hisawyer\.com|sawyer/i.test(html)) errors.push(`${file}: contains a Sawyer link`)
  if (/groupon|eventbrite/i.test(visibleOnly(html))) errors.push(`${file}: contains a Groupon/Eventbrite link`)
  if (bannedRe.test(visibleOnly(html))) errors.push(`${file}: contains a banned/invented string`)
  console.log(`post  ${file.padEnd(78)} h1=${h1} links=${internal} title=${title?.length}c`)
}

const sitemap = readFileSync(join(dist, 'sitemap-0.xml'), 'utf8')
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
console.log('sitemap:', urls.join(', '))
const want = [...Object.values(full), '/blog', ...postSlugs.map((s) => `/blog/${s}`)].map((p) => SITE + p)
for (const u of urls) if (!want.map((w) => w.replace(/\/$/, '')).includes(u.replace(/\/$/, ''))) errors.push(`sitemap includes ${u}`)
if (urls.length !== want.length) errors.push(`sitemap has ${urls.length} URLs, expected ${want.length}`)

if (errors.length) {
  console.error('\nProblems:\n  - ' + errors.join('\n  - '))
  process.exit(1)
}
console.log('\nOK')
