-- Additional 2026 NACC tournament data found from public NACC Facebook posts.
-- Reviewed on 2026-07-03 from:
-- https://www.facebook.com/profile.php?id=61573313459360
--
-- Notes:
-- - Seattle Open 2026 is already managed in schema.sql/seattle-open-2026.sql.
-- - Facebook access exposed public posts back to April 2026 before the login wall blocked deeper review.
-- - Masters T100 dates were corrected from organizer feedback after the Facebook review.

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
    'nacc-masters-t100-2026',
    'NACC Masters T100 League 2026',
    'Masters 40+',
    'In Progress',
    '2026-05-04',
    '2026-07-31',
    '2026-05-01',
    'Bellevue, Washington',
    'T100 tournament for Masters 40+, played Mondays and Fridays',
    '$1600 registration fee',
    'A Masters 40+ T100 league announced by NACC for the Seattle area, running from May through July 2026.',
    'adult',
    'Bellevue, WA',
    '/tournaments/masters-t100-2026.jpg',
    '["Masters 40+ competition.", "T100 tournament format.", "Runs from May 4 through July 31, 2026.", "$1600 registration fee."]'::jsonb,
    '["Registration closed May 1, 2026.", "Tournament began May 4, 2026.", "Event runs through July 31, 2026.", "Match days were listed as Mondays and Fridays."]'::jsonb,
    '',
    'Registration Closed'
  ),
  (
    'nacc-super-league-2026',
    'NACC Super League T20 2026',
    'Adult T20',
    'Completed',
    '2026-03-07',
    '2026-04-25',
    '2026-03-07',
    'Klahanie Park and Forsgren Park, Issaquah, WA',
    'T20 league',
    '$1500 registration fee',
    'A completed NACC Super League T20 tournament hosted in Issaquah, Washington at Klahanie Park and Forsgren Park.',
    'adult',
    'Issaquah, WA',
    '/tournaments/super-league-2026.jpg',
    '["Adult T20 league.", "Hosted in Issaquah, Washington.", "Grounds: Klahanie Park and Forsgren Park.", "$1500 registration fee."]'::jsonb,
    '["Tournament started March 7, 2026.", "Tournament completed April 25, 2026.", "Matches were hosted across Klahanie Park and Forsgren Park."]'::jsonb,
    '',
    'Registration Closed'
  ),
  (
    'nacc-youth-weekend-league-2026',
    'NACC Youth Weekend League 2026',
    'Youth U11-U15',
    'Completed',
    '2026-06-19',
    '2026-06-28',
    '2026-06-19',
    'Bellevue, Washington',
    'Youth weekend league with four guaranteed matches per team',
    'Not specified',
    'A two-weekend youth cricket league for U11, U13, and U15 divisions with four guaranteed matches per team.',
    'youth',
    'Bellevue, WA',
    '/tournaments/youth-weekend-league-2026.jpg',
    '["Two weekends of youth cricket.", "Four guaranteed matches per team.", "U11, U13, and U15 divisions.", "Team and individual registrations were supported."]'::jsonb,
    '["Weekend 1: June 19-21, 2026.", "Weekend 2: June 26-28, 2026.", "Divisions: U11, U13, U15.", "Players without teams were assigned to teams."]'::jsonb,
    '',
    'Registration Closed'
  ),
  (
    'nacc-womens-championship-2026',
    'NACC Women''s Championship 2026',
    'Girls U15 and U15+',
    'Coming Soon',
    '2026-07-23',
    '2026-07-26',
    '2026-06-12',
    'Bellevue, Washington',
    'T20 format with five guaranteed games',
    'Not specified',
    'A Seattle Summer Cricket Festival event focused on girls and women''s cricket with Emerging Girls U15 team entry and Elite Girls U15+ draft-based competition.',
    'youth',
    'Bellevue, WA',
    '/tournaments/womens-championship-2026.jpg',
    '["Seattle Summer Cricket Festival.", "Emerging Girls U15: bring your own team.", "Elite Girls U15+: draft-based tournament.", "T20 format with five guaranteed games.", "Natural and hybrid pitches with live streaming."]'::jsonb,
    '["Emerging Girls U15: team-based entry.", "Elite Girls U15+: individual draft-based competition.", "Four-day event from July 23-26, 2026."]'::jsonb,
    '',
    'Registration Closed'
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

insert into public.grounds (id, name, address, city, surface) values
  ('klahanie-park', 'Klahanie Park', '', 'Issaquah, WA', 'Cricket ground'),
  ('forsgren-park', 'Forsgren Park', '', 'Issaquah, WA', 'Cricket ground')
on conflict (id) do update set
  name = excluded.name,
  address = excluded.address,
  city = excluded.city,
  surface = excluded.surface;
