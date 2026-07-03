create table if not exists public.tournaments (
  id text primary key,
  name text not null,
  category text not null,
  status text not null check (status in ('Registration Open', 'Coming Soon', 'In Progress', 'Completed')),
  start_date date not null,
  end_date date not null,
  registration_deadline date not null,
  venue text not null,
  format text not null,
  fee text not null,
  description text not null,
  tournament_type text not null default 'adult' check (tournament_type in ('youth', 'adult')),
  location text not null default '',
  flyer_url text not null default '',
  highlights jsonb not null default '[]'::jsonb,
  structure jsonb not null default '[]'::jsonb,
  registration_url text not null default '',
  registration_label text not null default 'Register Now',
  created_at timestamptz not null default now()
);

create table if not exists public.teams (
  id text primary key,
  name text not null,
  captain_name text not null,
  captain_email text not null,
  captain_phone text not null,
  city text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.registrations (
  id text primary key,
  tournament_id text not null references public.tournaments(id) on delete cascade,
  team_name text not null,
  captain_name text not null,
  captain_email text not null,
  captain_phone text not null,
  city text not null,
  age_category text not null,
  roster_count integer not null check (roster_count > 0),
  notes text not null default '',
  status text not null default 'submitted' check (status in ('submitted', 'approved', 'waitlisted', 'declined')),
  created_at timestamptz not null default now()
);

create table if not exists public.grounds (
  id text primary key,
  name text not null,
  address text not null,
  city text not null,
  surface text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.ground_reservations (
  id text primary key,
  ground_id text not null references public.grounds(id) on delete cascade,
  tournament_id text not null references public.tournaments(id) on delete cascade,
  reservation_date date not null,
  start_time time not null,
  end_time time not null,
  assigned_teams text not null,
  status text not null default 'requested' check (status in ('requested', 'confirmed', 'conflict', 'released')),
  notes text not null default '',
  created_at timestamptz not null default now(),
  check (start_time < end_time)
);

create table if not exists public.contacts (
  id text primary key,
  name text not null,
  email text not null,
  phone text not null default '',
  topic text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id text primary key,
  registration_id text references public.registrations(id) on delete set null,
  team_name text not null,
  tournament_name text not null,
  amount text not null,
  method text not null,
  status text not null default 'pending' check (status in ('pending', 'received', 'waived', 'refunded')),
  reference text not null default '',
  created_at timestamptz not null default now()
);

alter table public.tournaments
  drop column if exists capacity,
  drop column if exists registered_teams;

alter table public.grounds
  drop column if exists capacity;

alter table public.tournaments
  add column if not exists tournament_type text not null default 'adult',
  add column if not exists location text not null default '',
  add column if not exists flyer_url text not null default '',
  add column if not exists highlights jsonb not null default '[]'::jsonb,
  add column if not exists structure jsonb not null default '[]'::jsonb,
  add column if not exists registration_url text not null default '',
  add column if not exists registration_label text not null default 'Register Now';

alter table public.tournaments
  drop constraint if exists tournaments_tournament_type_check;

alter table public.tournaments
  add constraint tournaments_tournament_type_check
  check (tournament_type in ('youth', 'adult'));

update public.tournaments
set
  location = case when location = '' then venue else location end,
  registration_label = case when registration_label = '' then 'Register Now' else registration_label end,
  highlights = case
    when jsonb_typeof(highlights) = 'array' then highlights
    else '[]'::jsonb
  end,
  structure = case
    when jsonb_typeof(structure) = 'array' then structure
    else '[]'::jsonb
  end;

alter table public.tournaments enable row level security;
alter table public.teams enable row level security;
alter table public.registrations enable row level security;
alter table public.grounds enable row level security;
alter table public.ground_reservations enable row level security;
alter table public.contacts enable row level security;
alter table public.payments enable row level security;

drop policy if exists "Public can read tournaments" on public.tournaments;
create policy "Public can read tournaments"
  on public.tournaments
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Public can read grounds" on public.grounds;
create policy "Public can read grounds"
  on public.grounds
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Public can submit registrations" on public.registrations;
create policy "Public can submit registrations"
  on public.registrations
  for insert
  to anon, authenticated
  with check (status = 'submitted');

drop policy if exists "Public can submit contacts" on public.contacts;
create policy "Public can submit contacts"
  on public.contacts
  for insert
  to anon, authenticated
  with check (status = 'new');

drop policy if exists "Admins can manage tournaments" on public.tournaments;
create policy "Admins can manage tournaments"
  on public.tournaments
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admins can manage teams" on public.teams;
create policy "Admins can manage teams"
  on public.teams
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admins can manage registrations" on public.registrations;
create policy "Admins can manage registrations"
  on public.registrations
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admins can manage grounds" on public.grounds;
create policy "Admins can manage grounds"
  on public.grounds
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admins can manage ground reservations" on public.ground_reservations;
create policy "Admins can manage ground reservations"
  on public.ground_reservations
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admins can manage contacts" on public.contacts;
create policy "Admins can manage contacts"
  on public.contacts
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admins can manage payments" on public.payments;
create policy "Admins can manage payments"
  on public.payments
  for all
  to authenticated
  using (true)
  with check (true);

insert into public.tournaments (
  id,
  name,
  category,
  status,
  start_date,
  end_date,
  registration_deadline,
  venue,
  format,
  fee,
  description,
  tournament_type,
  location,
  flyer_url,
  highlights,
  structure,
  registration_url,
  registration_label
) values
  (
    'seattle-open-2026',
    'NACC (Y) Seattle Open 2026',
    'Youth U11-U15',
    'Registration Open',
    '2026-07-18',
    '2026-07-22',
    '2026-07-10',
    'Monroe Cricket Complex & TollGate Fields, Washington',
    'U11 30 overs, U13 30 overs, U15 35 overs with draft-based U15 team selection',
    'U-15 player registration open',
    'A premier youth cricket championship bringing together top academies and teams from the United States and Canada for five days of competitive cricket on natural and hybrid turf wickets.',
    'youth',
    'Monroe, WA',
    '/tournaments/seattle-open-2026.jpeg',
    '["Five days of competitive cricket on natural and hybrid turf wickets.", "Premier turf grounds, neutral umpires, and national-level exposure.", "Balanced U-15 teams selected through the NACC Draft Process."]'::jsonb,
    '["U-11: Seattle academies are invited to field their teams.", "U-13: Four invited teams from the USA and Canada.", "U-15: Player registration is open with NACC Draft Process selection.", "U11 and U13 play 30 overs. U15 plays 35 overs.", "Four league matches followed by T20 positional matches and final."]'::jsonb,
    'https://forms.gle/M6YzjhhSHwYjiKki8',
    'Register U-15 Player'
  )
on conflict (id) do nothing;

insert into public.grounds (id, name, address, city, surface) values
  ('monroe-cricket-complex', 'Monroe Cricket Complex', '15532 Fryelands Blvd SE, Monroe, WA 98272', 'Monroe, WA', 'Hybrid turf wicket'),
  ('tollgate-fields', 'TollGate Fields', '1300 W North Bend Way, North Bend, WA 98045', 'North Bend, WA', 'Natural turf wicket')
on conflict (id) do nothing;
