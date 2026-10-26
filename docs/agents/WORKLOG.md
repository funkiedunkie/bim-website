# Agent work log

Shared log for every AI agent working on this repo (Claude Code, Grok, …). Rules are in `CLAUDE.md` → "Working alongside other agents".

- **Newest entry on top.** Add yours directly above the first `## ` heading. Never edit or delete another agent's entry, and never insert by find-and-replace on another entry's text; add a correcting entry instead.
- **Read** the top entries before starting. **Add** one before ending a session, and commit it with your work.
- Deploys, env var changes and DNS changes also go in `docs/agents/DEPLOYED.md`.
- Never paste secrets here.

## 2026-10-26 — Grok — `grok/weebly-crawl-inputs` (off `astro-rebuild`) — issue #38

**Changed:** Committed Weebly crawl inputs under `scripts/weebly-crawl/` so any agent can run redirect checks without local-only `/workspace/...` files: `urls.txt`, trimmed `pages.json` (`url` fields only; 192 public Weebly URLs), `inventory/index.md`. Defaults in `scripts/check-redirects.mjs` and `scripts/generate-vercel-json.mjs` now resolve those paths from repo `root` (CLI args still override). Updated `README.md`, `CLAUDE.md`, and `TODO.md` path mentions. No page/layout/redirect map changes.
**Conversion:** Unblocks Claude Code / any clone from verifying the Weebly → Vercel 301 guard before DNS cutover.
**Evidence:** `npm run build` (42 pages) + `npm run check:redirects` OK (exit 0; 158 URLs / 72 .html / 160 redirects). `node scripts/generate-vercel-json.mjs` left `vercel.json` byte-identical (`git diff --exit-code vercel.json`). Secret scan on committed crawl set: clean.
**Live vs committed:** Preview only once merged to `astro-rebuild`. Not `main`; Weebly still prod; DNS untouched.
**Open questions:** None.
**Handoff:** Closes #38. Tip of `origin/astro-rebuild` after merge will be noted on the issue comment. Do not merge PR #1 without Duncan.

## 2026-10-26 — Claude Code — `claude/portrait-proof-layout` (off `astro-rebuild` 9236383)

**Changed:** Duncan approved the contract: "On desktop, when a section pairs text with a tall (portrait) photo, the text takes about two-thirds of the width and the photo one-third, so the whole photo shows with no faces cut off; phones stay stacked as now." Root cause: PR #24 made portrait proofs `width:100%` + `max-height:420px` inside a half-width column, so the cap overrode `aspect-ratio: 3/4` and produced a ~1.5:1 cover box (Rhea's face cut at the eyes on `/fitness-classes`; acro yoga flyer chopped on `/about`, defeating #30). Fix in `global.css`, desktop only (>900px): `.care-claim:has(.proof-photos__img--portrait)` → `2fr 1fr`, and the portrait cap is lifted in that context. Any future portrait proof gets this automatically via the existing `imgClass`; no markup changes.
**Evidence:** Build 42 pages; `verify-dist` OK. Measured portrait proof box before → after: 1440px 630×420 (1.50) → 418×557 (0.75); 1024px 442×420 (1.05) → 293×390 (0.75); 390px 336×420 → 336×420 (unchanged). Landscape claim sections unchanged (`636px 636px` on about founders/story, open-play, preschool, ninja). No horizontal overflow. `check:redirects` not run: its Weebly crawl inputs (`/workspace/urls.txt`, `/workspace/bim-site/pages.json`) exist only on Grok's machine, so it fails (exit 1) anywhere else.
**Live vs committed:** Branch pushed for the Vercel preview only. Not merged to `astro-rebuild`; not `main`; Weebly still prod; DNS untouched.
**Open questions:** Duncan to OK merging into `astro-rebuild` after checking the preview. Duncan confirmed 2026-10-26 that AI edits to the 10+ year-old archive photos are fine, and that the pre-#27 Open Play close-up (girl with long hair) was AI-generated, so #27/#35 swapping it out was correct.
**Handoff:** `origin/astro-rebuild` tip 9236383. Do not merge PR #1 without Duncan.


## 2026-10-26 — Grok — `grok/open-play-slide-zoom` (off `astro-rebuild`)

