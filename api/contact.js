// Vercel Function: POST /api/contact
// Delivers contact / info-request submissions to help@bodiesinmotionidaho.com via Resend's REST API (free tier).
// Env vars (set in Vercel project settings; TODO(Duncan)):
//   RESEND_API_KEY  - required; without it the endpoint returns 503 and the page falls back to mailto.
//   CONTACT_FROM    - verified sender, e.g. "Bodies in Motion Website <website@bodiesinmotionidaho.com>"
//   CONTACT_TO      - optional, defaults to help@bodiesinmotionidaho.com
const TO_DEFAULT = 'help@bodiesinmotionidaho.com'
const PROGRAMS = ['Infant & Toddler Care', 'Preschool', 'Before & After School Care', 'Camps', 'Birthday Parties', 'Other']
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body
  const chunks = []
  for await (const c of req) chunks.push(c)
  const raw = Buffer.concat(chunks).toString('utf8')
  const ct = req.headers['content-type'] || ''
  if (ct.includes('application/json')) return JSON.parse(raw || '{}')
  return Object.fromEntries(new URLSearchParams(raw))
}

export default async function handler(req, res) {
  const wantsJson = (req.headers.accept || '').includes('application/json')
  const done = (status, ok, msg) => {
    if (wantsJson) return res.status(status).json({ ok, message: msg })
    res.statusCode = 303
    res.setHeader('Location', `/contact?status=${ok ? 'sent' : 'error'}`)
    return res.end()
  }
  if (req.method !== 'POST') return res.status(405).setHeader('Allow', 'POST').end()

  let b
  try { b = await readBody(req) } catch { return done(400, false, 'Invalid request') }
  if (b.company) return done(200, true, 'Thanks!') // honeypot
  const name = String(b.name || '').trim().slice(0, 120)
  const email = String(b.email || '').trim().slice(0, 200)
  const phone = String(b.phone || '').trim().slice(0, 40)
  const program = PROGRAMS.includes(b.program) ? b.program : 'Other'
  const message = String(b.message || '').trim().slice(0, 5000)
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) return done(400, false, 'Please fill in name, a valid email and a message.')

  const key = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM
  if (!key || !from) return done(503, false, 'Form delivery is not configured yet.')

  const html = `<p><b>Name:</b> ${esc(name)}<br><b>Email:</b> ${esc(email)}<br><b>Phone:</b> ${esc(phone || '-')}<br><b>Program:</b> ${esc(program)}</p><p>${esc(message).replace(/\n/g, '<br>')}</p>`
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [process.env.CONTACT_TO || TO_DEFAULT], reply_to: email, subject: `Website inquiry: ${program} (${name})`, html }),
    })
    if (!r.ok) return done(502, false, 'Delivery failed.')
  } catch { return done(502, false, 'Delivery failed.') }
  return done(200, true, 'Thanks! We will get back to you soon.')
}
