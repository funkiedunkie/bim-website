# TODO(Duncan)

Everything here is a fact, link or decision that is **not** in the crawl of the live Weebly site
(`/workspace/bim-site/inventory`), so it was left out or flagged rather than invented. Each item is also
marked in the source with a `TODO(Duncan)` comment.

Find them all: `grep -rn "TODO(Duncan)" src`

## Licensing, hours and structured data
- [ ] **Childcare license number** — the infant & toddler page says "Licensed" but gives no number. (`src/pages/infant-toddler-care.astro`)
- [ ] **Before/after school hours** — the Weebly page states none, so the after-school page has no `openingHours` in its JSON-LD. (`src/pages/after-school-care.astro`)
- [ ] **After-school tour link** — the Weebly page embeds a Calendly widget without exposing its URL; `https://calendly.com/bodiesinmotion1/30min` is used as instructed. Confirm it is the right event. (`src/pages/after-school-care.astro`)
- [ ] **Holiday closures** — the old Hours page lists only 2025 closures (Thanksgiving, Christmas); none are shown. Add current ones. (`src/pages/hours.astro`)
- [ ] **Seasonal hours** — Open Play shows "summer hours" on the old Open Play page but fall/winter hours on the old Hours page (used). Pickleball hours also differ between those pages (Hours page used). Confirm. (`src/pages/open-play.astro`, `hours.astro`, `pickleball.astro`)
- [ ] **Pre-camp end time** — the old Hours page says pre-camp is "7:30 am - 9 pm" (probably 9 am). (`src/pages/camps.astro`, `hours.astro`)

## Conflicting prices on the old site
- [ ] **Open Play prices** — old Open Play page: $8.25 / $10.50 / $12.50. Old Pickleball page: $6 / $9.60 / $12 (+tax). The Open Play page values are shown. (`src/pages/open-play.astro`)
- [ ] **Kickboxing trial price** — $19.99 on `/kickboxing` vs $29 on `/kickboxing-trial`. No price is shown. (`src/pages/fitness-classes.astro`)
- [ ] Re-check prices/dates copied into stubs (ninja tuition, team building, Parents' Night Out Oct 24 event, pickleball). (`src/pages/*.astro`)

## Links and forms
- [ ] **Sawyer birthday links** — three unlabeled ages 10–16 links; confirm which is Super / Cosmic / Lock-in. (`src/pages/birthday-parties.astro`)
- [ ] **Social URLs** — Facebook, Instagram, X/Twitter and YouTube links come from the footer of the Weebly site. There is no TikTok link anywhere in the crawl. Confirm these are the accounts you want promoted. (`src/lib/site.ts`)
- [ ] **Contact email** — emails were obfuscated in the crawl (`[email protected]`). Add one to Contact, Privacy and Team Building. (`src/pages/contact.astro`)
- [ ] **Forms** — the Weebly contact / information-request / Motioneer application / "Ask a Question" forms posted to Weebly and are not migrated. Decide on a replacement (e.g. Formspree, Vercel function, or Calendly/phone only). (`src/pages/contact.astro`, `jobs.astro`)

## Content still to migrate (stubs are `noindex`)
- [ ] Camps details (ages, pricing, descriptions). (`camps.astro`)
- [ ] Birthday party packages, pricing and policies. (`birthday-parties.astro`)
- [ ] Reviews: each `*-reviews.html` page (reviewer, source, text) and permission to publish. (`reviews.astro`)
- [ ] **Home page testimonials** (Katy F., Julie G., Valorie L.) are copied verbatim from the live home page; confirm permission. (`src/pages/index.astro`)
- [ ] **Blog** — ~100 posts. Until migrated, `/blog/:slug` and archive/category/pagination URLs 301 to `/blog` in `vercel.json`. Replace with per-post pages plus per-post redirects, and change this rule. (`blog.astro`, `scripts/generate-vercel-json.mjs`)
- [ ] **Privacy policy** — the old text contains sections about a "GPT application / Recipe Builder / OpenAI" that do not seem to relate to this business. Get the policy reviewed; only a summary of the website-relevant parts is shown. (`privacy.astro`)
- [ ] Decide when each stub gets promoted to a full indexable page (remove `noindex` by using `Base` instead of `Stub`, and add the URL to the sitemap filter in `astro.config.mjs`).

## Intentionally omitted (not sourced, or conflicts with the brief)
- "Second location very soon" from the old About page (Boise is the only location).
- Any Meridian or Garden City location/address; they appear only as `areaServed` and "families from Boise, Meridian and Garden City".
- Old Weebly seasonal items (Trunk or Treat RSVP banner, holiday challenge, etc.).
