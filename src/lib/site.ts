// Single source of truth for name/address/phone (NAP), URLs and JSON-LD builders.
// All facts come from the crawl of the live Weebly site (/workspace/bim-site/inventory).

export const SITE_URL = 'https://www.bodiesinmotionidaho.com'

export const NAP = {
  email: 'help@bodiesinmotionidaho.com',
  name: 'Bodies in Motion',
  street: '729 W. Diamond St',
  city: 'Boise',
  state: 'ID',
  zip: '83705',
  phoneDisplay: '(208) 381-0587',
  phoneTel: 'tel:+12083810587',
  phoneE164: '+12083810587',
  // Coordinates and place id taken from the Google Maps embed on the Weebly site.
  lat: 43.56817925792643,
  lng: -116.19230022434759,
} as const

export const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2890.841809157325!2d-116.19230022434759!3d43.56817925792643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54aef7f7cfe9119b%3A0x9018121aa163a2f0!2s729%20W%20Diamond%20St%2C%20Boise%2C%20ID%2083705!5e0!3m2!1sen!2sus!4v1791938202904!5m2!1sen!2sus'

export const LINKS = {
  calendlyInfant: 'https://calendly.com/bodiesinmotion1/infant-toddler-tour',
  calendly30: 'https://calendly.com/bodiesinmotion1/30min',
  // Calendly slugs verified in the raw HTML of the live Weebly pages (kids-birthday-parties, ninja-warrior-trial, kickboxing-trial).
  calendlyBirthday: 'https://calendly.com/bodiesinmotion1/birthday-party-rsvp',
  calendlyNinja58: 'https://calendly.com/bodiesinmotion1/ninja-warrior-trial-5-8-yrs-old',
  calendlyKickboxing: 'https://calendly.com/bodiesinmotion1/kickboxing',
  calendlyNinja9: 'https://calendly.com/bodiesinmotion1/ninja-warrior-trial-9-yrs-old',
  camps: 'https://www.campsforkidsidaho.com/camp',
  pnoRegister: 'https://www.campsforkidsidaho.com/camp/41',
  waiverPortal: 'https://bodiesinmotion.gymmasteronline.com/portal/enquiry',
} as const

// Social profiles linked from every page of the Weebly site.
// Confirmed by Duncan (2026-10-21).
export const SOCIAL = [
  { label: 'Facebook', href: 'https://www.facebook.com/bodiesinmotion/' },
  { label: 'Instagram', href: 'https://www.instagram.com/bodies_in_motion_idaho/' },
  { label: 'X (Twitter)', href: 'https://twitter.com/bodiesinmotion1' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UC9j0odw1B_Jw1jLxWo0qJDw' },
] as const

export const AREA_SERVED = ['Boise', 'Meridian', 'Garden City']

export interface FaqItem {
  q: string
  a: string
}

export function absoluteUrl(path: string) {
  return path === '/' ? `${SITE_URL}/` : SITE_URL + path.replace(/\/$/, '')
}

interface ChildCareOptions {
  /** Care hours, only where the Weebly page states them. */
  openingHours?: string[]
  description: string
}

export function childCareSchema({ openingHours, description }: ChildCareOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ChildCare',
    '@id': `${SITE_URL}/#childcare`,
    name: NAP.name,
    description,
    url: SITE_URL + '/',
    telephone: NAP.phoneE164,
    image: `${SITE_URL}/logo.png`,
    logo: `${SITE_URL}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: NAP.street,
      addressLocality: NAP.city,
      addressRegion: NAP.state,
      postalCode: NAP.zip,
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: NAP.lat, longitude: NAP.lng },
    areaServed: AREA_SERVED.map((name) => ({ '@type': 'City', name })),
    sameAs: SOCIAL.map((s) => s.href),
    ...(openingHours ? { openingHours } : {}),
  }
}

interface ActivityOptions {
  description: string
  /** Only pass hours that are sourced and not in conflict anywhere on the old site. */
  openingHoursSpecification?: object[]
}

/**
 * Business schema for the non-childcare activity pages (camps, parties, Parents' Night Out,
 * open play). Same NAP/areaServed/sameAs as the ChildCare node; no openingHours on purpose
 * (hours differ by program and season), except where a page passes sourced, non-conflicting hours.
 */
export function activityBusinessSchema({ description, openingHoursSpecification }: ActivityOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': ['EntertainmentBusiness', 'SportsActivityLocation'],
    '@id': `${SITE_URL}/#business`,
    name: NAP.name,
    description,
    url: SITE_URL + '/',
    telephone: NAP.phoneE164,
    image: `${SITE_URL}/logo.png`,
    logo: `${SITE_URL}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: NAP.street,
      addressLocality: NAP.city,
      addressRegion: NAP.state,
      postalCode: NAP.zip,
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: NAP.lat, longitude: NAP.lng },
    areaServed: AREA_SERVED.map((name) => ({ '@type': 'City', name })),
    sameAs: SOCIAL.map((s) => s.href),
    ...(openingHoursSpecification ? { openingHoursSpecification } : {}),
  }
}

/** ContactPage node for /contact; points at the business node emitted by activityBusinessSchema. */
export function contactPageSchema({ description }: ActivityOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE_URL}/contact#contactpage`,
    url: `${SITE_URL}/contact`,
    name: `Contact ${NAP.name}`,
    description,
    about: { '@id': `${SITE_URL}/#business` },
  }
}

interface EventOptions {
  name: string
  description: string
  startDate: string
  endDate: string
  url: string
  price: string
  typicalAgeRange: string
}

/** Only call this for events that have a concrete date/time in the source. */
export function eventSchema({ name, description, startDate, endDate, url, price, typicalAgeRange }: EventOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    startDate,
    endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    typicalAgeRange,
    image: `${SITE_URL}/logo.png`,
    location: {
      '@type': 'Place',
      name: NAP.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: NAP.street,
        addressLocality: NAP.city,
        addressRegion: NAP.state,
        postalCode: NAP.zip,
        addressCountry: 'US',
      },
    },
    organizer: { '@type': 'Organization', name: NAP.name, url: SITE_URL + '/' },
    offers: { '@type': 'Offer', url, price, priceCurrency: 'USD' },
  }
}

/** AboutPage node for /about; the founders and founding date come from the old About page. */
export function aboutPageSchema({ description }: ActivityOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${SITE_URL}/about#aboutpage`,
    url: `${SITE_URL}/about`,
    name: `About ${NAP.name}`,
    description,
    mainEntity: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: NAP.name,
      url: SITE_URL + '/',
      logo: `${SITE_URL}/logo.png`,
      telephone: NAP.phoneE164,
      email: NAP.email,
      // "In January of 2011, Duncan and Rachel closed their martial art school ... and re-opened it in Bodies in Motion."
      foundingDate: '2011-01',
      founder: [
        { '@type': 'Person', name: 'Duncan Richardson', jobTitle: 'Owner' },
        { '@type': 'Person', name: 'Rachel Richardson', jobTitle: 'Owner' },
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: NAP.street,
        addressLocality: NAP.city,
        addressRegion: NAP.state,
        postalCode: NAP.zip,
        addressCountry: 'US',
      },
      areaServed: AREA_SERVED.map((name) => ({ '@type': 'City', name })),
      sameAs: SOCIAL.map((s) => s.href),
    },
  }
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}
