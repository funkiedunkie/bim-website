# Agent work log

Shared log for every AI agent working on this repo (Claude Code, Grok, …). Rules are in `CLAUDE.md` → "Working alongside other agents".

- **Newest entry on top.** Add yours directly above the first `## ` heading. Never edit or delete another agent's entry, and never insert by find-and-replace on another entry's text; add a correcting entry instead.
- **Read** the top entries before starting. **Add** one before ending a session, and commit it with your work.
- Deploys, env var changes and DNS changes also go in `docs/agents/DEPLOYED.md`.
- Never paste secrets here.

Template:

```markdown
## YYYY-MM-DD — <Agent> — `<branch>`

**Changed:** what you did and why, with commit hashes / PR link.
**Live vs committed:** what is deployed (preview/production) vs only committed.
**Uncommitted / unmerged:** files or branches left in flight, if any.
**Open questions:** things Duncan or the next agent must decide.
**Handoff:** what the next agent should do or watch out for.
```

---

## 2026-10-24 — Grok — `grok/proof-photos` (off `astro-rebuild`)

**Changed:** Duncan signed off on the proof-photo → browse-gallery methodology (canvas bf6a14f5). Added Design B `ProofPhotos` component (captioned, ≤3, lazy-loaded) + CSS. Applied systematically: care pages first (infant-toddler-care, preschool, after-school-care, camps), then open-play, ninja-warrior, birthday-parties, fitness-classes, team-building, pickleball, ropes-course, parents-night-out, about, jobs. Pattern: facts + primary CTA stay first; 1–3 captioned proof shots beside the claims they support; remaining real inventory photos in labeled `PhotoGallery` after a primary CTA has appeared. No new/stock/wrong-program photos; Cosmic stays on-hold text only (no Cosmic imagery). Design B + P0 conversion patterns kept.
**Evidence:** `npm run build` (42 pages), `node scripts/verify-dist.mjs` OK, `npm run check:redirects` OK. Playwright shots at 1440/390 with zero horizontal overflow at `/workspace/proof-photos-shots/` (infant, preschool, after-school, camps, open-play, ninja, birthday, fitness).
**Live vs committed:** Preview only once pushed. Not merged to `main`; production still Weebly; DNS untouched. PR targets `astro-rebuild`.
**Open questions / asset gaps:** Pickleball still thin (2 real photos). Parents Night Out only has one strong PNO-specific shot (`parents-night-glow`); browse uses adjacent evening-event photos. No SVG logo. Real Open/Limited/Waitlist status still needed from Rhea/Rachel.
**Handoff:** Do not merge PR #1 (`astro-rebuild` → `main`) without Duncan. After this PR merges to `astro-rebuild`, refresh laptop preview pack.

## 2026-10-24 — Grok — `grok/p0-conversion` (off `astro-rebuild`)

**Changed:** Duncan approved all five P0 conversion fixes. (1) Nav primary CTA is **Book a tour** → `/contact?program=Tour`; waiver demoted to secondary text link (desktop + mobile). (2) Homepage program-card "Ask about openings" chip is a real link into `/contact` with the matching ContactForm program prefilled (Infant & Toddler Care / Preschool / Before & After School Care) — not a fake Open/Limited status. (3) Care heroes (`/infant-toddler-care`, `/preschool`, `/after-school-care`) get an above-fold fact strip: Ages · Hours · From $ · License #28-11875 · Ask about openings CTA, using only already-published tuition/hours. (4) `/ninja-warrior` hero shows both free trial CTAs (ages 5–8 and 9+) plus call. (5) Homepage hero CTA hierarchy: primary Tour, secondary Find a program; waiver removed as equal third (open-play tile blurb + bigcta copy + nav secondary). Design B kept; Cosmic untouched; no invented openings labels.
**Evidence:** `npm run build` (42 pages), `node scripts/verify-dist.mjs` OK, `npm run check:redirects` OK. Playwright shots (1440/390, zero overflow) at `/workspace/p0-conversion-shots/` (home, nav, preschool, infant, ninja).
**Live vs committed:** Preview only once pushed. Not merged to `main`; production still Weebly; DNS untouched. PR targets `astro-rebuild`.
**Open questions:** Real Open/Limited/Waitlist status per program still needed from Rhea/Rachel. Nav Book a tour goes to contact (program=Tour); hero/care tour buttons still use Calendly — intentional until Duncan wants one path.
**Handoff:** Do not merge PR #1 (`astro-rebuild` → `main`) without Duncan. Prices stay shown. After this PR merges to `astro-rebuild`, refresh laptop preview pack.