**Changed:** Duncan approved Open Play slide zooms. Replaced assets with approved candidates (same basenames): `open-play-mom-toddler.jpg` ← mom crop-v4 (tighter geometric zoom; Open Play proof only); `open-play.jpg` + `photos/open-play-web_1.jpg` ← three-kids smiles-v4 (zoom + bigger smiles on kids behind the hat). Those two paths stay **byte-identical** (shared: Open Play hero, Hours hero, Home slide tile, Parents' Night Out hero, After School proof). No layout/CSS/markup changes.
**Conversion:** Subjects fill the frame so parents see kids/faces instead of empty playstructure; rear-kid smiles match the energy of the front hat kid.
**Evidence:** Candidate hashes match live copies; `cmp` open-play.jpg == open-play-web_1.jpg.
**Live vs committed:** Preview only once merged to `astro-rebuild`. Not `main`; Weebly still prod; DNS untouched.
**Open questions:** None for this swap.
**Handoff:** Do not merge PR #1 without Duncan. Refresh laptop preview after merge to `astro-rebuild`.

## 2026-10-26 — Grok — `astro-rebuild` (merged PRs #27–#33)

**Changed:** Catch-up of photo passes merged into `astro-rebuild`:
- #27 Open Play photo pass
- #28 Team Building denoise
- #29 Birthday Parties denoise (Polaroid bubbles)
- #30 About aerial yoga portrait crop (`proof-photos__img--portrait`)
- #31 About denoise (classical values2/vista/family + AI aerial yoga); `values2` is shared site-wide (About/Jobs/home)
- #32 Jobs denoise: purpose + after-school + ninja (Dave skipped)
- #33 Jobs: Motioneer proof unified onto denoised `values2`
Also updated CLAUDE.md sync rules (astro-rebuild is canonical; mandatory fetch/pull before work).
**Live vs committed:** Preview only. Not `main`; Weebly still prod; DNS untouched.
**Open questions:** Ropes denoise candidates awaiting Duncan. Backlog: photo-jobs (more Jobs pics), jobs-motioneer-link, photo-openplay/pno/teambuild. PR #1 blocked on Duncan.
**Handoff:** `origin/astro-rebuild` tip 48cfd29 (before this docs PR). Claude Code must `git fetch && git checkout astro-rebuild && git pull` before any review.

## 2026-10-25 — Grok — `grok/open-play-waiver-direct` (off `astro-rebuild`)

**Changed:** Duncan: Open Play “Sign a waiver” should go straight to the GymMaster waiver portal, not the interstitial `/waiver` page. `open-play.astro` now imports `LINKS` and sets `ctaUrl={LINKS.waiverPortal}` + `ctaExternal={true}` (label/text unchanged). `/waiver` page, footer, and other pages’ waiver CTAs untouched.
**Conversion:** Parents on Open Play who are ready to walk in hit the real waiver form immediately instead of bouncing through an interstitial — fewer drop-offs before arrival.
**Evidence:** Build (Node 22) + verify dist `/open-play` CTA href is GymMaster enquiry URL (not `/waiver`).
**Live vs committed:** Preview only once pushed/merged to `astro-rebuild`. Not `main`; Weebly still prod; DNS untouched.
**Open questions:** None.
**Handoff:** Do not merge PR #1 without Duncan. Refresh laptop preview after this merges to `astro-rebuild`.

## 2026-10-25 — Grok — `grok/fitness-ai-photos` (off `astro-rebuild`)

**Changed:** Duncan approved AI denoise + décor cleanup candidates 2026-10-25 (“All are great, including Rachel!”). Replaced six fitness JPEGs in `src/assets/photos/` with approved AI candidates (same basenames so Astro imports keep working): `rhea-kickboxing.jpg`, `rachel-fitness.jpg`, `anna-kickboxing.jpg`, `lisa-kickboxing.jpg`, `kristin-kickboxing.jpg`, `dave-kickboxing.jpg` (dave = v2 hero). Grain/denoise + wall belts/flags cleanup; framing CSS already landed in PR #24 (`6dec029`). No page/markup changes.
**Conversion:** Sharper, cleaner gym photos on `/fitness-classes` — less dojo clutter, less compression grain — so proof shots support the kickboxing/SGX pitch instead of undercutting it.
**Evidence:** Build (Node 22) + `verify-dist` + `check:redirects` (see commit). Files are JPEG (`FF D8`); sizes ~187–219KB (was ~8–96KB for the tiny thumbs).
**Live vs committed:** Preview only once pushed. Merge into `astro-rebuild` per Duncan own-it; not `main`; Weebly still prod; DNS untouched.
**Open questions:** None — Duncan approved all six including Rachel.
**Handoff:** Do not merge PR #1 without Duncan. Refresh laptop preview after this merges to `astro-rebuild`.


Template:

```markdown
## 2026-10-25 — Grok — `grok/fitness-framing` (off `astro-rebuild`)

**Changed:** Duncan: fitness proof photos looked awkward with white bars beside portrait shots. Root cause: `.proof-photos__img--portrait` used `width: auto; margin-inline: auto` inside a white `.proof-photos__figure`, letterboxing gutters. Fix: portrait proofs now `width: 100%` + `aspect-ratio: 3/4` + `object-fit: cover` (drop auto-centering) with `max-height: 420px` so they fill the card edge-to-edge without becoming a second hero. Verified fitness JPEGs (rhea-kickboxing, rachel-fitness, anna/lisa/kristin/dave) — **no baked-in white borders in pixel data**; the “white border” was CSS letterboxing only, so no asset crops in this PR. AI cleanup (grain/belts/flags) is a separate pass — not in this PR. fitness-classes.astro still uses portrait class on Rhea + Rachel proofs; gallery landscape shots already fill via default proof/gallery rules.
**Conversion:** Full-bleed proof cards look intentional; letterboxed portraits looked like broken crops and undercut trust in the kickboxing/SGX pitch.
**Evidence:** Pixel edge samples on all fitness assets (corners/mid-edges dark gym tones, not white). CSS-only framing fix. Build + verify-dist + check:redirects (Node 22).
**Live vs committed:** Preview only once pushed. Not merged to `main`; production still Weebly; DNS untouched. PR targets `astro-rebuild`.
**Open questions:** AI cleanup of grain + belts/flags still pending Duncan review as a separate pass.
**Handoff:** Do not merge PR #1 without Duncan. Refresh laptop preview after this merges to `astro-rebuild`.

## 2026-10-25 — Grok — `grok/gallery-cols-spacing` (off `astro-rebuild`)

**Changed:** Duncan approved auto-sizing PhotoGallery columns to photo count + fix jammed fragment spacing on camps. (1) `PhotoGallery.astro` adds `photo-gallery--N` from `items.length` (clamped 1–4) and matching `sizes`. (2) `global.css`: `--1`/`--2`/`--3`/`--4` set column count; breakpoints only shrink (4→3@1100, 3|4→2@900, all→1@560) so pages with 1–3 browse shots never show empty grid cells. Design B look unchanged. (3) Camps PNO note: `{' '}` after “current list.” so Astro no longer emits `list.Looking`. Site-wide fragment audit found only that camps jam (prior PR #22 already fixed `<a>` spacing).
**Conversion:** Empty gallery cells read as broken; columns matching the photo count look intentional and build trust.
**Evidence:** Build 42 pages (Node 22); `verify-dist` OK; `check:redirects` OK. Dist: camps `photo-gallery--2` + `list. Looking`; pickleball `--1`; preschool `--3`; ninja `--2`.
**Live vs committed:** Preview only once pushed. Not merged to `main`; production still Weebly; DNS untouched. PR targets `astro-rebuild`.
**Open questions:** None.
**Handoff:** Do not merge PR #1 without Duncan. Refresh laptop preview after this merges to `astro-rebuild`.

## 2026-10-25 — Grok — `grok/fix-photo-crops` (off `astro-rebuild`)

**Changed:** Duncan: after photo-scale (PR #12), teachers' heads / foreheads were cut off. Root cause: fixed-height boxes + `object-fit: cover` + `object-position: center` centering on mid-frame (people live in the upper third). Fix kept modest scale but stopped face chops: (1) `.page-hero__img` → `object-position: center top` (kept clamp heights). (2) `.proof-photos__img` → real `aspect-ratio: 4 / 3` (dropped fixed heights / max-height fights that still made ~1.85:1 short boxes) + `object-position: center top`. (3) `.photo-gallery__img` → `aspect-ratio: 4 / 3` + `center top`. (4) Home cover images (`.p1`/`.p2`/`.prog img`/`.tile img`/`.value img`) also `center top`. (5) Opt-in utilities `.object-pos-top|center|bottom|left|right` for rare per-image overrides — none needed after spot-check (preschool-name source itself is tight on headroom; face now fully visible vs before cutting at the nose). No new photos.
**Evidence:** Before preschool proof: crop at nose/cheek (mouth+torso only). After: full face + forehead visible; infant hero heads have headroom; about family heads in frame; fitness trainer head in frame. Metrics @1440: proof 554×416 (4/3), gallery 314×235, hero 584×455, `object-position: 50% 0%`. Build 42 pages; `verify-dist` OK; `check:redirects` OK. Shots: `/workspace/fix-photo-crops-shots/before|after/`.
**Live vs committed:** Preview only once pushed. Not merged to `main`; production still Weebly; DNS untouched. PR targets `astro-rebuild` (merge into rebuild per Duncan own-it; not PR #1).
**Open questions:** None for crops. Real openings status still needed from Rhea/Rachel.
**Handoff:** Do not merge PR #1 without Duncan. Refresh laptop preview after this merges to `astro-rebuild`.

## 2026-10-25 — Grok — `grok/desktop-width` (off `astro-rebuild`)

**Changed:** Duncan: desktop pages looked mobile-skinny then suddenly wide. Root cause: program/care/activity content (and FAQ) used `section__inner--read` (820px) while galleries, CTAs, and location used `section__inner` (1320px). Widened program pages + care/activity FAQ + home FAQ to `--max-w`. Left `--read-w` only for long prose (blog posts, privacy, waiver, contact, Stub). Body `p` / `.callout` keep a 65ch readable measure inside full-width prose sections; headings, lists, proof photos, and price tables use the full column. Single proof strip max raised to 960px. ProofPhotos `sizes` bumped for desktop.
**Evidence:** Before @1440 infant content inners measured 820 vs gallery 1320. After: all inners/gallery/CTA 1320; `p` ~671; single proof list 960. Mobile @390 inner ~342, no horizontal overflow (infant + preschool). Build 42 pages; `verify-dist` OK; `check:redirects` OK. Shots: `/workspace/desktop-width-shots/before|after/`.
**Live vs committed:** Preview only once pushed. Not merged to `main`; production still Weebly; DNS untouched. PR targets `astro-rebuild`.
**Open questions:** None. Autoscroll fix already on `astro-rebuild` via PR #10 (`cb72f93`).
**Handoff:** Do not merge PR #1 without Duncan. Refresh laptop preview after merge.

## 2026-10-25 — Grok — `grok/fix-autoscroll` (off `astro-rebuild`)

**Changed:** Duncan reported weird auto-scrolling on the preview. Root cause: Design B scroll-driven `.reveal` rules using `animation-timeline: view()` (homepage program cards, values, review bubbles) plus `html { scroll-behavior: smooth }`, a known Chromium jank / "page pulls itself" combo. Removed the entire `.reveal` / `view()` / `@keyframes pop` block. Set `scroll-behavior: auto` by default. Left `prefers-reduced-motion: reduce` rules intact (still force `auto` + kill animations). Homepage `.reveal` class names left in markup (harmless without CSS). Grep found no `scrollIntoView` / scroll-hijack JS; horizontal marquee in `home.css` is unrelated and already gated by reduced-motion.
**Evidence:** `npm run build` (42 pages), `node scripts/verify-dist.mjs` OK, `npm run check:redirects` OK. Dist CSS has no `animation-timeline` / `scroll-behavior: smooth`.
**Live vs committed:** Preview only once pushed. Not merged to `main`; production still Weebly; DNS untouched. PR targets `astro-rebuild`.
**Open questions:** None for this fix. Confirm with Duncan that home scroll feels normal again (especially Chromium).
**Handoff:** Do not merge PR #1 (`astro-rebuild` → `main`) without Duncan. After this PR merges to `astro-rebuild`, refresh laptop preview pack.

## YYYY-MM-DD — <Agent> — `<branch>`

**Changed:** what you did and why, with commit hashes / PR link.
**Live vs committed:** what is deployed (preview/production) vs only committed.
**Uncommitted / unmerged:** files or branches left in flight, if any.
**Open questions:** things Duncan or the next agent must decide.
**Handoff:** what the next agent should do or watch out for.
```

---

## 2026-10-25 — Grok — `grok/link-spacing` (off `astro-rebuild`)

**Changed:** Duncan (pt65u): run-together link text on preschool (“come on in!Schedule a tour”) and other pages — Astro collapses newline/indent between prose and an inline `<a>` (same pitfall Contact fixed with `{' '}`). Spacing-only pass: inserted explicit `{' '}` before jammed `<a>` (and once after `</a>` into following text on birthday-parties). No copy rewrites, layout, or tour-picker changes.
**Files:** `preschool`, `after-school-care`, `infant-toddler-care`, `about`, `camps` (2), `fitness-classes` (3), `hours`, `open-play`, `pickleball`, `team-building` (2), `waiver`, `birthday-parties` (after-`</a>`).
**Evidence:** Before dist had `in!<a`, `Call<a`, `our<a`, `questions.<a`, `</a>ahead`, etc. After rebuild: zero `[wordchar/punct]<a` and zero `</a>[wordchar]` in all dist HTML; preschool body is `come on in! <a …>Schedule a tour`. Build 42 pages; `verify-dist` OK; `check:redirects` OK.
**Live vs committed:** Preview only once pushed. Merge into `astro-rebuild` per Duncan own-it; not `main`; Weebly still prod; DNS untouched.
**Open questions:** None.
**Handoff:** Do not merge PR #1 without Duncan. Refresh laptop preview after merge. When writing new prose+`<a>` across a newline, always use `{' '}`.

## 2026-10-25 — Grok — `grok/tour-trial-picker` (off `astro-rebuild`)

**Changed:** Duncan (pt64u) locked option A: nav **Book a tour** opens an on-page picker (not Contact). New `TourPicker.astro` (native `<dialog>` titled “Book a tour or trial”); five Calendly deep-links from `LINKS` — Infant & Toddler tour, Preschool / Before & After School tour, Ninja free trial 5–8, Ninja free trial 9+, Kickboxing trial ($29). Desktop `.nav__join` + mobile `.nav__mobile-cta` are buttons with `data-open-tour-picker` (no `/contact?program=Tour`). Esc / backdrop / close button dismiss; options open Calendly in a new tab (`rel=noopener`). Birthday/camps/team building stay out. Design B tokens (cream panel, ink border, yellow hover pills). Picker-only pass — no other nav/CTA rewrites; site-wide missing-space-before-`<a` bug deferred to a follow-up pass.
**Conversion impact:** Moms pick which program to tour/trial in one tap from every page, then land on the right calendar. Contact was the wrong funnel for booking.
**Evidence:** Build 42 pages; `verify-dist` OK; `check:redirects` OK. Dist: dialog `#tour-picker` + title present; two openers (desktop+mobile); zero `contact?program=Tour`; five Calendly URLs with `target=_blank` `rel=noopener noreferrer`; birthday/camps absent from picker chunk.
**Live vs committed:** Preview only once pushed. Merge into `astro-rebuild` per Duncan own-it; not `main`; Weebly still prod; DNS untouched.
**Open questions:** None for this picker. Follow-up: site-wide missing spaces before inline `<a>` (e.g. preschool “come on in!Schedule a tour”) — separate pass.
**Handoff:** Do not merge PR #1 without Duncan. Refresh laptop preview after merge to `astro-rebuild`.

## 2026-10-25 — Grok — `grok/contact-one-phone` (off `astro-rebuild`)

**Changed:** Duncan (pt62u): two phone numbers side-by-side still on `/contact`. Root cause: `contact.astro` sets hero primary CTA to Call (`NAP.phoneTel`), and `ActivityPage.astro` always also rendered outline `Call {phone}` beside primary — identical twin buttons. Secondary: `ContactForm` alt line still had `Prefer to call? {phone}` while Contact details already lists Phone. Fix: (1) ActivityPage hero outline Call only when `ctaUrl` and `cta2Url` are not already `NAP.phoneTel` (other pages keep Tour/Book + Call). (2) ContactForm alt → short non-phone note (“The form above is the best way to email us.”). Left Contact details Phone row; left bottom cta-box Call + Contact Us; no Hotline; CarePage untouched.
**Evidence:** Build 42 pages; `verify-dist` OK; `check:redirects` OK. Dist `/contact.html` hero actions = one `btn-primary` Call only (no outline twin). Form alt has no tel. Details Phone row present. `/open-play` hero still primary + outline Call.
**Live vs committed:** Preview only once pushed. Merge into `astro-rebuild` per Duncan own-it; not `main`; Weebly still prod; DNS untouched.
**Open questions:** None for this fix.
**Handoff:** Do not merge PR #1 without Duncan. Refresh laptop preview after merge to `astro-rebuild`.

## 2026-10-25 — Grok — `grok/pickleball-two-col` (off `astro-rebuild`)

**Changed:** Duncan (pt61u) said go on pickleball two-col only. Prior programs-two-col already wrapped the soft intro + one proof; rates/hours/reserve stayed full-width below — weak for pickleball market questions (hours / reserve / cost). Matched ropes Open Ropes conversion block: one `.two-col.care-claim` with claim copy + rates + hours/reserve + Call CTA in `.care-claim__text` beside existing `ProofPhotos` (`proofCourt`). Desktop = copy+CTA | proof; ≤900px stacks via existing `.two-col`. Browse `PhotoGallery` stays full-width below. No photo swaps, no CSS retune, no other pages.
**Conversion impact:** Parents see cost, court slots, and reserve CTA beside the court proof in one glance instead of scrolling past marketing into orphan rate/hours blocks.
**Evidence:** Build 42 pages; `verify-dist` OK; `check:redirects` OK. Dist `/pickleball.html`: rates + hours + Call CTA inside `.care-claim__text` before `.proof-photos`; browse gallery still present.
**Live vs committed:** Preview only once pushed. Merge into `astro-rebuild` per Duncan own-it; not `main`; Weebly still prod; DNS untouched.
**Open questions:** Weekend pickleball times still TBD; new online booking link still TODO.
**Handoff:** Do not merge PR #1 without Duncan. Refresh laptop preview after merge to `astro-rebuild`.

## 2026-10-25 — Grok — `grok/email-obfuscation` (off `astro-rebuild`)

**Changed:** Duncan (pt60u) approved site-wide email harvest fix matching Contact (PR #17). (1) Added `NAP.emailDisplay` (`help [at] bodiesinmotionidaho.com`); kept `NAP.email` for API/schema/Mailjet/`data-mailto`. (2) Footer: no mailto — link to `/contact` + obfuscated text. (3) Removed static `mailto:` hrefs from privacy, team-building, birthday-parties, hours, pickleball, ropes-course, waiver, jobs; body/FAQ/cta copy now prefer contact form and/or obfuscated display. (4) Jobs: CTA → `/contact` (mention Motioneer); no static mailto. (5) Contact page now uses `NAP.emailDisplay`. ContactForm `data-mailto` + `api/contact.js` + Mailjet unchanged. JSON-LD still has email.
**Evidence:** Build + verify-dist + check:redirects. Dist: zero `href="mailto:` in page/footer HTML; ContactForm `data-mailto` OK; cleartext `help@` not in footer/body link text (schema/api/docs OK).
**Live vs committed:** Preview only once pushed. Merge into `astro-rebuild` per Duncan own-it; not `main`; Weebly still prod; DNS untouched.
**Open questions:** None for this pass.
**Handoff:** Do not merge PR #1 without Duncan. Refresh laptop preview after merge to `astro-rebuild`.

## 2026-10-25 — Grok — `grok/about-photos` contact follow-up (same PR)

**Changed:** Duncan contact feedback, separate commit after About. (1) Removed duplicate phone / **No Pickup Hotline** list row + FAQ — one phone only (`NAP.phoneDisplay`). (2) Fixed run-together link text (`See our<a` / `your<a`) with explicit `{' '}` before hours + waiver links. (3) Email harvesting: form stays primary (`POST /api/contact` → Mailjet). Removed visible `mailto:` + cleartext `help@…` from contact details and form alt line; show obfuscated `help [at] bodiesinmotionidaho.com` as text. `data-mailto` kept only for JS fallback when API fails (still present in HTML attribute — determined scrapers can find it; not inventing a spam product). FAQ/meta no longer push raw mailto. No other pages.
**Evidence:** Build + verify-dist + check:redirects. Dist contact: one tel link in details; zero visible `mailto:` in body links; `See our hours` / `your waiver` have spaces; Hotline absent.
**Live vs committed:** Same PR as about-photos → merge to `astro-rebuild`. Not `main`; Weebly still prod; DNS untouched.
**Open questions:** None for contact. Family photo higher-res still needed (about).
**Handoff:** Do not merge PR #1 without Duncan.

## 2026-10-25 — Grok — `grok/about-photos` (off `astro-rebuild`)

**Changed:** Duncan (pt57u): `/about` only. (1) B&W martial arts dojo (`about-vista-school.jpeg` — filename is mislabeled; image is Vista Ave school floor with heavy bags + kick mural, not a school visit) moved from browse gallery into **Our story** two-col as proof beside the martial-arts origin claim; alt/caption corrected. (2) Aerial/acro yoga (`about-acro-yoga.jpg`) moved from gallery into **Purpose and core values** two-col beside Unique & Innovative / ignite-activity claim. (3) Removed unrelated browse gallery items `values1.jpg` and `values3.jpg` (outdoor park people, not about-story). Browse `PhotoGallery` removed from about — nothing left that belongs. (4) Family photo (`about-richardsons.jpg`) stays with Meet the founders; **no higher-res in repo or Weebly inventory** (md5 match to `about-us-richardsons-web.jpg` at **408×272** only) — cannot invent pixels; logged on backlog. Two-col pattern kept. No other pages.
**Evidence:** Build + `verify-dist` + `check:redirects` (see commit). Dist about.html: martial proof in Our story, acro in Purpose, founders family; no PhotoGallery / values1 / values3. Shots: `/workspace/about-photos-shots/`.
**Live vs committed:** Preview only once pushed. Merged into `astro-rebuild` per task; not `main`; production still Weebly; DNS untouched.
**Open questions:** Duncan to supply higher-res (and preferably up-to-date) Richardson family photo for `/about` founders proof.
**Handoff:** Do not merge PR #1 without Duncan. Refresh laptop preview after this merges to `astro-rebuild`.

## 2026-10-25 — Grok — `grok/fix-amp-grain-crops` (off `astro-rebuild`)

**Changed:** Duncan (pt55u): do all three in one PR. (1) Visible `&amp;` / double-escaped entities — root cause: Astro HTML attrs like `heading="… &amp; …"` keep the entity, then `{heading}` escapes `&` again → `&amp;amp;` on screen. Fixed infant + fitness PhotoGallery headings to `heading={"… & …"}`. (2) Grainy pics — ProofPhotos widths `[480,720,960,1280]` + `sizes=(max-width:900px) 92vw, 640px` (was max 720 / 360px, undersized for ~636px two-col proof). PhotoGallery widths `[400,640,960]`. Care/Activity heroes `sizes=(max-width:900px) 100vw, 50vw`. Inventory has no higher-res for anna/lisa/rhea/rachel thumbs (256–311px Weebly); kristin/dave already 1280. (3) Fitness crops — per-image overrides only on fitness: hero `object-pos-center`; proof rhea+rachel `proof-photos__img--portrait` (3/4 aspect, max-height 420 — 4/3 was chopping stance/dumbbell); gallery anna center / lisa left / kristin right. Added `.object-pos-25` util; left/right now `left|right center`. Optional `imgClass` on ProofPhotos/PhotoGallery items; optional `heroImgClass` on ActivityPage.
**Evidence:** Build 42 pages; `verify-dist` OK; `check:redirects` OK. Infant gallery heading renders `More from infant & toddler care` (zero `&amp;amp;` in dist). Fitness computed: hero `50% 50%`; proofs `3/4` @ 315×420; gallery object-position center/left/right. Shots: `/workspace/fix-amp-grain-crops-shots/` (infant-gallery-heading, fitness-hero, fitness-proof-0/1, fitness-gallery).
**Live vs committed:** Preview only once pushed. Merged into `astro-rebuild` per Duncan do-them-all; not `main`; production still Weebly; DNS untouched.
**Open questions:** Grain on anna/lisa/rhea/rachel (and some other Weebly thumbs) needs higher-res originals from Duncan — srcset cannot invent pixels. Same for toddler-proud (346px) etc.
**Handoff:** Do not merge PR #1 without Duncan. Refresh laptop preview after this merges to `astro-rebuild`.

## 2026-10-25 — Grok — `grok/programs-two-col` (off `astro-rebuild`)

**Changed:** Duncan approved (pt53u) rolling the care desktop two-col pattern to other program pages — ONE change only. Wrapped each claim text + `ProofPhotos` pair in `.two-col.care-claim` / `.care-claim__text` on: camps, open-play, ninja-warrior (trial + ranks), birthday-parties (kids / 10–16 / adult), fitness-classes (kickboxing + kids-while-you-train), team-building (formats), pickleball, ropes-course (Open Ropes), parents-night-out (Cosmic Glow), about (founders), jobs (core values). Reused existing `.two-col` / `.care-claim` CSS (stacks ≤900px); CSS comment only broadened to “care + program”. Browse `PhotoGallery` stays full-width below. Care pages (infant/preschool/after-school), nav, home, facts, Cosmic, photo scale/crops untouched.
**Evidence:** Build 42 pages; `verify-dist` OK; `check:redirects` OK. Metrics @1440 open-play/ninja/fitness first claim: `grid-template-columns: 636px 636px`, claim 1320 centered (left 60); @390: single `342px` column, text+proof same left (stacked); scrollWidth = viewport (no overflow). Shots: `/workspace/programs-two-col-shots/` (open-play, ninja, fitness desktop+mobile claim).
**Live vs committed:** Preview only once pushed. Merged into `astro-rebuild` per Duncan go; not `main`; production still Weebly; DNS untouched.
**Open questions:** None for this layout. Real openings status still needed from Rhea/Rachel.
**Handoff:** Do not merge PR #1 without Duncan. Next visual pass needs a fresh layout contract first — don’t stack more CSS onto this without asking.

## 2026-10-25 — Grok — `grok/care-two-col` (off `astro-rebuild`)

**Changed:** Duncan signed off + said go on ONE change: care pages get desktop side-by-side (text/facts | proof photo), stack ≤900px. Camps uses ActivityPage — skipped. Wrapped each claim+ProofPhotos pair on `/infant-toddler-care`, `/preschool`, `/after-school-care` in `.two-col.care-claim` (text in `.care-claim__text`). CSS: reuse existing `.two-col` (`1fr 1fr` → `1fr` @900px); `.care-claim` spacing + proof column fills width (`max-width: none`); no photo scale/crop retune (`object-position: center top` + 4/3 kept). Browse `PhotoGallery` stays full-width below rates/CTA. Nav/home/other programs/facts/Cosmic untouched. Also locked working rules into `CLAUDE.md`: one change per pass, layout contract first, signed-off photo order.
**Evidence:** Build 42 pages; `verify-dist` OK; `check:redirects` OK. Metrics @1440 infant first claim: `grid-template-columns: 636px 636px`, claim 1320 centered (left 60); @390: single `342px` column, text+proof same left (stacked). Shots: `/workspace/care-two-col-shots/` (infant desktop+mobile claim).
**Live vs committed:** Preview only once pushed. Merged into `astro-rebuild` per Duncan go (pt51u); not `main`; production still Weebly; DNS untouched.
**Open questions:** None for this layout. Real openings status still needed from Rhea/Rachel.
**Handoff:** Do not merge PR #1 without Duncan. Next visual pass needs a fresh layout contract first — don't stack more CSS onto this without asking.

## 2026-10-25 — Grok — `grok/photo-scale` (off `astro-rebuild`)

**Changed:** Duncan: after the 1320 desktop widen, proof/gallery photos ballooned and dominated pages (proof tiles measured **954×716** @1440 — second heroes). Senior judgment: facts/CTA win; photos prove, don’t overwhelm. (1) `.page-hero__img` height `clamp(220px, 32vw, 480px)` desktop, `clamp(200px, 55vw, 280px)` ≤900px — strong but not billboard. (2) Proof tiles: image height **300px** desktop / 240 tablet / 200 mobile; `--1` max-width **560px** (was 960); `--2` capped 920px; 2–3 col grid kept. (3) Browse gallery: **4 cols** desktop (3 ≤1100, 2 ≤900, 1 ≤560), thumbnail height **220px** / 200 mobile. (4) Home tiles: `grid-auto-rows` 260→240 (mobile 220) — mosaic didn’t explode; slight densify. (5) `ProofPhotos`/`PhotoGallery` `sizes`/widths tuned down. Methodology + Design B + Cosmic-on-hold untouched; no copy/fact changes.
**Evidence:** Before→after @1440 infant proofs 954×716→554×300; gallery 422×317→314×220; hero ~463→481 (capped). Fitness same. Home featured tile 532→490. Mobile infant proof/gallery 252→200, hero 275→221. Zero overflow. Build 42 pages; `verify-dist` OK; `check:redirects` OK. Shots: `/workspace/photo-scale-shots/before|after/`.
**Live vs committed:** Preview only once pushed. Not merged to `main`; production still Weebly; DNS untouched. PR targets `astro-rebuild` (merge into rebuild per Duncan own-it; not PR #1).
**Open questions:** None for scale. Real openings status still needed from Rhea/Rachel.
**Handoff:** Do not merge PR #1 without Duncan. Note: `grok/desktop-width` + `grok/fix-autoscroll` WORKLOG bodies are still trapped inside the template markdown fence near the top of this file (prior garble); leave them — don’t find-and-replace. Refresh laptop preview after this merges to `astro-rebuild`.

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
