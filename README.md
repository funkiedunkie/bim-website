# Bodies in Motion website

Static [Astro](https://astro.build) site for Bodies in Motion, 729 W. Diamond St, Boise, ID 83705 · (208) 381-0587.
Replaces the Weebly site at https://www.bodiesinmotionidaho.com. Boise is the only location.

## Stack
- Astro 5, static output, plain `.astro` components (no React, router or Supabase)
- `@astrojs/sitemap`, `astro:assets` for image optimization
- Deployed on Vercel (`vercel.json` holds redirects). **Nothing here deploys automatically.**

## Commands
| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at http://localhost:4321 |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Preview the build |
| `npm run check:redirects` | Verify every legacy URL in `/workspace/urls.txt` is redirected, and every old blog URL (`scripts/blog-map.json`, `urls.txt`, `/workspace/bim-site/pages.json`) is a built kept post or redirected. Run after a build. Pass other paths as arguments (urls.txt, pages.json) |
| `node scripts/verify-dist.mjs` | After a build: check H1, canonical, JSON-LD, noindex, the blog listing and every blog post, and the sitemap |
| `node scripts/generate-vercel-json.mjs` | Regenerate `vercel.json` from the redirect map in the script and `scripts/blog-map.json` |

## Structure
```
src/
  assets/          photos and logo (optimized at build time); assets/blog/ holds one hero photo per post
  content/blog/    one markdown file per migrated blog post (collection schema in src/content.config.ts)
  components/      Nav, Footer, Faq, PriceTable, Reviews, Location
  layouts/         Base (head/SEO), CarePage (full care pages), ActivityPage (camps/parties/PNO/open play), Stub (noindex pages)
  lib/site.ts      NAP, external links, JSON-LD builders
  lib/blog.ts      blog date formatting, CTA map, BlogPosting JSON-LD
  pages/           one file per route
  styles/          global.css, home.css
public/            robots.txt, favicon, logo.png (used in JSON-LD)
scripts/           redirect generator/checker, dist verifier, blog-map.json (approved mapping of all 86 old posts)
```

## SEO notes
- **Full, indexable pages:** `/`, `/infant-toddler-care`, `/preschool`, `/after-school-care` (`ChildCare` JSON-LD) and
  `/camps`, `/birthday-parties`, `/parents-night-out`, `/open-play`, `/ninja-warrior`, `/fitness-classes`, `/ropes-course`,
  `/pickleball`, `/team-building`, `/about`, `/hours`, `/reviews`, `/contact`, `/jobs`, `/waiver`, `/privacy` (`ActivityPage`
  layout, `EntertainmentBusiness` JSON-LD; `/about` adds `AboutPage` + `Organization`; `/contact` adds `ContactPage`; `/hours`
  adds `openingHoursSpecification` for the childcare hours only; `/reviews` and `/jobs` deliberately have no review or
  `JobPosting` schema; `/reviews` renders `src/lib/reviews.ts`; `/privacy` is a draft pending legal review; `Event` JSON-LD only for upcoming dated events: camp days on `/camps` and the Cosmic Glow Party, dropped
  automatically at build time once their date passes). Camp dates/prices come from the Camps for Kids app and must be refreshed
  each season (see [TODO.md](TODO.md)). Each has a unique title and
  description, one H1, a canonical URL, `ChildCare` JSON-LD (name, address, phone, `areaServed`: Boise, Meridian, Garden City)
  and `FAQPage` JSON-LD. The visible FAQ is rendered from the same list as the JSON-LD so they always match.
  `openingHours` is only included where the source states it (7:30am–6pm Mon–Fri on infant/toddler and preschool).
- **Blog:** `/blog` is an indexable listing (cards sorted by original publish date, `CollectionPage` + `Blog` JSON-LD) and each
  of the 21 kept posts is `/blog/<slug>` (same slug as Weebly, so no redirect), rendered by `src/pages/blog/[slug].astro` from
  `src/content/blog/<slug>.md`. Each post has a unique title/description, one H1, a canonical, `BlogPosting` JSON-LD
  (original `datePublished`, `dateModified` 2026-10-21, Organization author/publisher with logo), an "Updated Oct 21, 2026 ·
  originally published ..." line, 2-4 internal program links and a CTA box taken from the first `relatedPages` entry (see
  `src/lib/blog.ts`). `reviewNotes` frontmatter is for Duncan only and is never rendered; the same flags are in
  [TODO.md](TODO.md). `/blog` and every post are added to the sitemap from the collection (read in `astro.config.mjs`).
- **Stub pages** use `src/layouts/Stub.astro`: `noindex,follow`, one real paragraph from the old site, and links to the live
  booking tools. They are excluded from the sitemap. (No stub pages are left at the moment.)
- `robots.txt` allows everything and points to `https://www.bodiesinmotionidaho.com/sitemap-index.xml`.
- Meridian and Garden City appear only as service areas, never as locations.
- Every fact comes from the crawl of the old site; anything missing is a `TODO(Duncan)` listed in [TODO.md](TODO.md).

## Redirect notes
- `vercel.json` sets `cleanUrls: true`, `trailingSlash: false` and 301 redirects from the old Weebly `.html` URLs to the new routes.
- First match wins; duplicate sources are dropped by the generator. Obstacle tutorial pages, ninja pages, fitness pages and
  the review pages redirect to their parent topic.
- Blog: `scripts/blog-map.json` is the approved mapping of all 86 old posts. `keep` (21) are migrated and never redirected;
  `to_program` (29) get one 301 each to their program page; `to_blog` (36) get one 301 each to `/blog`. `/blog.html`,
  `/updates.html`, `/updates/*`, `/blog/archives/*`, `/blog/category/*` and `/blog/previous/*` also 301 to `/blog`. There is no
  `/blog/:slug` catch-all, so a new post only needs its markdown file (and its slug in `keep`).
- Run `npm run check:redirects` after changing the map.

## Adding a blog post
1. Add `src/content/blog/<slug>.md` (frontmatter: `title`, optional `seoTitle`, `description`, `pubDate`, `updatedDate`, optional `heroImage` + `heroAlt`, `relatedPages`, optional `reviewNotes`) and its photo in `src/assets/blog/`.
2. Add the slug to `keep` in `scripts/blog-map.json`, run `node scripts/generate-vercel-json.mjs`, build, then run `verify-dist` and `check:redirects`.

## Adding or promoting a page
1. Create `src/pages/<slug>.astro` using `CarePage`/`ActivityPage`/`Base` (indexable) or `Stub` (noindex).
2. For an indexable page, add its path to the `indexable` list in `astro.config.mjs` and to `scripts/verify-dist.mjs`.
3. Use the constants in `src/lib/site.ts` for name/address/phone so NAP stays consistent.

## Contact form
`src/components/ContactForm.astro` posts to `/api/contact` (`api/contact.js`, a Vercel Function) which emails help@bodiesinmotionidaho.com through Resend. Env vars: `RESEND_API_KEY`, `CONTACT_FROM` (verified sender), optional `CONTACT_TO`. If they're unset or delivery fails, the form offers a pre-filled mailto link instead.

Requires Node >= 22.22 (Astro 7).
