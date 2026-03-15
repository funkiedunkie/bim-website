import { Link } from 'react-router-dom'
import './Footer.css'

const programs = [
  { to: '/ninja-warrior',     label: 'Ninja Warrior' },
  { to: '/fitness-classes',   label: 'Fitness Classes' },
  { to: '/pickleball',        label: 'Pickleball' },
  { to: '/ropes-course',      label: 'Ropes Course' },
  { to: '/birthday-parties',  label: 'Birthday Parties' },
  { to: '/camps',             label: 'Camps' },
  { to: '/parents-night-out', label: "Parents' Night Out" },
  { to: '/team-building',     label: 'Team Building' },
]

const care = [
  { to: '/open-play',           label: 'Open Play' },
  { to: '/preschool',           label: 'Preschool' },
  { to: '/after-school-care',   label: 'After School Care' },
  { to: '/infant-toddler-care', label: 'Infant & Toddler Care' },
]

const company = [
  { to: '/about',   label: 'About Us' },
  { to: '/blog',    label: 'Blog' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/jobs',    label: 'Careers' },
  { to: '/contact', label: 'Contact' },
  { to: '/waiver',  label: 'Sign a Waiver' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <img src="/logo.png" alt="Bodies in Motion Idaho" />
            </Link>
            <p className="footer__tagline">
              Idaho's premier family fitness &amp; activity center — where every age moves, plays, and thrives.
            </p>
            <div className="footer__social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Facebook">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="TikTok">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.7a8.16 8.16 0 0 0 4.77 1.52V6.79a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <p className="footer__col-title">Programs</p>
            <ul className="footer__col-links">
              {programs.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="footer__col-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Care & Play */}
          <div>
            <p className="footer__col-title">Care &amp; Play</p>
            <ul className="footer__col-links">
              {care.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="footer__col-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="footer__col-title">Company</p>
            <ul className="footer__col-links">
              {company.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="footer__col-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Contact */}
          <div>
            <p className="footer__col-title">Hours &amp; Contact</p>
            <div className="footer__hours-item">
              <p className="footer__hours-label">Mon – Fri</p>
              <p className="footer__hours-value">6:00 AM – 9:00 PM</p>
            </div>
            <div className="footer__hours-item">
              <p className="footer__hours-label">Saturday</p>
              <p className="footer__hours-value">8:00 AM – 8:00 PM</p>
            </div>
            <div className="footer__hours-item">
              <p className="footer__hours-label">Sunday</p>
              <p className="footer__hours-value">9:00 AM – 6:00 PM</p>
            </div>
            <div className="footer__hours-item">
              <p className="footer__hours-label">Phone</p>
              <a href="tel:+12085550100" className="footer__hours-value footer__contact-accent">(208) 555-0100</a>
            </div>
            <div className="footer__hours-item">
              <p className="footer__hours-label">Address</p>
              <p className="footer__hours-value">1234 Motion Blvd<br />Boise, ID 83702</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(240,236,228,0.07)', padding: '0 40px' }}>
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} Bodies in Motion Idaho. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <Link to="/privacy" className="footer__bottom-link">Privacy Policy</Link>
            <Link to="/terms"   className="footer__bottom-link">Terms of Use</Link>
            <Link to="/waiver"  className="footer__bottom-link">Waiver</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