## 2026-10-24 — Grok — `grok/restore-images` (off `astro-rebuild`)

**Changed:** Duncan noted many pages lost multi-image content in the redesign (hero-only). Audited Weebly crawl (`bim-site/pages.json` + inventory images) vs current pages. Added Design B `PhotoGallery` component (outlined cards, colored ink shadows) and restored additional **correct** activity photos on 14 pages from existing Weebly inventory assets copied into `src/assets/photos/`. Kept the recent correct heroes (pickleball adults, kickboxing bags, ropes, etc.). Did **not** reintroduce axe-throwing for team building (not a current workshop) or Cosmic package promo copy (Cosmic still on hold; ropes-family facility shots used without Cosmic labeling).
**Evidence:** `npm run build` (42 pages), `node scripts/verify-dist.mjs` OK, `npm run check:redirects` OK. Desktop screenshots of restored galleries at `/workspace/restore-images-shots/` (outside repo).
**Per-page image counts (hero + gallery extras → total on page):**
| Page | Before | After | Restored extras |
|---|---|---|---|
| `/open-play` | 1 | 5 | open-play-web_1/2, play area, bim11color |
| `/pickleball` | 1 | 3 | play-2, group play |
| `/fitness-classes` | 1 | 6 | rhea/anna/lisa/kristin kickboxing, rachel fitness |
| `/ninja-warrior` | 1 | 5 | salmon ladder, private class 2, Duncan, nunchuks |
| `/ropes-course` | 1 | 6 | locks, group ropes, 3 family ropes facility shots |
| `/birthday-parties` | 1 | 9 | kids/super/lock-in/ropes add-on + adult party shots |
| `/team-building` | 1 | 4 | ninja workshop, dutch-bros 2, group ropes |
| `/parents-night-out` | 1 | 4 | glow PNO + party/evening kid shots (Weebly had 1 content image) |
| `/preschool` | 1 | 7 | preschool-web + play/firefighters/pumpkin/amanda/name |
| `/infant-toddler-care` | 1 | 5 | cuddle, reese, zoey, toddler proud |
| `/after-school-care` | 1 | 4 | after-school-web, structure, slides |
| `/camps` | 1 | 5 | camps-web, splash, ninja salmon, camp cheer |
| `/about` | 1 | 6 | Richardsons, vista school, acro yoga, values1/3 |
| `/jobs` | 1 | 5 | purpose + after-school/ninja/kickboxing workplace (skipped 2021 named staff headshots) |
| Home / contact / hours / reviews / waiver / privacy / blog | unchanged | — | already multi-image or non-gallery pages |
**Live vs committed:** Preview only once pushed. Not merged to `main`; production still Weebly; DNS untouched. PR targets `astro-rebuild`.
**Open questions:** Crisp SVG logo still preferred. Pickleball inventory only has 3 photos total. PNO Weebly page was thin (1 image). No dedicated SGX-only photo.
**Handoff:** Do not merge PR #1 (`astro-rebuild` → `main`) without Duncan. Merge this into `astro-rebuild` when ready (same pattern as prior grok/* PRs).

## 2026-10-24 — Grok — `grok/logo-knockout` (off `astro-rebuild`)

