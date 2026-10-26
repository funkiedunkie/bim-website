# TODO(Duncan)

Everything here is a fact, link or decision that is **not** in the crawl of the live Weebly site
(`scripts/weebly-crawl/inventory`, formerly local `/workspace/bim-site/inventory`) or the Camps for Kids export, so it was left out or flagged rather than invented. Each item is also
marked in the source with a `TODO(Duncan)` comment.

Find them all: `grep -rn "TODO(Duncan)" src`

## Recurring
- [ ] **Refresh camp dates/prices each season** (source: Camps for Kids app). Update `upcomingCamps` and the "2026 rate" notes in `src/pages/camps.astro`. Past dates are dropped at build time, but the build must be re-run (and the list edited) to add new ones.
- [ ] **Rebuild after Oct 24, 2026 21:00 MDT** — the Cosmic Glow Event schema drops automatically, but the static HTML must be rebuilt. Family Night Out date is still "TBA". (`src/pages/parents-night-out.astro`, `camps.astro`)

## Hours and structured data
- [ ] **Open play season changeover** — both summer and fall/winter hours are shown; JSON-LD carries the current (fall/winter) hours via `OPEN_PLAY_HOURS_SPEC` in `src/lib/site.ts`. Swap it when the season changes (no changeover dates given).
- [ ] **Ninja open gym Sunday hours** — Saturday ends at 5 pm (confirmed); Sunday is shown as "call for hours" (old pages said 5 pm or 3 pm). (`ninja-warrior.astro`, `hours.astro`)
- [ ] **Pickleball weekend times** — the confirmed list (2026-10-23) has weekday slots only, so no weekend times are shown. Add if there are any. (`pickleball.astro`, `hours.astro`)

## Programs and offers
- [ ] **Pickleball booking link** — the old link went to Sawyer (no longer used). Booking is by phone/email/contact form until a new link exists. Rhea blocks School of Soccer overlaps on the pickleball calendar; times say "subject to availability". (`pickleball.astro`)
- [ ] **Team building revamp** (Rhea) — prices updated and a "Book a team-building event" button sends a "Team Building" request to help@ through the contact form. Revisit the page when the program is revamped. (`team-building.astro`)
- [ ] **Family Night Out revamp** — shown as "next date coming soon" at $49 / $39.20; add the date and Event schema when rescheduled. (`parents-night-out.astro`)
- [ ] **Cosmic Ropes / Cosmic parties** — on hold (staffing + light system). Cosmic Ropes and the Supernova party are removed; the Cosmic Birthday Party (Dwarf Star/Nova) is shown as "currently unavailable" with no prices. Confirm that is right for the Cosmic birthday packages, and restore when back. (`ropes-course.astro`, `birthday-parties.astro`)
- [ ] **Next ninja competition** — in the works, date TBA. (`ninja-warrior.astro`)
- [ ] **SGX trial and sign-up link** — prices now shown: kickboxing trial $29, kickboxing $109/mo, kickboxing + SGX $139/mo. SGX-only trial/price and an online sign-up link are not confirmed. (`fitness-classes.astro`)
- [ ] **Kids party naming** — "Themed" vs "Play Zone Party" naming. (`birthday-parties.astro`)
- [ ] **Open play** — monthly specials calendar not migrated; confirm how "open play free when you exercise" works. (`open-play.astro`)

## Links and forms
- [ ] **Motioneer job application form** — keep the current approach (email/phone on `/jobs`) for now. Rhea will evaluate form usage vs an external hiring site. No `JobPosting` schema until there is a concrete opening. (`src/pages/jobs.astro`)

## Content still to migrate
- [ ] **Blog follow-ups** — 21 posts migrated (see "Blog review flags" below). The other 65 old posts are 301-redirected (29 to program pages, 36 to `/blog`); none were migrated. To bring one back, add its markdown file, move its slug into `keep` in `scripts/blog-map.json` and regenerate `vercel.json`.

## Blog review flags (2026-10-21)
Each post's `reviewNotes` frontmatter (`src/content/blog/<slug>.md`) holds the same note. Posts were lightly edited: only facts already on this site (hours, ages, ratios, programs, contact) were added, and unsourced stats, dated event references and legal claims were removed or softened.

