# Deploy ledger — what is actually live

GitHub shows what is *committed*, not what is *live*. Vercel builds previews from branch pushes, env vars and redeploys are changed outside git, and DNS lives at GoDaddy. So this file is the record.

## The rule

Every agent that deploys, redeploys, changes Vercel env vars or project settings, changes DNS, or applies a migration adds a row below **in the same session**, newest first, and mentions it in its `WORKLOG.md` entry. Production deploys and DNS changes need Duncan's explicit OK first.

Never paste secrets here; env vars are listed by name only.

## Current state (2026-10-21)

- **Production:** bodiesinmotionidaho.com is still served by Weebly. GoDaddy DNS untouched.
- **Preview:** branch `astro-rebuild` (PR #1) on Vercel team `camps-for-kids-idaho`, project `bim-website`. Needs a Vercel login to view.

## Log (newest first)

| Date | What | Kind | Commit | By | Verified live? |
|---|---|---|---|---|---|
| 2026-10-24 | Preview deploy of multi-image PhotoGallery restore (14 program pages): bim-website-git-grok-restore-images-camps-for-kids-idaho.vercel.app | preview deploy (git push, branch `grok/restore-images`) | `e1c8558` (+ ledger `04e3138`) | Grok | Yes — Vercel status Ready |
| 2026-10-24 | Preview deploy of detail pass (real BIM logo + photo polish): bim-website-git-grok-detail-pass-camps-for-kids-idaho.vercel.app | preview deploy (git push, branch `grok/detail-pass`) | `7b30c23` | Grok | Yes — Vercel status Ready |
| 2026-10-24 | Preview deploy of structural Design B site sweep: bim-website-g3slnwfap-camps-for-kids-idaho.vercel.app (branch alias bim-website-git-grok-site-sweep-camps-for-kids-idaho.vercel.app) | preview deploy (git push, branch `grok/site-sweep`) | `97b45f9` (+ ledger `b77202b`) | Grok | Yes — Vercel status Ready |
| 2026-10-23 | Preview deploy of design B site-wide: bim-website-izj7babfq-camps-for-kids-idaho.vercel.app (branch alias bim-website-git-grok-design-b-camps-for-kids-idaho.vercel.app) | preview deploy (git push, branch `grok/design-b`) | `0de5415` | Grok | Yes — Vercel status Ready |
| 2026-10-23 | Preview deploy adding concept D at `/concepts/d` (noindex) on bim-website-git-grok-design-concepts-camps-for-kids-idaho.vercel.app | preview deploy (git push, branch `grok/design-concepts`) | `78e9f27` | Grok | See WORKLOG / Vercel status |
| 2026-10-23 | Preview deploy of homepage design concepts (`/concepts`, noindex): bim-website-git-grok-design-concepts-camps-for-kids-idaho.vercel.app | preview deploy (git push, branch `grok/design-concepts`) | `b1d521c` | Grok | Yes — Vercel status Ready |
| 2026-10-23 | Preview deploy of staff-answer content updates: bim-website-b8s4q8pqm-camps-for-kids-idaho.vercel.app | preview deploy (git push) | `cd4e5fe` | Grok | Yes — Vercel status Ready |
| 2026-10-21 | Preview env vars `MAILJET_API_KEY`, `MAILJET_SECRET_KEY`, `CONTACT_FROM`, `CONTACT_TO` added (Preview, branch `astro-rebuild`) and preview redeployed: bim-website-55ple7m8t-camps-for-kids-idaho.vercel.app | env vars + preview deploy | `3726f78` | Grok | Yes — Mailjet test send to help@ received 2026-10-21 (sent via API, not the form) |