**Changed:** Duncan chose `BIM Documents/logo.png` (full-color wordmark). Verified it is already a transparent RGBA PNG (byte-identical to CFK `bmi-logo.png`); corners alpha=0; black pixels are MOTION + letter outlines, not a solid badge — no destructive chroma-key (that would erase MOTION). Refreshed favicons (`favicon-32/48`, `apple-touch-icon`, `icon-512`) from that mark. Nav stays badge-free on cream; footer keeps the cream badge so black MOTION stays readable on ink. **Photo audit:** swapped mismatched program heroes to existing Weebly/repo assets — pickleball → `photos/pickleball-play.jpg` (adults); fitness → `photos/dave-kickboxing.jpg` (adult bags); ropes → `photos/ropes-course-web.jpeg`; birthday → `photos/birthday-party-web.jpeg`; ninja → `photos/ninja-warrior-private-class.jpg`; team-building → `photos/dutch-bros-team-building.jpg`; parents-night-out → `photos/open-play-web_1.jpg`. Fixed wrong alts on after-school, about, jobs, and homepage ropes tile. Copied new inventory assets into `src/assets/photos/`.
**Evidence:** `npm run build` (42 pages), `node scripts/verify-dist.mjs` OK, `npm run check:redirects` OK; Playwright nav desktop/mobile + home + fixed heroes at `/workspace/logo-knockout-shots/` (zero home overflow).
**Live vs committed:** Preview only once pushed. Not merged to `main`; production still Weebly; DNS untouched. PR targets `astro-rebuild`.
**Open questions:** Crisp SVG wordmark still preferred (raster edge aliasing at nav size). No dedicated SGX-only photo in inventory (kickboxing gym shot covers fitness page). `values2.jpg` still low-res (344×229). Remaining staff TODOs in `TODO.md` unchanged.
**Handoff:** Do not merge PR #1 (`astro-rebuild` → `main`) without Duncan. Prices stay shown.

## 2026-10-24 — Grok — `grok/detail-pass` (DEPLOYED note)

**Changed:** Recorded the detail-pass Vercel preview in `docs/agents/DEPLOYED.md` (Ready, tip `7b30c23`).
**Live vs committed:** Preview only; production still Weebly.
**Open questions:** same as the detail-pass entry above.
**Handoff:** none.


## 2026-10-24 — Grok — `grok/detail-pass` (off `astro-rebuild`)

**Changed:** Detail pass after structural sweep. **Logo:** replaced the Claude-in-Chrome opaque black-background logo (`src/assets/logo.png` / `public/logo.png`) with the real BIM wordmark from CFK (`bodies-in-motion-redesign/public/bmi-logo.png`, same mark as live Weebly `bim-logo-png_1.png`, transparent RGBA, resized to 1800x503). Removed Nav black-sticker workaround; cream footer badge kept so black "MOTION" stays readable on ink. Favicon: dropped Astro purple `favicon.svg`; added PNG favicons cropped from the real mark (`favicon-32.png`, `favicon-48.png`, `apple-touch-icon.png`) and `icon-512.png` for OG. **Photos:** swapped homepage/tile soft assets for Weebly `_orig` hi-res (`open-play-web_1`, `after-school-pals`, `ropes-course-web`); after-school page hero now uses hi-res pals photo; fixed mismatched homepage value-card alts to match actual core-values / purpose / promise images. **CSS:** page-hero object-fit cover; focus-visible uses ink; mobile nav logo sizing; hero overflow clip on small screens; reduced-motion disables tile hover scale. Commit `a38b3b7`; PR #5.
**Evidence:** `npm run build` (42 pages), `node scripts/verify-dist.mjs` OK, `npm run check:redirects` OK; Playwright home+nav shots at 1440 and 390, zero horizontal overflow (`/workspace/detail-pass-shots/`, outside repo). Static build packed to `/workspace/bim-site-preview-detail.tgz`.
**Live vs committed:** Pushed; Vercel branch **preview** only. Not merged to `main`; production still Weebly; DNS untouched. PR targets `astro-rebuild`.
**Open questions:** Duncan should send a crisp SVG (preferred) or high-res transparent PNG of the BIM wordmark — current raster still shows edge aliasing/halo at nav size. `values2.jpg` / live Weebly purpose photo is only 344x229 (no larger original found). Infant card still uses low-res `zoey-toddler-2.jpeg` (479x477; no `_orig` on Weebly). Remaining staff TODOs in `TODO.md` unchanged.
**Handoff:** Do not merge PR #1 (`astro-rebuild` → `main`) without Duncan. Prices stay shown. Cosmic unavailable; About roster hidden.


## 2026-10-24 — Grok — `grok/site-sweep` (off `astro-rebuild`)

