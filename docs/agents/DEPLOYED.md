# Deploy ledger — what is actually live

GitHub shows what is *committed*, not what is *live*. Vercel builds previews from branch pushes, env vars and redeploys are changed outside git, and DNS lives at GoDaddy. So this file is the record.

## The rule

Every agent that deploys, redeploys, changes Vercel env vars or project settings, changes DNS, or applies a migration adds a row below **in the same session**, newest first, and mentions it in its `WORKLOG.md` entry. Production deploys and DNS changes need Duncan's explicit OK first.

Never paste secrets here; env vars are listed by name only.

## Current state (2026-10-26)

- **Production (Vercel):** project `bim-website` on team `camps-for-kids-idaho` builds from `main`. Latest Production deploy READY (tip after PR #42 / merge of PR #1). Production aliases: `bim-website-camps-for-kids-idaho.vercel.app`, `bim-website-eosin.vercel.app`, `bim-website-git-main-camps-for-kids-idaho.vercel.app`. Needs a Vercel login to view (SSO).
- **Custom domain (Vercel):** `bodiesinmotionidaho.com` (apex, Production) and `www.bodiesinmotionidaho.com` (301 → apex) are attached to the project and show verified on Vercel. GoDaddy zone still points apex A → Weebly `199.34.228.79` (TTL ~1800) and `www` CNAME → apex; public site still Weebly. DNS cutover to Vercel **pending** GoDaddy auth (`gddy` OAuth on the box). Planned records (do not change MX/TXT/email): apex A `@` → `216.198.79.1` + `64.29.17.1`; `www` CNAME → `88311e8d67d6a49a.vercel-dns-017.com`.
- **Env:** `MAILJET_API_KEY`, `MAILJET_SECRET_KEY`, `CONTACT_FROM`, `CONTACT_TO` on Production + Preview (names only).

## Log (newest first)

| Date | What | Kind | Commit | By | Verified live? |
|---|---|---|---|---|---|
| 2026-10-26 | Duncan OK **change DNS**. Added Vercel project domains `bodiesinmotionidaho.com` + `www.bodiesinmotionidaho.com` (www 301→apex). GoDaddy DNS **not yet changed** — still Weebly A `199.34.228.79`; public https://bodiesinmotionidaho.com still Weebly. Blocked on GoDaddy `gddy auth login` (box localhost callback). Planned: A `@`→`216.198.79.1`+`64.29.17.1`; CNAME `www`→`88311e8d67d6a49a.vercel-dns-017.com`. Leave MX/TXT alone | domain attach (DNS pending) | n/a | Grok | Partial — Vercel domains attached; live custom domain still Weebly |
| 2026-10-26 | PR #1 merged (`astro-rebuild` → `main`). Production deploy READY on Vercel for tip `c0ab248`: bim-website-7lnpl8pql-camps-for-kids-idaho.vercel.app (dpl_GLidLbtvpqk8WUbMXhdwud7N5BiS). Aliases include bim-website-camps-for-kids-idaho.vercel.app. DNS / bodiesinmotionidaho.com still Weebly — not cut over | production deploy (git merge to main) | `c0ab248` | Grok | Yes — Vercel Production READY; custom domain untouched |
| 2026-10-26 | Env vars `MAILJET_API_KEY`, `MAILJET_SECRET_KEY`, `CONTACT_FROM`, `CONTACT_TO` now target Production + Preview (gitBranch restriction cleared). Names only; no values. No deploy, no DNS change | env vars | n/a | Grok | Yes — Vercel env list shows production+preview |
| 2026-10-24 | Preview deploy of proof-photo → browse-gallery layout (ProofPhotos + program pages): bim-website-git-grok-proof-photos-camps-for-kids-idaho.vercel.app (deployment bim-website-d7rix7aib-camps-for-kids-idaho.vercel.app / D7rix7aiB5wMgNvqwUq52T5yNotz) | preview deploy (git push, branch `grok/proof-photos`) | `774718f` | Grok | Yes — Vercel status Ready |
| 2026-10-24 | Preview deploy of P0 conversion fixes (tour-first nav, openings CTAs, care fact strips, dual ninja trials): bim-website-git-grok-p0-conversion-camps-for-kids-idaho.vercel.app (deployment bim-website-bj10chhpn-camps-for-kids-idaho.vercel.app) | preview deploy (git push, branch `grok/p0-conversion`) | `7c96314` | Grok | Yes — Vercel status Ready |
| 2026-10-24 | Preview deploy of multi-image PhotoGallery restore (14 program pages): bim-website-git-grok-restore-images-camps-for-kids-idaho.vercel.app | preview deploy (git push, branch `grok/restore-images`) | `e1c8558` (+ ledger `04e3138`) | Grok | Yes — Vercel status Ready |
| 2026-10-24 | Preview deploy of detail pass (real BIM logo + photo polish): bim-website-git-grok-detail-pass-camps-for-kids-idaho.vercel.app | preview deploy (git push, branch `grok/detail-pass`) | `7b30c23` | Grok | Yes — Vercel status Ready |
| 2026-10-24 | Preview deploy of structural Design B site sweep: bim-website-g3slnwfap-camps-for-kids-idaho.vercel.app (branch alias bim-website-git-grok-site-sweep-camps-for-kids-idaho.vercel.app) | preview deploy (git push, branch `grok/site-sweep`) | `97b45f9` (+ ledger `b77202b`) | Grok | Yes — Vercel status Ready |
| 2026-10-23 | Preview deploy of design B site-wide: bim-website-izj7babfq-camps-for-kids-idaho.vercel.app (branch alias bim-website-git-grok-design-b-camps-for-kids-idaho.vercel.app) | preview deploy (git push, branch `grok/design-b`) | `0de5415` | Grok | Yes — Vercel status Ready |
| 2026-10-23 | Preview deploy adding concept D at `/concepts/d` (noindex) on bim-website-git-grok-design-concepts-camps-for-kids-idaho.vercel.app | preview deploy (git push, branch `grok/design-concepts`) | `78e9f27` | Grok | See WORKLOG / Vercel status |
| 2026-10-23 | Preview deploy of homepage design concepts (`/concepts`, noindex): bim-website-git-grok-design-concepts-camps-for-kids-idaho.vercel.app | preview deploy (git push, branch `grok/design-concepts`) | `b1d521c` | Grok | Yes — Vercel status Ready |
| 2026-10-23 | Preview deploy of staff-answer content updates: bim-website-b8s4q8pqm-camps-for-kids-idaho.vercel.app | preview deploy (git push) | `cd4e5fe` | Grok | Yes — Vercel status Ready |
| 2026-10-21 | Preview env vars `MAILJET_API_KEY`, `MAILJET_SECRET_KEY`, `CONTACT_FROM`, `CONTACT_TO` added (Preview, branch `astro-rebuild`) and preview redeployed: bim-website-55ple7m8t-camps-for-kids-idaho.vercel.app | env vars + preview deploy | `3726f78` | Grok | Yes — Mailjet test send to help@ received 2026-10-21 (sent via API, not the form) |
