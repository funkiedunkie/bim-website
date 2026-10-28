# CLAUDE.md

Single source of truth for every AI agent working in this repo: Claude Code, Grok, or anything else. Read this whole file before doing anything. It is a living document: if you improve how we work, update it in the same commit and say so in your WORKLOG entry.

## What this repo is

`funkiedunkie/bim-website` is the rebuild of the **main Bodies in Motion website, bodiesinmotionidaho.com**, moving it off Weebly to a site Duncan controls. A member portal and a CRM come later.

It is **not** the camp app. The camp app is `funkiedunkie/bodies-in-motion-redesign`, also called **CFK** or campsforkidsidaho.com (React + Supabase + Stripe). Despite its name, that repo is the camps site. Don't mix the two up. The CFK app is the source of truth for camp dates and prices.

## Business facts (never contradict, never invent)

- **One location only:** 729 W. Diamond St, Boise, ID 83705 · (208) 381-0587.
- **There is no Meridian location.** Meridian is a service area only (camps, parties, maybe open play draw from it). Never list or mark up a Meridian address.
- Contact email: help@bodiesinmotionidaho.com. Website inquiries and birthday-party leads go to **Rhea**.
- BIM is an Idaho STARS provider. BIM no longer uses Sawyer (the build fails on any Sawyer link).
- Anything not in the Weebly crawl, the CFK app or a Duncan confirmation is a `TODO(Duncan)` (see `TODO.md`), never a guess.

## Working rules for every agent

Duncan runs Bodies in Motion and Camps for Kids Idaho. He is not a developer.

- **Never** publish, deploy to production, merge, change DNS (GoDaddy), or spend money without Duncan's explicit OK.
- **Evidence before claims.** Never say "fixed", "done" or "works" without proof: the build passing, the real code run, or the data checked. Include the evidence.
- **Root cause, not band-aids.** Fix the class of problem, not just the instance in front of you.
- **Commits:** one per logical change, message explains *why*. If a change alters anything this file documents, update this file in the same commit.
- **Talking to Duncan:** outcome first, then the why, in plain words. Keep it short. Answer what he asked; don't fix things he didn't ask about.
- **Secrets:** never print, log or commit a token, key or password, including in commit messages and docs. Secrets live in Vercel env vars (and a gitignored `.env` locally). A secret pushed to GitHub is leaked: rotate it, don't just delete the line.
- **One change per pass.** One PR = one layout/visual contract. Don't stack width + photo scale + crop (or similar) in back-to-back PRs that undo each other.
- **Layout contract first.** Before any CSS/layout tweak, state the desktop pattern in one sentence (e.g. "care claim text | proof photo, 2-col → stack ≤900px") and get Duncan's yes. Prefer side-by-side on desktop over stretching a mobile stack. When Duncan reports a layout problem, offer the stronger alternative, not only the narrow fix.
- **Program-page photo order (signed off):** facts + primary CTA first → 1–3 captioned proof photos beside the claims they support → browse gallery full-width after that CTA. Same order every market; only the 10-second questions change.

## Working alongside other agents (Claude Code ⇄ Grok)

Claude Code and Grok both work here, never on the same task at the same time. They coordinate through git:

**Canonical working branch until PR #1 merges: `astro-rebuild`** (not `main`). `main` is still the old Vite starter.

**Before ANY work (mandatory, every session, no exceptions)**
```bash
git fetch origin
git checkout astro-rebuild
git pull --ff-only origin astro-rebuild
git log -5 --oneline
gh pr list --base astro-rebuild --state merged --limit 5
```
Then:
1. Read this file in full.
2. Read the top entries of `docs/agents/WORKLOG.md` (at least three), plus every entry with open questions or unfinished/unmerged work.
3. Check open PRs: `gh pr list`, and run `git status`.

If your local tip SHA ≠ `origin/astro-rebuild`, **stop and pull** before reviewing or editing.
If another agent's branch or uncommitted files touch the files you need, **stop and ask Duncan**.

**Branches and PRs**
- Work on `claude/<short-topic>` or `grok/<short-topic>`, branched from an up-to-date `origin/astro-rebuild` (`git fetch && git checkout -b grok/x origin/astro-rebuild`), not `main`.
- One logical change per PR. Ready preview work may be merged into `astro-rebuild` with Duncan's go.
- **Never** merge PR #1 (`astro-rebuild` → `main`), and never touch production, DNS or spend without Duncan's explicit OK.
- Once the Vercel project's production branch is `main` and DNS points at Vercel, merging to `main` is releasing.

