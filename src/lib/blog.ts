// Helpers shared by the blog listing and post pages.
import { ENTITY_ID, NAP, SITE_URL } from './site'

/** "Oct 21, 2026". Dates are stored as UTC midnight, so format in UTC to avoid off-by-one days. */
export function shortDate(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
}

export const isoDate = (date: Date) => date.toISOString().slice(0, 10)

export const postPath = (slug: string) => `/blog/${slug}`

/** End-of-post call to action, keyed by the first entry of a post's relatedPages. */
export const CTAS: Record<string, { heading: string; text: string; label: string }> = {
  '/camps': { heading: 'Ready to pick a camp?', text: 'See camp dates, ages and prices, then register through Camps for Kids Idaho.', label: 'See our camps' },
  '/preschool': { heading: 'Curious about our preschool?', text: 'Preschool for ages 3–6 in Boise. Schedule a tour and see a class in action.', label: 'Explore preschool' },
  '/infant-toddler-care': { heading: 'Looking for infant or toddler care?', text: 'Small classrooms for ages 6 weeks to 36 months in Boise. Book a tour.', label: 'Explore infant & toddler care' },
  '/after-school-care': { heading: 'Need before or after school care?', text: 'Care before and after school in Boise, with homework help, clubs and transportation from Boise schools.', label: 'Explore after-school care' },
  '/birthday-parties': { heading: 'Planning a birthday party?', text: 'Kids, teen and adult birthday parties in Boise. See packages and book.', label: 'See birthday parties' },
  '/parents-night-out': { heading: 'Want a night out?', text: 'Drop the kids off for an evening of games and dinner. See the next event.', label: 'See Parents’ Night Out' },
  '/open-play': { heading: 'Come play with us', text: 'A giant indoor play structure with four slides, plus free wifi and coffee for parents.', label: 'See open play' },
  '/ninja-warrior': { heading: 'Want to try Ninja Warrior?', text: 'Kids Ninja Warrior classes for ages 5–13, with a free 30-minute trial.', label: 'See Ninja Warrior classes' },
  '/ropes-course': { heading: 'Ready to climb?', text: 'A high aerial ropes course for kids, families and groups in Boise.', label: 'See the ropes course' },
  '/team-building': { heading: 'Planning a team outing?', text: 'Team building workshops for groups of 4 to 60 on our ropes and Ninja Warrior courses.', label: 'See team building' },
  '/fitness-classes': { heading: 'Ready to get moving?', text: 'Kickboxing and bootcamp fitness classes in Boise.', label: 'See fitness classes' },
  '/contact': { heading: 'Questions? Let’s talk.', text: 'Call, email or send us a message and we will help you find the right program.', label: 'Contact us' },
}

export const ctaFor = (relatedPages: string[]) => CTAS[relatedPages[0]] ?? CTAS['/contact']

export const publisher = {
  '@type': 'Organization',
  '@id': ENTITY_ID,
  name: NAP.name,
  url: SITE_URL + '/',
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
}

interface PostSchemaOptions {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified: string
  image?: string
}

export function blogPostingSchema({ title, description, url, datePublished, dateModified, image }: PostSchemaOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#blogposting`,
    headline: title,
    description,
    url,
    datePublished,
    dateModified,
    inLanguage: 'en-US',
    ...(image ? { image } : {}),
    author: { '@type': 'Organization', '@id': ENTITY_ID, name: NAP.name, url: SITE_URL + '/' },
    publisher,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }
}
