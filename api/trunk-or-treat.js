// Vercel Function: POST /api/trunk-or-treat
// Free Trunk or Treat RSVP → help@ via Mailjet (same keys as /api/contact).
// Env: MAILJET_API_KEY, MAILJET_SECRET_KEY, CONTACT_FROM; optional CONTACT_TO.
const TO_DEFAULT = 'help@bodiesinmotionidaho.com'
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
    res.setHeader('Location', `/trunk-or-treat?status=${ok ? 'sent' : 'error'}`)
    return res.end()
  }
  if (req.method !== 'POST') return res.status(405).setHeader('Allow', 'POST').end()

  let b
  try { b = await readBody(req) } catch { return done(400, false, 'Invalid request') }
  if (b.company) return done(200, true, 'Thanks!') // honeypot

  const name = String(b.name || '').trim().slice(0, 120)
  const howManyRaw = String(b.howMany || b.how_many || '').trim().slice(0, 40)
  const email = String(b.email || '').trim().slice(0, 200)
  const phone = String(b.phone || '').trim().slice(0, 40)
  const note = String(b.message || '').trim().slice(0, 2000)

  if (!name) return done(400, false, 'Please enter your name.')
  const howMany = howManyRaw.replace(/[^\d]/g, '')
  if (!howMany || Number(howMany) < 1 || Number(howMany) > 99) {
    return done(400, false, 'Please enter how many people are coming (1–99).')
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return done(400, false, 'Please enter a valid email, or leave it blank.')
  }

  const key = process.env.MAILJET_API_KEY
  const secret = process.env.MAILJET_SECRET_KEY
  const fromRaw = process.env.CONTACT_FROM
  if (!key || !secret || !fromRaw) return done(503, false, 'Form delivery is not configured yet.')
  const m = fromRaw.match(/^\s*(?:"?([^"<]*?)"?\s*)?<([^>]+)>\s*$/)
  const from = m ? { Email: m[2].trim(), Name: (m[1] || 'Bodies in Motion Website').trim() } : { Email: fromRaw.trim(), Name: 'Bodies in Motion Website' }

  const lines = [
    `Name: ${name}`,
    `How many coming: ${howMany}`,
    `Email: ${email || '(not provided)'}`,
    `Phone: ${phone || '(not provided)'}`,
    '',
    'Event: Free Trunk or Treat — Thu Oct 30, 2026, 6:00–8:00 PM',
    'Location: Bodies in Motion, 729 W. Diamond St, Boise, ID 83705',
    note ? `\nNote:\n${note}` : '',
  ].filter((x) => x !== undefined)
  const text = lines.join('\n')
  const html = `<p><b>Name:</b> ${esc(name)}<br><b>How many coming:</b> ${esc(howMany)}<br><b>Email:</b> ${esc(email || '(not provided)')}<br><b>Phone:</b> ${esc(phone || '(not provided)')}</p><p><b>Event:</b> Free Trunk or Treat — Thu Oct 30, 2026, 6:00–8:00 PM<br><b>Location:</b> Bodies in Motion, 729 W. Diamond St, Boise, ID 83705</p>${note ? `<p>${esc(note).replace(/\n/g, '<br>')}</p>` : ''}`

  try {
    const r = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: { Authorization: 'Basic ' + Buffer.from(`${key}:${secret}`).toString('base64'), 'Content-Type': 'application/json' },
      body: JSON.stringify({ Messages: [{
        From: from,
        To: [{ Email: process.env.CONTACT_TO || TO_DEFAULT }],
        ...(email ? { ReplyTo: { Email: email, Name: name } } : {}),
        Subject: `Trunk or Treat RSVP: ${name} (${howMany} coming)`,
        TextPart: text,
        HTMLPart: html,
        CustomID: 'bim-website-trunk-or-treat',
      }] }),
    })
    const j = await r.json().catch(() => ({}))
    if (!r.ok || j?.Messages?.[0]?.Status !== 'success') return done(502, false, 'Delivery failed.')
  } catch { return done(502, false, 'Delivery failed.') }
  return done(200, true, 'Thanks! You’re on the list.')
}
