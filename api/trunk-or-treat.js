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

// RSVPs close Oct 31 2026 00:00 America/Denver (keep in sync with src/lib/events.ts)
const CLOSES_AT = Date.parse('2026-10-31T06:00:00Z')
const CLOSED_MSG = 'Trunk or Treat RSVPs are closed. Thanks for coming — see you next year!'
// Durable copy in Supabase (optional, insert-only). Calls the SECURITY DEFINER RPC
// public.bim_submit_rsvp in project camp-register with the publishable/anon key; anon
// cannot read the table. Env: BIM_SUPABASE_URL, BIM_SUPABASE_ANON_KEY. Never blocks email.
async function saveRsvp(row) {
  const url = process.env.BIM_SUPABASE_URL, k = process.env.BIM_SUPABASE_ANON_KEY
  if (!url || !k) return
  try {
    const r = await fetch(`${url.replace(/\/$/, '')}/rest/v1/rpc/bim_submit_rsvp`, {
      method: 'POST',
      headers: { apikey: k, Authorization: `Bearer ${k}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        p_event: row.event, p_name: row.name, p_party_size: row.party_size,
        p_email: row.email, p_phone: row.phone, p_user_agent: row.user_agent,
      }),
      signal: AbortSignal.timeout(4000),
    })
    if (!r.ok) console.error('TRUNK_RSVP_DB_ERROR ' + r.status + ' ' + (await r.text()).slice(0, 300))
  } catch (e) { console.error('TRUNK_RSVP_DB_ERROR ' + (e?.message || e)) }
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
  if (Date.now() >= CLOSES_AT) {
    if (wantsJson) return res.status(410).json({ ok: false, closed: true, message: CLOSED_MSG })
    res.statusCode = 303
    res.setHeader('Location', '/trunk-or-treat?status=closed')
    return res.end()
  }

  let b
  try { b = await readBody(req) } catch { return done(400, false, 'Invalid request') }
  if (b.hp_field || b.company) return done(200, true, 'Thanks!') // honeypot

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

  // Structured log line so RSVPs can be pulled later from Vercel runtime logs
  // (search "TRUNK_RSVP"). No extra storage service needed.
  console.log('TRUNK_RSVP ' + JSON.stringify({ at: new Date().toISOString(), name, howMany: Number(howMany), email: email || null, phone: phone || null }))

  const saved = saveRsvp({
    event: 'trunk-or-treat-2026', name, party_size: howMany,
    email: email || null, phone: phone || null,
    user_agent: String(req.headers['user-agent'] || '').slice(0, 300) || null,
  })

  const key = process.env.MAILJET_API_KEY
  const secret = process.env.MAILJET_SECRET_KEY
  const fromRaw = process.env.CONTACT_FROM
  if (!key || !secret || !fromRaw) { await saved; return done(503, false, 'Form delivery is not configured yet.') }
  const m = fromRaw.match(/^\s*(?:"?([^"<]*?)"?\s*)?<([^>]+)>\s*$/)
  const from = m ? { Email: m[2].trim(), Name: (m[1] || 'Bodies in Motion Website').trim() } : { Email: fromRaw.trim(), Name: 'Bodies in Motion Website' }

  const lines = [
    `Name: ${name}`,
    `How many coming: ${howMany}`,
    `Email: ${email || '(not provided)'}`,
    `Phone: ${phone || '(not provided)'}`,
    '',
    'Event: Free Trunk or Treat — Fri Oct 30, 2026, 6:00–8:00 PM',
    'Location: Bodies in Motion, 729 W. Diamond St, Boise, ID 83705',
    note ? `\nNote:\n${note}` : '',
  ].filter((x) => x !== undefined)
  const text = lines.join('\n')
  const html = `<p><b>Name:</b> ${esc(name)}<br><b>How many coming:</b> ${esc(howMany)}<br><b>Email:</b> ${esc(email || '(not provided)')}<br><b>Phone:</b> ${esc(phone || '(not provided)')}</p><p><b>Event:</b> Free Trunk or Treat — Fri Oct 30, 2026, 6:00–8:00 PM<br><b>Location:</b> Bodies in Motion, 729 W. Diamond St, Boise, ID 83705</p>${note ? `<p>${esc(note).replace(/\n/g, '<br>')}</p>` : ''}`

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
    if (!r.ok || j?.Messages?.[0]?.Status !== 'success') { await saved; return done(502, false, 'Delivery failed.') }
  } catch { await saved; return done(502, false, 'Delivery failed.') }
  await saved
  return done(200, true, 'Thanks! You’re on the list.')
}
