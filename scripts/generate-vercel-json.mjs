// Regenerates vercel.json from the redirect map below.
//
//   node scripts/generate-vercel-json.mjs [path/to/inventory/index.md]
//
// The obstacle-tutorial URLs are read from the "obstacle tutorials" group of the
// crawl inventory index so none are missed. First match wins: a source that was
// already mapped by an earlier group is skipped, so there are no conflicts.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const inventoryIndex = process.argv[2] ?? '/workspace/bim-site/inventory/index.md'

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
      // Temporary: individual posts are not migrated yet (see TODO.md).
      '/blog/:slug',
    ],
  ],
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
]

const seen = new Set()
const redirects = []
for (const [destination, sources] of groups) {
  for (const source of sources) {
    if (seen.has(source)) continue // first match wins
    seen.add(source)
    redirects.push({ source, destination, statusCode: 301 })
  }
}

const config = { cleanUrls: true, trailingSlash: false, redirects }
writeFileSync(join(root, 'vercel.json'), JSON.stringify(config, null, 2) + '\n')
console.log(`Wrote vercel.json with ${redirects.length} redirects (${tutorials.length} obstacle tutorials).`)