**Needs a decision**
- [ ] **`what-makes-a-bodies-in-motion-summer-camp-special`** — rewritten to current camp facts (ages 4–12, 9 am–3 pm, 7:30 am–6 pm care, optional lunch, Motioneer certifications). Removed 2019 specifics (this-year camp list, ages 3–13, 7:00 am pre-camp, hot lunches, age-grouping, guest Ninja Warrior athletes, mountain-bike levels, Splash inflatables, Adventure sessions, the Activities Director chat). Past theme names (Ninja, Secret Agent, Treasure Hunters, Hollywood, Splash, Ninja Warrior, Adventure, Myth Busters, Super Hero, Kid vs. Wild, Bugs) are listed as past camps only; confirm you're happy with that.
- [ ] **`what-do-you-need-for-parents-night-out`** — rewritten to the current Cosmic Glow Party (ages 5–12, 5–9 pm, dinner included) and Family Night Out (ages 3 potty-trained to adults). Removed the 2019 themes list, "one night a month", the Newton's Cafe flatbread buffet, "ages 3–12" and the behavior rules. No prices quoted. Family Night Out date is still TBA.

**Stats, studies and claims removed or softened**
- [ ] `the-ultimate-guide-to-the-different-types-of-schooling-for-kids` — removed the Waldorf "94% of graduates go to college vs 66%" statistic and the "all Waldorf schools are nonprofits" claim; fixed "public schools are funded by the federal government"; removed the incorrect "Founder, Reggio Emilia" attribution (the quote is usually credited to Loris Malaguzzi; add only with a source). The remaining school-type descriptions are the original unverified 2019 text.
- [ ] `what-does-my-child-get-from-summer-camp` — "Some studies say children can lose half of what they learned..." became "can lose some of what they learned" (no study was named). Add a named source if you want a number back.
- [ ] `why-host-a-birthday-party-outside-of-your-home` — removed the unsourced legal claims in the Safety section (host liability for medical bills; venue "is responsible for issues").
- [ ] `what-can-a-ninja-warrior-class-teach-your-child` — softened the line about children with "a mobility or mental issue" overcoming their issue through the class. Statements about American Ninja Warrior competitors are the author's, unverified.
- [ ] `why-open-play-gyms-are-vital-for-children` — removed "ninja warrior course", "free disco", "create art" and "giant lego set" (not on `/open-play`); now uses the four-slide structure, imagination stations, costume corner, trains and Legos. Age range now 12 months and up. "Open play free when you exercise" still needs confirming (see above).
- [ ] `what-does-a-rope-course-teach` — removed "college sports teams" and "corporate events"; closing now lists Open Ropes, Cosmic Ropes parties (ages 10+) and team building for 4–60.
- [ ] `unforgettable-summer-adventures-a-day-at-bodies-in-motion-camp` — removed the "splash in the pool" and "STEAM science experiment" claims; "counselors" became "Motioneers".
- [ ] `five-reasons-why-a-kids-gym-is-the-perfect-birthday-party-location` — softened "chances are [yours] will be the only party"; confirm how many parties can run at once.
- [ ] `why-team-builder-courses-are-great-for-sports-teams` — confirm the workshops are positioned for sports teams ("courses such as ours in Boise can show you how to handle in-game changes").
- [ ] `ten-theme-ideas-for-birthdays-parties` — "Bodies in Motion has offered superhero-themed parties in the past" is the original author's; confirm. Title typo "Birthdays Parties" fixed.

**Unchanged (general advice, no site-specific claims beyond what was linked)**: `vital-considerations-when-looking-for-after-school-care`, `what-should-a-child-be-learning-in-preschool`, `how-to-pick-a-new-school`, `how-to-pick-the-perfect-summer-camp`, `can-i-get-into-a-last-minute-summer-camp`, `alternatives-to-boring-team-building` (typos fixed; closing paragraphs now describe current programs).

**Photos**
- [ ] The hero photos are the original Weebly images (stock-style, no licenses recorded; the old pages carried a block of Flickr/Creative Commons credit links that was not migrated; confirm whether any hero image needs a plain-text credit). `ten-theme-ideas-for-birthdays-parties` uses `296030532.jpg`, which looks like a stock-photo ID: confirm all licenses, or swap in Bodies in Motion photos.
- [ ] The after-school post's photo (a parent and toddler outdoors) is a loose fit, and `why-team-builder-courses-are-great-for-sports-teams` and `alternatives-to-boring-team-building` share the same stock image. `how-to-find-the-best-infant-care-for-your-baby` has no photo (none in the original).

