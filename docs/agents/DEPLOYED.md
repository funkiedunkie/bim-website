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
| 2026-10-21 | Preview env vars `MAILJET_API_KEY`, `MAILJET_SECRET_KEY`, `CONTACT_FROM`, `CONTACT_TO` added (Preview, branch `astro-rebuild`) and preview redeployed: bim-website-55ple7m8t-camps-for-kids-idaho.vercel.app | env vars + preview deploy | `3726f78` | Grok | Yes — Mailjet test send to help@ received 2026-10-21 (sent via API, not the form) |
