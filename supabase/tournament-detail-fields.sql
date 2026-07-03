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
