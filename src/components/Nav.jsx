import { Link } from 'react-router-dom'
import './Nav.css'

const programLinks = [
  { to: '/ninja-warrior',       label: 'Ninja Warrior' },
  { to: '/fitness-classes',     label: 'Fitness Classes' },
  { to: '/pickleball',          label: 'Pickleball' },
  { to: '/ropes-course',        label: 'Ropes Course' },
  { to: '/birthday-parties',    label: 'Birthday Parties' },
  { to: '/camps',               label: 'Camps' },
  { to: '/parents-night-out',   label: "Parents' Night Out" },
  { to: '/team-building',       label: 'Team Building' },
  null, // divider
  { to: '/open-play',           label: 'Open Play' },
  { to: '/preschool',           label: 'Preschool' },
  { to: '/after-school-care',   label: 'After School Care' },
  { to: '/infant-toddler-care', label: 'Infant & Toddler Care' },
]

export default function Nav() {
  return (
    <nav className="nav" role="navigation" aria-label="Main navigation">
      <div className="nav__inner">
        <Link to="/" className="nav__logo">
          <img src="/logo.png" alt="Bodies in Motion Idaho" />
        </Link>

        <div className="nav__links">
          {/* Programs dropdown */}
          <div className="nav__dropdown">
            <span className="nav__dropdown-trigger">
              Programs
              <svg className="nav__dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
            <div className="nav__dropdown-menu">
              {programLinks.map((item, i) =>
                item === null
                  ? <div key={`div-${i}`} className="nav__dropdown-divider" />
                  : <Link key={item.to} to={item.to} className="nav__dropdown-item">{item.label}</Link>
              )}
            </div>
          </div>

          <Link to="/waiver"  className="nav__link">Waiver</Link>
          <Link to="/about"   className="nav__link">About</Link>
          <Link to="/reviews" className="nav__link">Reviews</Link>
          <Link to="/blog"    className="nav__link">Blog</Link>
        </div>

        <div className="nav__actions">
          <Link to="/login"    className="nav__login">Log In</Link>
          <Link to="/waiver"   className="nav__join">Join Now</Link>
        </div>

        <button className="nav__mobile-toggle" aria-label="Open menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="3" y1="6"  x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </nav>
  )
}
