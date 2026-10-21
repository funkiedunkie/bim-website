# TODO(Duncan)

Everything here is a fact, link or decision that is **not** in the crawl of the live Weebly site
(`/workspace/bim-site/inventory`) or the Camps for Kids export, so it was left out or flagged rather than invented. Each item is also
marked in the source with a `TODO(Duncan)` comment.

Find them all: `grep -rn "TODO(Duncan)" src`

## Recurring
- [ ] **Refresh camp dates/prices each season** (source: Camps for Kids app). Update `upcomingCamps` and the "2026 rate" notes in `src/pages/camps.astro`. Past dates are dropped at build time, but the build must be re-run (and the list edited) to add new ones.
- [ ] **Rebuild after Oct 24, 2026 21:00 MDT** — the Cosmic Glow Event schema drops automatically, but the static HTML must be rebuilt. Family Night Out date is still "TBA". (`src/pages/parents-night-out.astro`, `camps.astro`)

## Licensing, hours and structured data
- [ ] **Childcare license number** — the infant & toddler page says "Licensed" but gives no number. (`src/pages/infant-toddler-care.astro`)
- [ ] **Holiday closures** — the old Hours page lists only 2025 closures (Thanksgiving, Christmas); none are shown. Add current ones. (`src/pages/hours.astro`)
- [ ] **Seasonal hours** — Open Play shows "summer hours" on the old Open Play page but fall/winter hours on the old Hours page (used). Confirm. (`src/pages/open-play.astro`, `hours.astro`)
- [ ] **Pickleball hours** — Hours page (used) and old Pickleball page list different slots. Confirm. (`src/pages/pickleball.astro`)
- [ ] **Ninja open gym Sunday end time** — 5:00 pm on `/ninja-warrior` (used) vs 3:00 pm on `/ninja-warrior-competition`. (`src/pages/ninja-warrior.astro`)

## Prices and offers to confirm
- [ ] **Kickboxing trial price** — $19.99 on `/kickboxing` vs $29 on `/kickboxing-trial`. No price is shown. (`src/pages/fitness-classes.astro`)
- [ ] **SGX trial and membership** — old bootcamp page: 3-class trial $29, "classes start at $109/mo", external sign-up link not used. Confirm and add a link. (`fitness-classes.astro`)
- [ ] **Next fitness challenge** — the 10-week "Happy New Rear Challenge" is shown as a seasonal/past program with no date or price. (`fitness-classes.astro`)
- [ ] **Team building prices** — confirm; the source says "$57 to $73 (tax included) depending on group size" without saying per person. (`src/pages/team-building.astro`)
- [ ] **Team building booking email** — the old Hours page had a separate (obfuscated) booking email; help@ and the phone are shown. Confirm whether it's help@ or another address. (`team-building.astro`)
- [ ] **Ninja tuition/schedule** — confirm the class schedule and tuition; Friday/Saturday classes were "Coming Soon". (`ninja-warrior.astro`)
- [ ] **Next ninja competition** — only a past Winter 2025 qualifier is in the source; add the next date. (`ninja-warrior.astro`)
- [ ] **Ropes course** — confirm Open Ropes slots/price ($16 + tax), whether the public Cosmic Ropes Adventure night is running (old page: "on hold"), and whether a Supernova party (up to 20 kids, $299 on the old ropes page) exists; the old ropes page prices for Nova/Dwarf Star ($259/$199) conflict with the confirmed $323/$251. (`src/pages/ropes-course.astro`)
- [ ] **Family Night Out prices** ($49 / $39.20) — confirm. (`parents-night-out.astro`)
- [ ] **Lock-in food** — old text says "With the Super Party, all of your food is taken care" inside the Lock-in section (dinner, snacks, continental breakfast); probably a typo, so food is not stated. (`src/pages/birthday-parties.astro`)
- [ ] **Kids party naming / ropes add-on** — old page lists only "Play Zone Party" plus a Ropes Course (+$50, ages 10+, two free adults) while "themed" parties are ages 0–11; confirm package names and how the add-on is booked. (`birthday-parties.astro`)
- [ ] **Open play** — monthly specials calendar (October-specific) not migrated; confirm how "open play free when you exercise" works. (`open-play.astro`)

