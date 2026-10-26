// Vercel Function: POST /api/contact
// Delivers contact / info-request submissions to help@bodiesinmotionidaho.com via Mailjet's Send API v3.1.
// Env vars (set in Vercel project settings; TODO(Duncan)):
//   MAILJET_API_KEY, MAILJET_SECRET_KEY - required; without them the endpoint returns 503 and the page falls back to mailto.
//   CONTACT_FROM - sender already validated in Mailjet, e.g. "Bodies in Motion Website <website@bodiesinmotionidaho.com>" or a bare address
//   CONTACT_TO   - optional, defaults to help@bodiesinmotionidaho.com
const TO_DEFAULT = 'help@bodiesinmotionidaho.com'
const PROGRAMS = ['Infant & Toddler Care', 'Preschool', 'Before & After School Care', 'Camps', 'Birthday Parties', 'Team Building', 'Tour', 'Waitlist', 'Other']
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
  // Tour / waitlist requests (homepage concept D) send extra structured fields; fold them into the message.
  const extra = [['Interested in', b.tour_program], ["Child's age / due date", b.child_age], ['Preferred tour time', b.tour_time], ['Desired start date', b.start_date]]
    .filter(([, v]) => v && String(v).trim()).map(([k, v]) => `${k}: ${String(v).trim().slice(0, 200)}`).join('\n')
  const note = String(b.message || '').trim().slice(0, 5000)
  const message = (program === 'Tour' || program === 'Waitlist') ? [extra, note].filter(Boolean).join('\n\n') || '(no details)' : note
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) return done(400, false, 'Please fill in name, a valid email and a message.')

  const key = process.env.MAILJET_API_KEY
  const secret = process.env.MAILJET_SECRET_KEY
  const fromRaw = process.env.CONTACT_FROM
  if (!key || !secret || !fromRaw) return done(503, false, 'Form delivery is not configured yet.')
  const m = fromRaw.match(/^\s*(?:"?([^"<]*?)"?\s*)?<([^>]+)>\s*$/)
  const from = m ? { Email: m[2].trim(), Name: (m[1] || 'Bodies in Motion Website').trim() } : { Email: fromRaw.trim(), Name: 'Bodies in Motion Website' }

  const html = `<p><b>Name:</b> ${esc(name)}<br><b>Email:</b> ${esc(email)}<br><b>Phone:</b> ${esc(phone || '-')}<br><b>Program:</b> ${esc(program)}</p><p>${esc(message).replace(/\n/g, '<br>')}</p>`
  const text = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '-'}\nProgram: ${program}\n\n${message}`
  try {
    const r = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: { Authorization: 'Basic ' + Buffer.from(`${key}:${secret}`).toString('base64'), 'Content-Type': 'application/json' },
      body: JSON.stringify({ Messages: [{
        From: from,
        To: [{ Email: process.env.CONTACT_TO || TO_DEFAULT }],
        ReplyTo: { Email: email, Name: name },
        Subject: `Website inquiry: ${program} (${name})`,
        TextPart: text,
        HTMLPart: html,
        CustomID: 'bim-website-contact',
      }] }),
    })
    const j = await r.json().catch(() => ({}))
    if (!r.ok || j?.Messages?.[0]?.Status !== 'success') return done(502, false, 'Delivery failed.')
  } catch { return done(502, false, 'Delivery failed.') }
  return done(200, true, 'Thanks! We will get back to you soon.')
}
