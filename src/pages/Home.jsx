import { Link } from 'react-router-dom'
import heroImg from '../assets/hero.png'
import './Home.css'

const tickerItems = [
  'Ninja Warrior', 'Fitness Classes', 'Pickleball', 'Ropes Course',
  'Birthday Parties', 'Open Play', 'Preschool', 'After School Care',
  'Infant & Toddler Care', 'Camps', "Parents' Night Out", 'Team Building',
  'Flatbread Cafe', 'Ninja Warrior', 'Fitness Classes', 'Pickleball',
  'Ropes Course', 'Birthday Parties', 'Open Play', 'Preschool',
  'After School Care', 'Infant & Toddler Care', 'Camps', "Parents' Night Out",
  'Team Building', 'Flatbread Cafe',
]

const activities = [
  {
    icon: '🥷',
    name: 'Ninja Warrior',
    desc: 'Conquer epic obstacle courses designed for all skill levels.',
    to: '/ninja-warrior',
  },
  {
    icon: '🏋️',
    name: 'Fitness Classes',
    desc: 'Group classes from HIIT to yoga — all ages and abilities welcome.',
    to: '/fitness-classes',
  },
  {
    icon: '🏓',
    name: 'Pickleball',
    desc: 'Indoor courts available daily. Drop-in, leagues, and lessons.',
    to: '/pickleball',
  },
  {
    icon: '🧗',
    name: 'Ropes Course',
    desc: 'High-ropes adventure that builds confidence and teamwork.',
    to: '/ropes-course',
  },
  {
    icon: '🎂',
    name: 'Birthday Parties',
    desc: 'Unforgettable parties with exclusive use of our best attractions.',
    to: '/birthday-parties',
  },
  {
    icon: '🏫',
    name: 'Preschool & Care',
    desc: 'Licensed childcare and enrichment programs for little ones.',
    to: '/preschool',
  },
  {
    icon: '🎪',
    name: 'Open Play',
    desc: 'Unlimited access to all open-play zones for the whole family.',
    to: '/open-play',
  },
  {
    icon: '🍕',
    name: 'Flatbread Cafe',
    desc: 'Fuel up with fresh flatbreads, smoothies, and snacks on-site.',
    to: '#',
  },
]

const valueCards = [
  {
    label: 'Core Values',
    title: 'Movement is medicine.',
    text: 'We believe active bodies spark curious minds. Every program is designed with purpose — to move, challenge, and connect.',
  },
  {
    label: 'Purpose',
    title: 'Built for every body.',
    text: 'From crawlers to seniors, our 50,000 sq ft facility was built so that no age, size, or skill level is left out.',
  },
  {
    label: 'Promise',
    title: 'Safe. Fun. Unforgettable.',
    text: 'We promise a clean, safe, and expertly staffed environment where families can trust us with what matters most.',
  },
]

const reviews = [
  {
    initials: 'JM',
    name: 'Jessica M.',
    meta: 'Member since 2022',
    quote: '"We drive 45 minutes just to come here. The Ninja Warrior course alone is worth it — my kids talk about it for weeks. The staff genuinely cares and it shows."',
  },
  {
    initials: 'TR',
    name: 'Tyler R.',
    meta: 'Birthday party host',
    quote: '"Hosted my daughter\'s 7th birthday here and it was flawless. The party coordinator handled everything. Every kid left sweaty, exhausted, and absolutely thrilled."',
  },
  {
    initials: 'AS',
    name: 'Amanda S.',
    meta: 'Fitness class regular',
    quote: '"I\'ve tried a dozen gyms in Boise. None compare to the community here. The fitness instructors are world-class and everyone feels welcome regardless of fitness level."',
  },
]

