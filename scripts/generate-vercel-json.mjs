// Regenerates vercel.json from the redirect map below.
// Every source ending in .html also emits a companion redirect without .html,
// because Vercel cleanUrls strips the extension before redirects are matched.
//
//   node scripts/generate-vercel-json.mjs [path/to/inventory/index.md] [path/to/blog-map.json]
//
// The obstacle-tutorial URLs are read from the "obstacle tutorials" group of the
// crawl inventory index so none are missed. First match wins: a source that was
// already mapped by an earlier group is skipped, so there are no conflicts.
//
// Blog posts come from scripts/blog-map.json (the approved mapping of all 86 old posts):
//   keep       -> migrated to src/content/blog/<slug>.md at the same URL, never redirected
//   to_program -> { slug: "/program-path" }, one 301 per post
//   to_blog    -> one 301 per post to /blog
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const inventoryIndex = process.argv[2] ?? join(root, 'scripts/weebly-crawl/inventory/index.md')
const blogMapFile = process.argv[3] ?? join(root, 'scripts/blog-map.json')
const blogMap = JSON.parse(readFileSync(blogMapFile, 'utf8'))

function obstacleTutorialPaths() {
  const md = readFileSync(inventoryIndex, 'utf8')
  const section = md.split(/^## /m).find((s) => s.startsWith('obstacle tutorials'))
  if (!section) throw new Error('No "obstacle tutorials" group in ' + inventoryIndex)
  return [...section.matchAll(/`(\/[^`]+\.html)`/g)].map((m) => m[1])
}

const tutorials = obstacleTutorialPaths()

// [destination, sources[]] in priority order.
const groups = [
  ['/', ['/index.html']],
  ['/after-school-care', ['/childcare.html', '/before-after-school-tour.html']],
  ['/infant-toddler-care', ['/infant-toddler-care.html', '/infant-toddler-care-624358.html', '/infant-toddler-tour.html']],
  ['/preschool', ['/preschool.html', '/preschool-tour.html', '/preschool-reviews.html']],
  ['/camps', ['/camps.html', '/thank-you-camp-registration.html']],
  [
    '/birthday-parties',
    ['/birthday-parties.html', '/kids-birthday-parties.html', '/birthdayparties10-16.html', '/adult-parties.html', '/birthday-party-reviews.html'],
  ],
  ['/parents-night-out', ['/parents-night-out.html', '/parents-night-out-reviews.html']],
  ['/open-play', ['/openplay.html', '/open-play-reviews.html']],
  [
    '/ninja-warrior',
    [
      '/ninja-warrior.html',
      '/ninja-warrior-trial.html',
      '/ninja-warrior-competition.html',
      '/ninja-warrior-members.html',
      '/members-only-ninja-warrior.html',
      '/ninja-warrior-reviews.html',
      '/ninja-warrior1.html',
      '/ninja-warrior-resources.html',
      '/thank-you-ninja-warrior.html',
      ...tutorials,
    ],
  ],
  [
    '/fitness-classes',
    [
      '/fitness-classes.html',
      '/fitness-signup.html',
      '/fitness-challenge.html',
      '/fitnesschallenge-648156.html',
      '/bootcamp-fitness.html',
      '/kickboxing.html',
      '/kickboxing-trial.html',
      '/kickboxing-1month.html',
      '/thank-you-kickboxing.html',
      '/4x4x48.html',
      '/holiday-challenge.html',
      '/members-only-fitness.html',
      '/fitness-reviews.html',
      '/martial-arts.html',
      '/martial-art-reviews.html',
    ],
  ],
  ['/ropes-course', ['/ropes-course.html', '/ropes-course-reviews.html']],
  ['/team-building', ['/teambuilding.html', '/team-building-reviews.html']],
  ['/pickleball', ['/indoor-pickleball.html']],
  ['/hours', ['/schedule.html']],
  ['/about', ['/aboutus.html', '/our-team.html', '/our-company.html', '/staff-community-reviews.html']],
  ['/contact', ['/contactus.html']],
  ['/jobs', ['/jobs.html', '/apply.html']],
  ['/waiver', ['/waiver.html']],
  ['/privacy', ['/privacy-policy.html']],
  ['/reviews', ['/reviews.html']],
  ['/', ['/programs--activities.html']],
  [
    '/blog',
    [
      '/blog.html',
      '/updates.html',
      '/updates/:path*',
      '/blog/archives/:path*',
      '/blog/category/:path*',
      '/blog/previous/:path*',
      ...blogMap.to_blog.map((slug) => `/blog/${slug}`),
    ],
  ],
  // Posts folded into a program page. Grouped by destination so the first-match-wins logic below still applies.
  ...Object.entries(
    Object.entries(blogMap.to_program).reduce((acc, [slug, dest]) => {
      ;(acc[dest] ??= []).push(`/blog/${slug}`)
      return acc
    }, {}),
  ).map(([dest, sources]) => [dest, sources]),
  [
    '/',
    [
      '/closed.html',
      '/black-friday-special.html',
      '/trunk-or-treat.html',
      '/block-party.html',
      '/holiday-challenge.html',
      '/thank-you.html',
      '/thank-you-infant.html',
      '/circuit-board.html',
      '/rumbling-dice.html',
    ],
  ],
  // Short aliases people (and old menus) hit after cleanUrls strips .html, or
  // bare stems that never existed as .html sources.
  [
    '/infant-toddler-care',
    ['/infant', '/infant-care', '/infant-care.html'],
  ],
  [
    '/fitness-classes',
    ['/fitness', '/martial-arts', '/kickboxing'],
  ],
  [
    '/ropes-course',
    ['/ropes'],
  ],
  [
    '/ninja-warrior',
    ['/ninja'],
  ],
  [
    '/team-building',
    ['/teambuilding'],
  ],
]

// Kept posts must never be redirected; a slug in two buckets is a mapping error.
const keep = new Set(blogMap.keep)
const buckets = [...Object.keys(blogMap.to_program), ...blogMap.to_blog]
for (const slug of buckets) if (keep.has(slug)) throw new Error(`blog-map: "${slug}" is in keep and also redirected`)
if (new Set(buckets).size !== buckets.length) throw new Error('blog-map: a slug is in both to_program and to_blog (or listed twice)')

const seen = new Set()
const redirects = []

function addRedirect(source, destination) {
  if (seen.has(source)) return // first match wins
  if (source === destination) return // no-op (e.g. /about.html companion would be /about)
  seen.add(source)
  redirects.push({ source, destination, statusCode: 301 })
}

for (const [destination, sources] of groups) {
  for (const source of sources) {
    addRedirect(source, destination)
    // Vercel cleanUrls strips .html BEFORE redirects match, so /aboutus.html
    // becomes /aboutus and never hits the .html rule. Mirror every .html source
    // with its bare path companion.
    if (source.endsWith('.html')) {
      const bare = source.slice(0, -'.html'.length)
      addRedirect(bare, destination)
    }
  }
}

const config = { cleanUrls: true, trailingSlash: false, redirects }
writeFileSync(join(root, 'vercel.json'), JSON.stringify(config, null, 2) + '\n')
const nProgram = Object.keys(blogMap.to_program).length
const nBlog = blogMap.to_blog.length
console.log(
  `Wrote vercel.json with ${redirects.length} redirects (${tutorials.length} obstacle tutorials; blog: ${nProgram} posts -> program pages, ${nBlog} posts -> /blog, ${blogMap.keep.length} kept posts not redirected).`,
)
