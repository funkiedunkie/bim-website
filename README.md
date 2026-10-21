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
| `npm run check:redirects` | Verify every legacy URL in `/workspace/urls.txt` is redirected (pass another path as an argument) |
| `node scripts/verify-dist.mjs` | After a build: check H1, canonical, JSON-LD, noindex and the sitemap |
| `node scripts/generate-vercel-json.mjs` | Regenerate `vercel.json` from the redirect map in the script |

## Structure
```
src/
  assets/          photos and logo (optimized at build time)
  components/      Nav, Footer, Faq, PriceTable, Reviews, Location
  layouts/         Base (head/SEO), CarePage (full care pages), ActivityPage (camps/parties/PNO/open play), Stub (noindex pages)
  lib/site.ts      NAP, external links, JSON-LD builders
  pages/           one file per route
  styles/          global.css, home.css
public/            robots.txt, favicon, logo.png (used in JSON-LD)
scripts/           redirect generator/checker, dist verifier
```

## SEO notes
- **Full, indexable pages:** `/`, `/infant-toddler-care`, `/preschool`, `/after-school-care` (`ChildCare` JSON-LD) and
  `/camps`, `/birthday-parties`, `/parents-night-out`, `/open-play` (`ActivityPage` layout, `EntertainmentBusiness` JSON-LD;
  `Event` JSON-LD only for the dated Cosmic Glow Party, dropped automatically once its date passes). Each has a unique title and
  description, one H1, a canonical URL, `ChildCare` JSON-LD (name, address, phone, `areaServed`: Boise, Meridian, Garden City)
  and `FAQPage` JSON-LD. The visible FAQ is rendered from the same list as the JSON-LD so they always match.
  `openingHours` is only included where the source states it (7:30am–6pm Mon–Fri on infant/toddler and preschool).
- **Stub pages** (`/hours`, `/pickleball`, …) use `src/layouts/Stub.astro`: `noindex,follow`, one real
  paragraph from the old site, and links to the live booking tools. They are excluded from the sitemap.
- `robots.txt` allows everything and points to `https://www.bodiesinmotionidaho.com/sitemap-index.xml`.
- Meridian and Garden City appear only as service areas, never as locations.
- Every fact comes from the crawl of the old site; anything missing is a `TODO(Duncan)` listed in [TODO.md](TODO.md).

## Redirect notes
- `vercel.json` sets `cleanUrls: true`, `trailingSlash: false` and 301 redirects from the old Weebly `.html` URLs to the new routes.
- First match wins; duplicate sources are dropped by the generator. Obstacle tutorial pages, ninja pages, fitness pages and
  the review pages redirect to their parent topic.
- `/blog/:slug`, archives, categories and pagination redirect to `/blog` **temporarily** until posts are migrated.
- Run `npm run check:redirects` after changing the map.

## Adding or promoting a page
1. Create `src/pages/<slug>.astro` using `CarePage`/`ActivityPage`/`Base` (indexable) or `Stub` (noindex).
2. For an indexable page, add its path to the `indexable` list in `astro.config.mjs` and to `scripts/verify-dist.mjs`.
3. Use the constants in `src/lib/site.ts` for name/address/phone so NAP stays consistent.

## Contact form
`src/components/ContactForm.astro` posts to `/api/contact` (`api/contact.js`, a Vercel Function) which emails help@bodiesinmotionidaho.com through Resend. Env vars: `RESEND_API_KEY`, `CONTACT_FROM` (verified sender), optional `CONTACT_TO`. If they're unset or delivery fails, the form offers a pre-filled mailto link instead.

Requires Node >= 22.22 (Astro 7).
