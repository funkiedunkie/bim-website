create table if not exists public.event_rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event text not null default 'trunk-or-treat-2026',
  source text not null default 'site',
  name text not null,
  party_size text,
  email text,
  phone text,
  user_agent text,
  ip text
);
alter table public.event_rsvps enable row level security;
-- No policies: only the service role (server-side) can read/write.
