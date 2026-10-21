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
- [ ] **Holiday closures** — the old Hours page lists only 2025 closures (Thanksgiving, Christmas); none are shown (the page just says to call before visiting on a holiday). Add current ones. (`src/pages/hours.astro`)
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
- [ ] **Motioneer job application form** — not migrated (it posted to Weebly); `/jobs` tells applicants to email help@ or call. Add a form (can reuse `/api/contact`) or link. No `JobPosting` schema until there is a concrete opening (title, description, date posted, pay, employment type); pay, hours and benefits are not on the old page, so none are listed. (`src/pages/jobs.astro`)

## Content still to migrate
- [ ] **About team roster** — copied from the old Our Team page (photos ~2020); Dyani Russell and Brian Jankowski had no role listed. Confirm the roster is current. (`src/pages/about.astro`)
- [ ] **Blog follow-ups** — 21 posts migrated (see "Blog review flags" below). The other 65 old posts are 301-redirected (29 to program pages, 36 to `/blog`); none were migrated. To bring one back, add its markdown file, move its slug into `keep` in `scripts/blog-map.json` and regenerate `vercel.json`.

## Blog review flags (2026-10-21)
Each post's `reviewNotes` frontmatter (`src/content/blog/<slug>.md`) holds the same note. Posts were lightly edited: only facts already on this site (hours, ages, ratios, programs, contact) were added, and unsourced stats, dated event references and legal claims were removed or softened.

**Needs a decision**
- [ ] **`top-five-elementary-schools-in-boise`** — the 2019 list ranked five schools with Niche grades, test-score percentages, enrollment, ratios and state rankings (one score was garbled: "775"). All scores/ranks/stats were removed; only the school names remain, retitled "(2019 List)" with a visible "This list is from 2019 and is being reviewed" note. Either verify and refresh, keep as is, or retire it (redirect `/blog/top-five-elementary-schools-in-boise` to `/blog`). Also confirm the school names.
- [ ] **Martial arts / biking / axe throwing** — `what-makes-a-bodies-in-motion-summer-camp-special` no longer lists the 2019 "Martial Arts", "Mountain Biking" and "Learn to Ride" camps (Bodies in Motion may not offer them; confirm). No post presents martial arts or axe throwing as a current offering (the martial-arts and axe-throwing posts were redirected, not migrated).
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
- [ ] `are-camps-only-for-summer` — the winter-break paragraph is generic; confirm whether Bodies in Motion runs winter-break camps before saying so.
- [ ] `why-team-builder-courses-are-great-for-sports-teams` — confirm the workshops are positioned for sports teams ("courses such as ours in Boise can show you how to handle in-game changes").
- [ ] `ten-theme-ideas-for-birthdays-parties` — "Bodies in Motion has offered superhero-themed parties in the past" is the original author's; confirm. Title typo "Birthdays Parties" fixed.
- [ ] `how-to-find-the-best-infant-care-for-your-baby` — the Idaho STARS mention and "recommended ratios" advice are the author's; the childcare license number is still not on the site (see Licensing above).

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