function StarIcon() {
  return (
    <svg className="review-card__star" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

export default function Home() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section className="hero">
        <div className="hero__bg" style={{ backgroundImage: `url(${heroImg})` }} />
        <div className="hero__gradient" />
        <div className="hero__inner">
          <div className="hero__content">
            <div className="hero__eyebrow">
              <span className="hero__eyebrow-dot" />
              Now open in Boise, Idaho
            </div>
            <h1 className="hero__headline">
              Where families<br />come alive<em>.</em>
            </h1>
            <p className="hero__sub">
              50,000 sq ft of Ninja Warrior, fitness, pickleball, ropes courses, open play, childcare, and more — all under one roof.
            </p>
            <div className="hero__buttons">
              <Link to="/open-play" className="btn-primary">
                Explore Programs
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
              <Link to="/waiver" className="btn-outline">
                Sign a Waiver
              </Link>
            </div>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <div className="hero__stat-number">12<span>+</span></div>
              <div className="hero__stat-label">Activities</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-number">All<span> Ages</span></div>
              <div className="hero__stat-label">Welcome</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-number">1</div>
              <div className="hero__stat-label">Roof</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Ticker ── */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {/* Duplicate for seamless loop */}
          {[0, 1].map((set) => (
            <div key={set} className="ticker__content">
              {tickerItems.slice(0, 13).map((item, i) => (
                <span key={`${set}-${i}`}>
                  <span className="ticker__item">{item}</span>
                  <span className="ticker__dot">●</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. Activity Grid ── */}
      <section className="activities">
        <div className="activities__inner">
          <div className="section-header">
            <p className="section-eyebrow">What We Offer</p>
            <h2 className="section-title">Something for everyone.</h2>
            <p className="section-sub">
              From high-flying ninja obstacles to cozy cafe seating, every corner of our facility is designed with families in mind.
            </p>
          </div>
          <div className="activities__grid">
            {activities.map((a) => (
              <Link key={a.name} to={a.to} className="activity-card">
                <div className="activity-card__icon">{a.icon}</div>
                <div className="activity-card__name">{a.name}</div>
                <div className="activity-card__desc">{a.desc}</div>
                <span className="activity-card__arrow">
                  Learn more <ArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Values ── */}
      <section className="values">
        <div className="values__inner">
          <div className="section-header">
            <p className="section-eyebrow">Who We Are</p>
            <h2 className="section-title">Built on more than fun.</h2>
            <p className="section-sub">
              Our core values, purpose, and promise shape every program, every hire, and every experience inside these walls.
            </p>
          </div>
          <div className="values__grid">
            {valueCards.map((v) => (
              <div key={v.label} className="value-card">
                <div className="value-card__bg" />
                <div className="value-card__overlay" />
                <div className="value-card__content">
                  <p className="value-card__label">{v.label}</p>
                  <h3 className="value-card__title">{v.title}</h3>
                  <p className="value-card__text">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Photo Strip ── */}
      <div className="photo-strip" aria-hidden="true">
        <div className="photo-strip__item">
          <img src="/strip1.jpg" alt="Ninja warrior course" loading="lazy" />
        </div>
        <div className="photo-strip__item">
          <img src="/strip2.jpg" alt="Open play area" loading="lazy" />
        </div>
        <div className="photo-strip__item">
          <img src="/strip3.jpg" alt="Fitness classes" loading="lazy" />
        </div>
      </div>

      {/* ── 6. Reviews ── */}
      <section className="reviews">
        <div className="reviews__inner">
          <div className="section-header">
            <p className="section-eyebrow">What Families Say</p>
            <h2 className="section-title">Loved by Idaho families.</h2>
            <p className="section-sub">
              Don't take our word for it — hear from the hundreds of families who call Bodies in Motion their second home.
            </p>
          </div>
          <div className="reviews__grid">
            {reviews.map((r) => (
              <div key={r.name} className="review-card">
                <div className="review-card__stars">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                </div>
                <p className="review-card__quote">{r.quote}</p>
                <div className="review-card__author">
                  <div className="review-card__avatar">{r.initials}</div>
                  <div>
                    <p className="review-card__name">{r.name}</p>
                    <p className="review-card__meta">{r.meta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA Banner ── */}
      <section className="cta-banner">
        <div className="cta-banner__inner">
          <div className="cta-banner__text">
            <p className="cta-banner__eyebrow">Ready to Move?</p>
            <h2 className="cta-banner__headline">
              Your family's next adventure starts here.
            </h2>
            <p className="cta-banner__sub">
              Sign your waiver today and unlock access to everything Bodies in Motion has to offer. First visit? Bring the whole family.
            </p>
          </div>
          <div className="cta-banner__buttons">
            <Link to="/waiver" className="btn-white">
              Sign a Waiver
            </Link>
            <Link to="/contact" className="btn-white-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
