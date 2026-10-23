// Shared, fact-checked content for the /concepts homepage design explorations.
// Every fact is already on the rebuilt site (see src/pages/*.astro, src/lib/site.ts, src/lib/reviews.ts).
import { LINKS } from './site'
export { NAP, LICENSE_NUMBER, LINKS } from './site'

export const care = [
  { name: 'Infant & Toddler Care', ages: '6 weeks – 3 yrs', fact: '1 teacher for every 4 babies', to: '/infant-toddler-care', tour: LINKS.calendlyInfant },
  { name: 'Preschool', ages: 'Ages 3 – 6', fact: '8:1 ratio · kindergarten readiness', to: '/preschool', tour: LINKS.calendly30 },
  { name: 'Before & After School', ages: 'K – 6th grade', fact: 'Homework help, clubs & transportation from select Boise schools', to: '/after-school-care', tour: LINKS.calendly30 },
]

export const play = [
  { name: 'Camps', blurb: 'Summer, winter-break & holiday camps', to: '/camps' },
  { name: 'Ninja Warrior', blurb: 'Classes for ages 5–13 + open gym', to: '/ninja-warrior' },
  { name: 'Birthday Parties', blurb: 'Themed, super & adult parties', to: '/birthday-parties' },
  { name: 'Open Play', blurb: 'Giant play structure, four slides, coffee for parents', to: '/open-play' },
  { name: 'Ropes Course', blurb: 'A high aerial ropes adventure', to: '/ropes-course' },
  { name: 'Fitness', blurb: 'Kickboxing & strength training', to: '/fitness-classes' },
  { name: 'Pickleball', blurb: 'An indoor pickleball court', to: '/pickleball' },
  { name: 'Parents’ Night Out', blurb: 'Kids play, parents get the night', to: '/parents-night-out' },
]

// Verbatim reviews already published on the rebuilt site (approved by Duncan 2026-10-21).
export const reviews = [
  { quote: 'They know my whole family by first name including my little one who is only 2.', name: 'Rebecca Bout', source: 'Facebook' },
  { quote: 'Bodies in Motion has figured out how to make fitness fun for all abilities, ages and interests. My kids love this place and so do I.', name: 'Katy F.', source: '' },
  { quote: 'I swore Bodies in Motion was a franchise. I couldn’t believe how well ran the operation was. When I found out it’s locally owned, I was not surprised, but proud!', name: 'Sarah Marks', source: 'Email' },
  { quote: '…each time the customer service has been top-notch and the building (to include bathrooms) are always clean.', name: 'Brandi R', source: 'Google' },
]
