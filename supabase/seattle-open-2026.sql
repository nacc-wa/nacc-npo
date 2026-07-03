alter table public.tournaments
  add column if not exists tournament_type text not null default 'adult',
  add column if not exists location text not null default '',
  add column if not exists flyer_url text not null default '',
  add column if not exists highlights jsonb not null default '[]'::jsonb,
  add column if not exists structure jsonb not null default '[]'::jsonb,
  add column if not exists registration_url text not null default '',
  add column if not exists registration_label text not null default 'Register Now';

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
) values (
  'seattle-open-2026',
  'NACC (Y) Seattle Open 2026',
  'Youth U11-U15',
  'Registration Open',
  '2026-07-18',
  '2026-07-22',
  '2026-07-10',
  'Monroe Cricket Complex & TollGate Fields, Washington',
  'U11 30 overs, U13 30 overs, U15 35 overs',
  'U-15 player registration open',
  'A premier youth cricket championship bringing together top academies and teams from the United States and Canada for five days of competitive cricket on natural and hybrid turf wickets.',
  'youth',
  'Washington',
  '/tournaments/seattle-open-2026.jpeg',
  '["Five days of competitive cricket on natural and hybrid turf wickets.", "Premier turf grounds, neutral umpires, and national-level exposure.", "Balanced U-15 teams selected through the NACC Draft Process."]'::jsonb,
  '["U-11: Seattle academies are invited to field their teams.", "U-13: Four invited teams from the USA and Canada.", "U-15: Player registration is open with NACC Draft Process selection.", "U11 and U13 play 30 overs. U15 plays 35 overs.", "Four league matches followed by T20 positional matches and final."]'::jsonb,
  'https://forms.gle/M6YzjhhSHwYjiKki8',
  'Register U-15 Player'
)
on conflict (id) do update set
  name = excluded.name,
  category = excluded.category,
  status = excluded.status,
  start_date = excluded.start_date,
  end_date = excluded.end_date,
  registration_deadline = excluded.registration_deadline,
  venue = excluded.venue,
  format = excluded.format,
  fee = excluded.fee,
  description = excluded.description,
  tournament_type = excluded.tournament_type,
  location = excluded.location,
  flyer_url = excluded.flyer_url,
  highlights = excluded.highlights,
  structure = excluded.structure,
  registration_url = excluded.registration_url,
  registration_label = excluded.registration_label;

alter table public.grounds
  drop column if exists capacity;

insert into public.grounds (id, name, address, city, surface) values
  ('monroe-cricket-complex', 'Monroe Cricket Complex', '15532 Fryelands Blvd SE, Monroe, WA 98272', 'Monroe, WA', 'Hybrid turf wicket'),
  ('tollgate-fields', 'TollGate Fields', '1300 W North Bend Way, North Bend, WA 98045', 'North Bend, WA', 'Natural turf wicket')
on conflict (id) do update set
  name = excluded.name,
  address = excluded.address,
  city = excluded.city,
  surface = excluded.surface;