**Changed:** Structural consistency sweep after Design B merge (PR #3). Brought remaining components onto Design B tokens without inventing facts or touching the logo: ContactForm restyled (outlined card, cream inputs, ink borders) and **Tour / Waitlist** added to the program select so it matches `api/contact.js`; Faq / PriceTable / camp cards / reviews nav / privacy draft notice / note callouts use ink+offset-shadow cards and `--o` accents instead of leftover `#d43f17`; homepage marquee wrapped in `.marquee-wrap` to stop horizontal overflow from the rotated strip; hero `.l2` uses `var(--o)`; page-hero Design B layer now sets `position:relative; overflow:hidden` for the blue blob. Deleted remote `grok/design-concepts` (design-b already gone after #3). Logo / photo polish deferred — see Open questions.
**Evidence:** `npm run build` (42 pages), `node scripts/verify-dist.mjs` OK, `npm run check:redirects` OK; Playwright full-page shots at 1440 and 390 for home, preschool, birthday-parties, contact, open-play, fitness-classes with zero horizontal overflow (`/workspace/site-sweep-shots/`, outside repo). Static build packed to `/workspace/bim-site-preview-sweep.tgz`.
**Live vs committed:** Pushed; Vercel branch **preview** only. Not merged to `main`; production still Weebly; DNS untouched. PR targets `astro-rebuild`.
**Open questions:** real openings status per program; Google rating; detail-pass items still open — replace Claude-in-Chrome logo (`src/assets/logo.png` / `public/logo.png`, black sticker workaround in Nav), photo quality pass, mobile edge cases, spacing tweaks; remaining staff TODOs in `TODO.md` (Sunday ninja hours, weekend pickleball, open-play season switch date, pickleball booking link, team-building / Family Night Out revamps, SGX trial price+link, privacy legal review, job-form evaluation).
**Handoff:** Do not merge PR #1 (`astro-rebuild` → `main`) without Duncan. Detail/logo pass is next after this PR lands on `astro-rebuild`. Prices stay shown (`SHOW_PRICES=true`) unless Duncan says otherwise.

## 2026-10-23 — Grok — `grok/design-b` (off `astro-rebuild`)

**Changed:** Duncan's team picked Concept B (energy, color, design, layout) plus concept D's "Find the right program" cards. Applied site-wide: new design tokens + "Design B layer" in `src/styles/global.css` (cream/ink/yellow/orange/blue palette, Bricolage Grotesque display + Inter, self-hosted from `public/fonts/` instead of Google Fonts; chunky outlined pill buttons with offset shadows; inner-page hero becomes big type + framed photo; outlined cards, FAQ, price tables, reviews, CTA box). Nav (cream, logo in a sticker badge, yellow waiver pill) and Footer (ink) restyled, markup unchanged. Homepage rebuilt in B's layout: B hero + stickers + quick facts (ages, hours, license #28-11875) + Book a tour; marquee; D's program cards (ages/hours/good-to-know/"from $X" behind `SHOW_PRICES`, neutral "Ask about openings" chip); B play tiles; mission + values; reviews (same verbatim testimonials); FAQ (unchanged, still in FAQPage JSON-LD); location; big CTA. Removed `/concepts` routes, `ConceptShell`, `src/lib/concepts.ts`, unused concept photos and Fraunces; used photos moved to `src/assets/photos/`. Kept concept D's `api/contact.js` Tour/Waitlist support (merged in from `grok/design-concepts`). No copy facts changed.
**Evidence:** `npm run build` (42 pages), `node scripts/verify-dist.mjs` OK, `npm run check:redirects` OK; Playwright full-page shots at 1440 and 390 for home, infant-toddler-care, preschool, ninja-warrior, zero horizontal overflow (`/workspace/design-b-shots/`, outside repo).
**Live vs committed:** Pushed; Vercel branch **preview** only. Not merged; production still Weebly; DNS untouched. Mailjet env vars are scoped to the `astro-rebuild` preview branch, so the contact form on this branch's preview falls back to mailto.
**Open questions:** show "from $X" tuition on the homepage cards (currently on, prices already published on program pages); real openings status per program; Google rating.
**Handoff:** PR targets `astro-rebuild`. `grok/design-concepts` can be deleted after this merges.

## 2026-10-23 — Grok — `grok/design-concepts`

**Changed:** Added `/concepts/d` ("Parent-first"), built section by section from the research Page "What Boise Moms Want From a Childcare Website": practical-facts hero (ages, hours, address), trust strip (Idaho STARS, license #28-11875, ratios, star-rating placeholder), program cards with an availability slot (neutral "Ask about openings" placeholder chip, no invented status) and "from $X" using the lowest prices already published on the program pages (`SHOW_PRICES` flag swaps to "Pricing shared on your tour"), one-building story, safety & staff, review band, camps linking to CFK (`LINKS.camps`), extras, FAQ (confirmed answers only; unconfirmed questions shown as "Answer pending"), 6-field single-column tour/waitlist form (no JS) posting to `/api/contact`, sticky mobile Book a tour / Call / Text bar. Added D to `/concepts` index and the ConceptShell switcher. `api/contact.js`: accepts program `Tour` and `Waitlist` and folds `tour_program`, `child_age`, `tour_time`, `start_date` into the message (other programs unchanged). One-time cleanup: moved the two 2026-10-23 entries that had been inserted inside the template code block out to the top of the log (text unchanged).
**Evidence:** `npm run build` (47 pages), `node scripts/verify-dist.mjs` OK, `npm run check:redirects` OK; Playwright screenshots at 1440 and 390 reviewed, no horizontal overflow (`/workspace/concepts-shots/d-desktop.png`, `d-mobile.png`, outside repo).
**Live vs committed:** Committed and pushed; Vercel auto-builds the branch **preview** only. Not merged; production still Weebly; DNS untouched. The tour form has not been submitted end-to-end yet.
**Open questions:** real Open/Limited/Waitlist status per program; show tuition or not; Google star rating + review count; state license lookup URL; whether (208) 381-0587 takes texts; CPR, ICCP, parent update app, illness policy, secure check-in, schools served, reply-time promise; tour time choices.
**Handoff:** Placeholders are marked `TODO(...)` in `src/pages/concepts/d.astro`. Same rule as before: don't merge this branch into `main`.

## 2026-10-23 — Grok — `grok/design-concepts` (off `astro-rebuild`)

**Changed:** Duncan said the inherited visual design feels dated. Added three standalone homepage design concepts (`b1d521c`): `/concepts` index plus `/concepts/a` (warm editorial: Fraunces serif, cream/terracotta), `/concepts/b` (bold playful: Bricolage Grotesque, bright color blocks, sticker shapes, marquee), `/concepts/c` (modern bento: Inter, app-like cards). New files only: `src/layouts/ConceptShell.astro` (own head, always `noindex,follow`, no Nav/Footer), `src/lib/concepts.ts` (content pulled from existing pages / `site.ts` / `reviews.ts`, reviews verbatim or marked excerpts), real BIM photos copied from the Weebly inventory into `src/assets/concepts/`, self-hosted OFL fonts in `public/concepts/fonts/`. CSS-only motion (scroll-driven `animation-timeline: view()` inside `@supports`, cross-document view transitions), all disabled under `prefers-reduced-motion`. No JS shipped. Existing pages untouched; concepts are not in the sitemap.
**Evidence:** `npm run build` (46 pages), `node scripts/verify-dist.mjs` OK (`concepts.html` checked as noindex stub), `npm run check:redirects` OK; Playwright full-page screenshots at 1440 and 390 reviewed, no horizontal overflow.
**Live vs committed:** Vercel **preview** only for branch `grok/design-concepts` (`bim-website-git-grok-design-concepts-camps-for-kids-idaho.vercel.app`, Ready). Not merged anywhere; production still Weebly; DNS untouched.
**Open questions:** Duncan picks a direction (or a mix); then it gets applied site-wide on `astro-rebuild` and `/concepts` is deleted before launch.
**Handoff:** Don't merge this branch into `main`. Remove `src/pages/concepts`, `src/layouts/ConceptShell.astro`, `src/lib/concepts.ts` and unused concept assets once a direction is applied.

## 2026-10-23 — Grok — `astro-rebuild`

**Changed:** Merged `main` (shared agent docs) into `astro-rebuild`; committed the `.gitignore` `.env*` rule from `vercel link` (`4a1d4d9`). Applied Duncan's 2026-10-23 staff answers (`cd4e5fe`): childcare license #28-11875 (infant & toddler page + footer); holiday closures / early closes on `/hours` and FAQ; open play summer + fall/winter hours (copy + `openingHoursSpecification`, shared constants in `src/lib/site.ts`); pickleball weekday slots "subject to availability", booking by phone/email/form; ninja Saturday open gym to 5 pm, competition date TBA; kickboxing $29 trial / $109 mo / kickboxing + SGX $139 mo, fitness challenge section removed (old URLs already 301 to `/fitness-classes`); team building per-person prices, "Book a team-building event" CTA and a "Team Building" contact-form type (also allowed in `api/contact.js`); Open Ropes slots/$16; Cosmic Ropes + Supernova removed, Cosmic Birthday Party shown "currently unavailable" with no prices; lock-in food stated; "Ropes $50+" add-on wording; Family Night Out "next date coming soon"; 2021 team roster removed from `/about`; TODO.md resolved/remaining lists updated.
**Evidence:** `npm run build` (42 pages), `node scripts/verify-dist.mjs` OK, `npm run check:redirects` OK; grep: no Sawyer in `dist/`, no roster names, no "taken care"/"Supernova" in `dist/`.
**Live vs committed:** Vercel **preview** only (`bim-website-b8s4q8pqm-camps-for-kids-idaho.vercel.app`, Ready). Production still Weebly; DNS untouched; PR #1 not merged (Duncan reviews first).
**Open questions:** Cosmic Birthday Party (Dwarf Star/Nova) treated as on hold along with Cosmic Ropes — confirm. Ninja Sunday open gym hours; pickleball weekend times (none given); open play season changeover dates; new pickleball booking link; team building and Family Night Out revamps; privacy legal review; job form evaluation (Rhea).
**Handoff:** Local builds need Node >= 22.22 (box default is 20; a Node 22 copy is at `~/node22`).

## 2026-10-21 — Grok — `grok/agent-docs`

**Changed:** Added the shared multi-agent docs to this repo, modeled on the CFK repo: `CLAUDE.md` (repo identity, business facts, agent protocol, Astro stack and commands), this `WORKLOG.md`, and `docs/agents/DEPLOYED.md`. Docs only; no site code changed.
**Live vs committed:** Nothing deployed. Committed on this branch / PR only.
**Uncommitted / unmerged:** PR #1 (`astro-rebuild`) is still open and untouched by this PR.
**Open questions:** None for this PR. Once PR #1 merges, the "Stack" section of `CLAUDE.md` should drop the "lives on astro-rebuild" note.
**Handoff:** Follow the protocol in `CLAUDE.md` from here on.

## 2026-10-21 — Grok — `astro-rebuild` (rebuild to date, logged retroactively)

**Changed:**
- Crawled and inventoried the whole Weebly site (192 pages, 213 images) outside the repo as the content source.
- Rebuilt the site in Astro 7 (static) on `astro-rebuild`, PR #1 (latest commit `3726f78`): all core pages (care, camps, parties, open play, ninja, fitness, ropes, pickleball, team building, about, hours, reviews, contact, jobs, waiver, privacy), JSON-LD, canonicals, sitemap, robots.txt. Dependency upgrade to Astro 7 took `npm audit` from 9 vulnerabilities to 0.
- Migrated 21 blog posts; the other 65 old posts 301-redirect per `scripts/blog-map.json` (Duncan approved the keep list). `vercel.json` redirects every old Weebly URL; check scripts verify redirects and fail on Sawyer links.
- Contact form `/api/contact` via Mailjet (Duncan chose Mailjet over Resend; Mailjet is already in the domain's SPF, so no DNS change). Created a dedicated Mailjet subkey "Bodies in Motion Main Site" so the CFK app's key is untouched. Set Preview env vars `MAILJET_API_KEY`, `MAILJET_SECRET_KEY`, `CONTACT_FROM`, `CONTACT_TO` for branch `astro-rebuild` (names only here). Sender help@bodiesinmotionidaho.com validated in Mailjet by DNS check. A test send through Mailjet to help@ was received on 2026-10-21 (sent via the Mailjet API directly, not by submitting the preview form).
**Live vs committed:** Only the Vercel **preview** of `astro-rebuild` is live (see `DEPLOYED.md`). Production is still Weebly; GoDaddy DNS untouched; nothing merged.
**Uncommitted / unmerged:** PR #1 open, awaiting Duncan's review.
**Open questions:**
- Childcare license number (Duncan is finding it).
- Staff question list in `TODO.md` on `astro-rebuild` (holidays, open play/pickleball/ninja hours, ninja/fitness/team-building/ropes prices, Family Night Out, Lock-in food, ropes add-on booking, About team roster, job application form).
- Privacy policy legal review.
- Duncan's review of the preview ("not done" yet), then merge and DNS cutover, only with his OK.
**Handoff:** Don't merge PR #1 or touch DNS. A real form submission from the preview has not been tested yet.