**End of session:** add a WORKLOG entry, push your branch/PR, and state the tip SHA of `origin/astro-rebuild` in the handoff line.

**Deploy ledger** — any deploy, env var change, redeploy, DNS change or migration gets a row in `docs/agents/DEPLOYED.md` in the same session. GitHub shows what's committed, not what's live.

**Work log** — before ending a session, add an entry to `docs/agents/WORKLOG.md` **directly above the first `## ` heading**: date, agent, branch, what changed, what is live vs only committed, open questions and handoff notes. Commit it with your work. Never edit or delete another agent's entry, and never add yours by find-and-replace on another entry's text (that garbled the CFK log once); write a correcting entry instead.

## Stack (lives on branch `astro-rebuild` until PR #1 merges)

`main` still holds an early Vite starter. The real site is on `astro-rebuild` (PR #1). Once merged, this section describes `main`.

- **Astro 7**, static output, plain `.astro` components (no React/Supabase). `@astrojs/sitemap`, `astro:assets` image optimization. Requires **Node >= 22.22**.
- **Hosting:** Vercel, team `camps-for-kids-idaho`, project `bim-website`. Branch pushes get preview deployments (previews need a Vercel login). Production is still Weebly; DNS is at GoDaddy and untouched.
- **`vercel.json`** holds 301 redirects for every old Weebly URL. It is generated: edit the map in `scripts/generate-vercel-json.mjs` or `scripts/blog-map.json`, then run `node scripts/generate-vercel-json.mjs`. Don't hand-edit it.
- **`scripts/blog-map.json`** is Duncan's approved mapping of all 86 old blog posts: `keep` (21 migrated to `src/content/blog/` at the same URL) or a redirect target.
- **`scripts/weebly-crawl/`** holds the committed Weebly crawl inputs (`urls.txt`, `pages.json` with `url` fields only, `inventory/index.md`) so any agent can run `npm run check:redirects` and `node scripts/generate-vercel-json.mjs` without local-only `/workspace/...` files. CLI args still override the defaults.
- **`/api/contact`** (`api/contact.js`) is a Vercel Function that sends the contact form to help@ via the Mailjet Send API v3.1, with a mailto fallback when not configured. Env vars (names only): `MAILJET_API_KEY`, `MAILJET_SECRET_KEY`, `CONTACT_FROM`, `CONTACT_TO`. It uses its own Mailjet subkey ("Bodies in Motion Main Site"), separate from the CFK app's key; don't reuse or disturb the CFK key.
- **`TODO.md`** lists every fact still waiting on Duncan/staff; each is also marked `TODO(Duncan)` in source (`grep -rn "TODO(Duncan)" src`).
- Structure: `src/pages` (one file per route), `src/layouts` (Base, CarePage, ActivityPage, Stub), `src/components`, `src/lib/site.ts` (NAP, links, JSON-LD builders), `src/lib/blog.ts`, `src/content/blog`, `public/` (robots.txt etc.).

### Commands

```bash
npm install
npm run dev                          # http://localhost:4321
npm run build                        # build to dist/
node scripts/verify-dist.mjs         # after build: H1, canonical, JSON-LD, noindex, sitemap, blog, no Sawyer
npm run check:redirects              # after build: every legacy Weebly URL is redirected or a kept post (reads scripts/weebly-crawl/)
node scripts/generate-vercel-json.mjs  # regenerate vercel.json redirects (reads scripts/weebly-crawl/inventory/index.md)
```

Run the build and both checks before claiming a change works.

### SEO / AEO conventions

- Indexable pages carry one `<h1>`, a canonical, business JSON-LD (`ChildCare` or `EntertainmentBusiness`) plus `FAQPage`; blog posts carry `BlogPosting`. Stub pages are `noindex,follow` and stay out of the sitemap.
- One primary JSON-LD entity `@id`: `https://bodiesinmotionidaho.com/#bim` (`ENTITY_ID` in `src/lib/site.ts`). ChildCare, activity LocalBusiness, About Organization, and blog publisher/author all use that id (aliases, not three separate businesses).
- Program + blog pages emit `BreadcrumbList`. `Base.astro` uses `twitter:card=summary_large_image` and per-page `og:image` (hero via `getImage`, not always `/icon-512.png`).
- Sitemap gets build-time `lastmod`. Public `llms.txt` lists key care/camp/PNO URLs for answer engines.
- Childcare-first framing on home + About (title/meta/H1 lead). One location only: 729 W. Diamond St, Boise (Meridian = area served).
- Every removed or renamed URL needs a 301 in `vercel.json`.
- SEO findings that affect marketing direction go to Marketing Bot; agents don't set marketing direction.
