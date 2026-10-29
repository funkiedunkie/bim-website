// Time-limited site items (nav links, RSVP forms). Static site, so expiry is enforced twice:
//  1. build time: isLive() drops/closes the item in any build after `expires`
//  2. client time: elements carry data-expires and <ExpiryScript /> hides them as soon as the
//     visitor's clock passes it (and shows matching data-after "closed" content).
// Test override: build with SITE_NOW=2026-10-31T07:00:00Z, or add ?now=2026-10-31T07:00:00Z to a URL.

export const TRUNK_OR_TREAT_EXPIRES = '2026-10-31T06:00:00Z' // Oct 31 00:00 America/Denver

export interface ExpiringNavItem {
  to: string
  label: string
  emoji?: string
  expires: string // ISO timestamp; hidden at/after this instant
}

export const expiringNavItems: ExpiringNavItem[] = [
  { to: '/trunk-or-treat', label: 'Trunk or Treat', emoji: '🎃', expires: TRUNK_OR_TREAT_EXPIRES },
]

export function buildNow(): number {
  const o = process.env.SITE_NOW
  return o && !Number.isNaN(Date.parse(o)) ? Date.parse(o) : Date.now()
}

export const isLive = (expires: string, now = buildNow()) => now < Date.parse(expires)

export const liveNavItems = () => expiringNavItems.filter((i) => isLive(i.expires))