## Links and forms
- [ ] **Contact form delivery** — `/api/contact` (Vercel Function, `api/contact.js`) sends to help@bodiesinmotionidaho.com via Resend's free tier. Set `RESEND_API_KEY` and `CONTACT_FROM` (a sender on a domain verified in Resend; needs DNS records) in Vercel; optional `CONTACT_TO`. Until set, the form shows a mailto fallback. Infant/toddler info-request and job application forms can reuse this endpoint later.
- [ ] **Motioneer job application form** — not migrated (it posted to Weebly); applicants are asked to call. (`src/pages/jobs.astro`)

## Content still to migrate
- [ ] **About team roster** — copied from the old Our Team page (photos ~2020); Dyani Russell and Brian Jankowski had no role listed. Confirm the roster is current. (`src/pages/about.astro`)
- [ ] **Reviews page** — migrate each `*-reviews.html` page into `/reviews` (publication is approved). (`reviews.astro`)
- [ ] **Blog** — ~100 posts. Until migrated, `/blog/:slug` and archive/category/pagination URLs 301 to `/blog` in `vercel.json`. Replace with per-post pages plus per-post redirects, and change this rule. (`blog.astro`, `scripts/generate-vercel-json.mjs`)
- [ ] **Privacy policy** — the old text contains sections about a "GPT application / Recipe Builder / OpenAI" that do not seem to relate to this business. Get the policy reviewed; only a summary of the website-relevant parts is shown. (`privacy.astro`)
- [ ] Remaining noindex stubs to promote (use `ActivityPage`/`Base`, add to the sitemap filter in `astro.config.mjs` and `scripts/verify-dist.mjs`): `/hours`, `/reviews`, `/blog`, `/jobs`, `/contact`, `/waiver`, `/privacy`.

## Intentionally omitted (not sourced, or conflicts with the brief)
- "Second location very soon" from the old About page (Boise is the only location).
- Any Meridian or Garden City location/address; they appear only as `areaServed` and "families from Boise, Meridian and Garden City".
- Old Weebly seasonal items (Trunk or Treat RSVP banner, etc.); member codes; camp dates that have already passed.
- Axe-throwing team building (appears only in old reviews, not as a current workshop).
- Open play kids' prices from the old pickleball page ($6 / $9.60 / $12); `/open-play` has the confirmed prices.

## Resolved (2026-10-21)
- `/camps`, `/birthday-parties`, `/parents-night-out`, `/open-play` promoted to full indexable pages (sitemap, FAQ + JSON-LD).
- `/ninja-warrior`, `/fitness-classes`, `/ropes-course`, `/pickleball`, `/team-building`, `/about` promoted to full indexable pages (sitemap, verify-dist, FAQ + JSON-LD; `/about` also has AboutPage + Organization schema).
- Camps: ages, hours, extended care prices, sibling discount, staff certifications, upcoming camp days (Event schema) and typical 2026 pricing added from the Camps for Kids export.
- Party prices/packages confirmed current; Cosmic birthday party is back (Nova $323, Dwarf Star $251) and "on hold" removed.
- Sawyer is no longer used: all `hisawyer.com` links and `LINKS.sawyer*` constants removed; party, pickleball and ropes booking is by Calendly (kids parties), phone, email or `/contact`. Sawyer link-mapping TODO dropped.
- Parents' Night Out: Cosmic Glow Party Oct 24, 2026 (year confirmed), $51 per child, ages 5–12, 20% sibling discount.
- Camps info TODO cleared; pre-camp ends 9:00 am (7:30–9:00 am per the Camps for Kids listing; the "9 pm" on the old Hours page was a typo).
- Review and home-page testimonial publication approved (permission TODOs removed).
- Before/after school hours (7:30 am until school; school pickup until 6 pm) added to copy, FAQ and schema.
- `/30min` confirmed as the after-school tour link.
- Open play prices: $8.25 / $10.50 / $12.50.
- Contact email help@bodiesinmotionidaho.com on Contact, footer and Privacy; contact form added.
- Social links confirmed.
