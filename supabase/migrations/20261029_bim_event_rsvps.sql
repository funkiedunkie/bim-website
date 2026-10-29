-- Lives in Supabase project camp-register (ref rvlvlwpbndrsopsjwvku), shared with Camps for Kids Idaho.
-- Self-contained: touches no existing table/policy/function. Applied via MCP apply_migration "bim_event_rsvps".
-- Anon cannot read or write the table directly (RLS on, no policies); it can only call bim_submit_rsvp().
create table if not exists public.bim_event_rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event text not null,
  name text not null check (length(name) between 1 and 120),
  party_size text check (length(party_size) <= 60),
  email text check (length(email) <= 200),
  phone text check (length(phone) <= 40),
  source text not null default 'site',
  user_agent text,
  ip text
);
alter table public.bim_event_rsvps enable row level security;
revoke all on table public.bim_event_rsvps from anon, authenticated;
create index if not exists bim_event_rsvps_event_created_idx on public.bim_event_rsvps (event, created_at);

create or replace function public.bim_submit_rsvp(
  p_event text, p_name text, p_party_size text, p_email text, p_phone text, p_user_agent text
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_event is null or p_event not in ('trunk-or-treat-2026') then
    raise exception 'unknown event' using errcode = '22023';
  end if;
  insert into public.bim_event_rsvps (event, name, party_size, email, phone, source, user_agent)
  values (p_event, btrim(p_name), nullif(btrim(p_party_size), ''), nullif(btrim(p_email), ''),
          nullif(btrim(p_phone), ''), 'site', left(p_user_agent, 300));
end;
$$;
revoke all on function public.bim_submit_rsvp(text, text, text, text, text, text) from public, anon, authenticated;
grant execute on function public.bim_submit_rsvp(text, text, text, text, text, text) to anon;