## Legal and page details
- [ ] **Privacy policy: legal review + effective date** — `/privacy` is a plain-language rewrite of the old policy (the GPT / Recipe Builder / OpenAI sections are dropped) and shows "Draft — pending legal review" at the top. Have it reviewed (a reviewer may add children's privacy, retention and state-law rights), set the effective date, then remove the draft notice. Confirm a mailing address (the street address is used). Update the Cookies section if analytics are added: the old Weebly site used Google Tag Manager (GTM-KGR99L7N); this site loads none. (`src/pages/privacy.astro`)
- [ ] **Waiver details** — the old page only said "fill out the waiver" (GymMaster portal). Not stated, so not claimed: who must sign (e.g. parent/guardian for children), whether it is per visit or one-time, whether it is required before arriving. (`src/pages/waiver.astro`)
- [ ] **Reviews** — 129 reviews in ten groups are in `src/lib/reviews.ts` (verbatim; star ratings not shown; exact duplicates listed once). Martial-arts and axe-throwing team-building reviews are under "Other programs". No Review/AggregateRating schema on purpose. The three home-page testimonials are shortened-name copies of reviews already listed. (`src/pages/reviews.astro`)
- [ ] **Past-Motioneer quotes on `/jobs`** — five named people, copied verbatim from the old Jobs page; confirm they may stay public. (`src/pages/jobs.astro`)

## Intentionally omitted (not sourced, or conflicts with the brief)
- "Second location very soon" from the old About page (Boise is the only location).
- Any Meridian or Garden City location/address; they appear only as `areaServed` and "families from Boise, Meridian and Garden City".
- Old Weebly seasonal items (Trunk or Treat RSVP banner, etc.); member codes; camp dates that have already passed.
- Axe-throwing team building (appears only in old reviews, not as a current workshop).
- Open play kids' prices from the old pickleball page ($6 / $9.60 / $12); `/open-play` has the confirmed prices.

## Resolved (2026-10-23, staff answers via Duncan)
- Childcare license #28-11875 on `/infant-toddler-care` and in the footer.
- Holidays: closed Easter, Memorial Day, July 4th, Labor Day, Thanksgiving Day, Christmas Day, New Year's Day; close early Halloween, Christmas Eve, New Year's Eve (`/hours`, open play FAQ).
- Open play hours: summer and fall/winter, on `/open-play`, `/hours` and JSON-LD (`openingHoursSpecification`).
- Pickleball hours (weekday slots, Mon/Thu evening) with "subject to availability".
- Ninja tuition/schedule confirmed; Saturday open gym ends 5 pm.
- Kickboxing $29 trial, $109/mo; kickboxing + SGX $139/mo. Fitness challenge section removed; old challenge URLs already 301 to `/fitness-classes`.
- Team building per-person prices; booking CTA + "Team Building" contact-form type (to help@ → Rhea).
- Open Ropes M–F 4–5 and 5–6 pm, Saturday call, $16/person.
- Family Night Out prices confirmed; "next date coming soon".
- Lock-in food: late-night snack/dinner and continental breakfast (typo text not used).
- Ropes party add-on: "Ropes $50+" option, otherwise call ahead.
- About: 2021 team roster removed; About page kept without a staff list.
- Contact form delivery: Mailjet env vars set on Preview and a Mailjet test reached help@ (2026-10-21).

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
- `/hours`, `/reviews`, `/contact`, `/jobs`, `/waiver`, `/privacy` promoted to full indexable pages (sitemap, verify-dist, FAQ + JSON-LD). `/contact` adds ContactPage schema; `/hours` adds `openingHoursSpecification` for the childcare hours only (Mon–Fri 7:30 am–6 pm).
- `/reviews`: all reviews from the ten old review pages migrated, grouped by program, no review schema.
- `/contact`: No Pickup Hotline (Ext. 5), Fred Meyer directions note, map, form and email. `/waiver`: GymMaster button. `/jobs`: positions, core values, purpose and email/phone application instructions.
- Privacy: GPT / Recipe Builder / OpenAI sections removed; draft notice added.
- Blog migrated: `/blog` is now an indexable listing and 21 posts are full pages at their original `/blog/<slug>` URLs (content collection, BlogPosting JSON-LD, sitemap, verify-dist). 29 old posts 301 to their program page, 36 to `/blog`; the temporary `/blog/:slug` catch-all is gone. `check-redirects` now fails unless every old blog URL (blog-map, `urls.txt`, `pages.json`) is a built kept post or redirected. No noindex stubs remain.
- Blog (2026-10-21): keep "Top 5 elementary schools in Boise" as a 2019 list with stats stripped; summer Learn to Ride and winter-break camps restored in the camp posts and /camps (no dates or prices); no martial arts or other biking camps; Idaho STARS provider confirmed.
