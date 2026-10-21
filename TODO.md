# TODO(Duncan)

Everything here is a fact, link or decision that is **not** in the crawl of the live Weebly site
(`/workspace/bim-site/inventory`), so it was left out or flagged rather than invented. Each item is also
marked in the source with a `TODO(Duncan)` comment.

Find them all: `grep -rn "TODO(Duncan)" src`

## Licensing, hours and structured data
- [ ] **Childcare license number** — the infant & toddler page says "Licensed" but gives no number. (`src/pages/infant-toddler-care.astro`)
- [ ] **Holiday closures** — the old Hours page lists only 2025 closures (Thanksgiving, Christmas); none are shown. Add current ones. (`src/pages/hours.astro`)
- [ ] **Seasonal hours** — Open Play shows "summer hours" on the old Open Play page but fall/winter hours on the old Hours page (used). Pickleball hours also differ between those pages (Hours page used). Confirm. (`src/pages/open-play.astro`, `hours.astro`, `pickleball.astro`)
- [ ] **Pre-camp end time** — the old Hours page says pre-camp is "7:30 am - 9 pm" (probably 9 am); the camps page does not state the end time. (`src/pages/camps.astro`, `hours.astro`)

## Conflicting prices on the old site
- [ ] **Kickboxing trial price** — $19.99 on `/kickboxing` vs $29 on `/kickboxing-trial`. No price is shown. (`src/pages/fitness-classes.astro`)
- [ ] Re-check prices/dates copied into stubs (ninja tuition, team building, Parents' Night Out Oct 24 event, pickleball). (`src/pages/*.astro`)

## Links and forms
- [ ] **Contact form delivery** — `/api/contact` (Vercel Function, `api/contact.js`) sends to help@bodiesinmotionidaho.com via Resend's free tier. Set `RESEND_API_KEY` and `CONTACT_FROM` (a sender on a domain verified in Resend, e.g. `website@bodiesinmotionidaho.com`; needs DNS records at GoDaddy/Cloudflare) in Vercel; optional `CONTACT_TO`. Until set, the form shows a mailto fallback. Infant/toddler info-request and job application forms can reuse this endpoint later.
- [ ] **Team building booking email** — the old Hours page had a separate (obfuscated) booking email; confirm whether it's help@ or another address. (`src/pages/team-building.astro`)
- [ ] **Sawyer birthday links** — three unlabeled ages 10–16 links; confirm which is Super / Cosmic / Lock-in. (`src/pages/birthday-parties.astro`)

## Content still to migrate
- [ ] Camps details (ages, dates, pricing, descriptions) — not in the old Camps page (only "Summer Camps" / "Holiday Camps" links). (`camps.astro`)
- [ ] **Party prices and packages** copied from the old party pages; confirm they are current. (`birthday-parties.astro`)
- [ ] **Cosmic birthday party** is "PROGRAM CURRENTLY ON HOLD" on the old page; its prices were left off. Confirm status. (`birthday-parties.astro`)
- [ ] **Lock-in food** — old text says "With the Super Party, all of your food is taken care" inside the Lock-in section (dinner, snacks, continental breakfast); probably a typo, so food is not stated. (`birthday-parties.astro`)
- [ ] **Kids party naming / ropes add-on** — old page lists only "Play Zone Party" plus a Ropes Course (+$50, ages 10+, two free adults) while "themed" parties are ages 0–11; confirm package names and how the add-on is booked. (`birthday-parties.astro`)
- [ ] **Parents' Night Out date/year** — source says only "Oct 24th, 5:00–9:00 PM" (year inferred as 2026 for the Event schema). The build drops the Event schema after Oct 24 2026 21:00 MDT, but the static HTML needs a rebuild/update. Family Night Out date is "TBA". (`parents-night-out.astro`)
- [ ] **Review permission** — verbatim reviews (first name + last initial) added to birthday, Parents' Night Out and open play pages; confirm permission to publish. (`src/components/Reviews.astro`)
- [ ] **Open play** — monthly specials calendar (October-specific) not migrated; confirm how "open play free when you exercise" works. (`open-play.astro`)
- [ ] Reviews: each `*-reviews.html` page (reviewer, source, text) and permission to publish. (`reviews.astro`)
- [ ] **Home page testimonials** (Katy F., Julie G., Valorie L.) are copied verbatim from the live home page; confirm permission. (`src/pages/index.astro`)
- [ ] **Blog** — ~100 posts. Until migrated, `/blog/:slug` and archive/category/pagination URLs 301 to `/blog` in `vercel.json`. Replace with per-post pages plus per-post redirects, and change this rule. (`blog.astro`, `scripts/generate-vercel-json.mjs`)
- [ ] **Privacy policy** — the old text contains sections about a "GPT application / Recipe Builder / OpenAI" that do not seem to relate to this business. Get the policy reviewed; only a summary of the website-relevant parts is shown. (`privacy.astro`)
- [ ] Decide when each remaining stub gets promoted to a full indexable page (use `ActivityPage`/`Base` instead of `Stub`, add the URL to the sitemap filter in `astro.config.mjs` and `scripts/verify-dist.mjs`).

## Intentionally omitted (not sourced, or conflicts with the brief)
- "Second location very soon" from the old About page (Boise is the only location).
- Any Meridian or Garden City location/address; they appear only as `areaServed` and "families from Boise, Meridian and Garden City".
- Old Weebly seasonal items (Trunk or Treat RSVP banner, holiday challenge, etc.).

## Resolved (2026-10-21)
- `/camps`, `/birthday-parties`, `/parents-night-out`, `/open-play` promoted to full indexable pages (sitemap, FAQ + JSON-LD).
- Before/after school hours (7:30 am until school; school pickup until 6 pm) added to copy, FAQ and schema (`Mo-Fr 07:30-18:00` with description).
- `/30min` confirmed as the after-school tour link.
- Open play prices: $8.25 / $10.50 / $12.50.
- Contact email help@bodiesinmotionidaho.com on Contact, footer and Privacy; contact form added.
- Social links confirmed.
