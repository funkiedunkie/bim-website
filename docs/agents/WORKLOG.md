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
