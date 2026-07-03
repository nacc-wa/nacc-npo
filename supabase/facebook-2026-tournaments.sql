-- Additional 2026 NACC tournament data found from public NACC Facebook posts.
-- Reviewed on 2026-07-03 from:
-- https://www.facebook.com/profile.php?id=61573313459360
--
-- Notes:
-- - Seattle Open 2026 is already managed in schema.sql/seattle-open-2026.sql.
-- - Facebook access exposed public posts back to April 2026 before the login wall blocked deeper review.
-- - Masters T100 end date is inferred as the last Friday in May 2026 because the flyer says May 2026, Mondays and Fridays.

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
    'Completed',
    '2026-05-04',
    '2026-05-29',
    '2026-05-04',
    'Bellevue, Washington',
    'T100 tournament for Masters 40+, played Mondays and Fridays',
    '$1600 registration fee',
    'A Masters 40+ T100 league announced by NACC for May 2026 in the Seattle area.',
    'adult',
    'Bellevue, WA',
    '',
    '["Masters 40+ competition.", "T100 tournament format.", "Played on Mondays and Fridays during May 2026.", "$1600 registration fee."]'::jsonb,
    '["Tournament began May 4, 2026.", "Match days were listed as Mondays and Fridays.", "Event was announced for Bellevue and the Seattle-area cricket community."]'::jsonb,
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
    '',
    '["Two weekends of youth cricket.", "Four guaranteed matches per team.", "U11, U13, and U15 divisions."]'::jsonb,
    '["Weekend 1: June 19-21, 2026.", "Weekend 2: June 26-28, 2026.", "Divisions: U11, U13, U15."]'::jsonb,
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
    '2026-06-23',
    'Bellevue, Washington',
    'T20 format with five guaranteed games',
    'Not specified',
    'A Seattle Summer Cricket Festival event focused on girls and women''s cricket with Emerging Girls U15 team entry and Elite Girls U15+ draft-based competition.',
    'youth',
    'Bellevue, WA',
    '',
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
