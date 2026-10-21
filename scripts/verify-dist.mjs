// Post-build SEO sanity check:  npm run build && node scripts/verify-dist.mjs
// Full pages must have exactly one <h1>, a canonical, business (ChildCare, or EntertainmentBusiness for the
// activity pages) + FAQPage JSON-LD and no noindex.
// Stub pages must have exactly one <h1> and noindex,follow. The sitemap must list only the full pages.
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const SITE = 'https://www.bodiesinmotionidaho.com'
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

for (const file of readdirSync(dist).filter((f) => f.endsWith('.html'))) {
  const name = file.replace('.html', '')
  const html = readFileSync(join(dist, file), 'utf8')
  const h1 = count(html, /<h1[\s>]/g)
  if (h1 !== 1) errors.push(`${file}: ${h1} <h1> elements`)
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
  const noindex = /<meta name="robots" content="noindex,follow"/.test(html)
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
      if (!blocks.some((b) => Array.isArray(b['@type']) && b['@type'].includes('EntertainmentBusiness'))) errors.push(`${file}: missing EntertainmentBusiness JSON-LD`)
      if (types.includes('ChildCare')) errors.push(`${file}: unexpected ChildCare JSON-LD`)
    } else if (!types.includes('ChildCare')) errors.push(`${file}: missing ChildCare JSON-LD`)
    if (!types.includes('FAQPage')) errors.push(`${file}: missing FAQPage JSON-LD`)
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

const sitemap = readFileSync(join(dist, 'sitemap-0.xml'), 'utf8')
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
console.log('sitemap:', urls.join(', '))
const want = Object.values(full).map((p) => SITE + p)
for (const u of urls) if (!want.map((w) => w.replace(/\/$/, '')).includes(u.replace(/\/$/, ''))) errors.push(`sitemap includes ${u}`)
if (urls.length !== want.length) errors.push(`sitemap has ${urls.length} URLs, expected ${want.length}`)

if (errors.length) {
  console.error('\nProblems:\n  - ' + errors.join('\n  - '))
  process.exit(1)
}
console.log('\nOK')
