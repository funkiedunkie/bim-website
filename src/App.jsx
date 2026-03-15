import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'

const Placeholder = ({ name }) => (
  <div style={{
    padding: '140px 48px 100px',
    minHeight: '70vh',
    maxWidth: 900,
    margin: '0 auto',
  }}>
    <p style={{
      color: 'rgba(240,236,228,0.4)',
      fontSize: '0.75rem',
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      marginBottom: 16,
    }}>
      Bodies in Motion Idaho
    </p>
    <h1 style={{
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
      fontWeight: 800,
      letterSpacing: '-0.02em',
      color: '#f0ece4',
    }}>
      {name}
    </h1>
    <p style={{ color: 'rgba(240,236,228,0.45)', marginTop: 20, fontSize: '1.1rem' }}>
      This page is coming soon.
    </p>
  </div>
)

const routes = [
  { path: '/waiver',              name: 'Waiver' },
  { path: '/reviews',             name: 'Reviews' },
  { path: '/blog',                name: 'Blog' },
  { path: '/open-play',           name: 'Open Play' },
  { path: '/preschool',           name: 'Preschool' },
  { path: '/after-school-care',   name: 'After School Care' },
  { path: '/infant-toddler-care', name: 'Infant & Toddler Care' },
  { path: '/birthday-parties',    name: 'Birthday Parties' },
  { path: '/camps',               name: 'Camps' },
  { path: '/pickleball',          name: 'Pickleball' },
  { path: '/parents-night-out',   name: "Parents' Night Out" },
  { path: '/fitness-classes',     name: 'Fitness Classes' },
  { path: '/ninja-warrior',       name: 'Ninja Warrior' },
  { path: '/ropes-course',        name: 'Ropes Course' },
  { path: '/team-building',       name: 'Team Building' },
  { path: '/jobs',                name: 'Jobs' },
  { path: '/hours',               name: 'Hours' },
  { path: '/about',               name: 'About' },
  { path: '/contact',             name: 'Contact' },
]

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          {routes.map(({ path, name }) => (
            <Route key={path} path={path} element={<Placeholder name={name} />} />
          ))}
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
