# NACC - North America Cricket Conference

Production MVP website for the North America Cricket Conference non-profit.

## Features

- Public NACC marketing site with mission, tournament calendar, registration, payments, and contact pages.
- Supabase-ready data layer for tournaments, registrations, teams, grounds, ground reservations, contacts, and payments.
- Admin dashboard for reviewing registrations, creating tournaments, tracking reservations, and updating payment status.
- Supabase is the source of truth for public and admin data.

## Setup

```bash
npm install
npm run dev
```

## Supabase setup

1. Open your Supabase project.
2. Go to `SQL Editor`.
3. Run [`supabase/schema.sql`](./supabase/schema.sql).
4. Go to `Project Settings` -> `API`.
5. Copy the project URL and publishable key.
6. Create `.env.local`:

```bash
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

7. Restart the dev server.
8. Go to `Authentication` -> `Users` -> `Add user`, then create `admin@northamericacricketconference.org` with the password you want to use at `/admin/login`.

## Vercel deployment

Add these environment variables in the Vercel project settings for Production, Preview, and Development:

```bash
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

The included [`vercel.json`](./vercel.json) rewrites all routes to `index.html` so direct visits to React routes like `/admin`, `/about`, and `/tournaments/seattle-open-2026` work in production.

The SQL creates these tables and RLS policies:

- `tournaments`
- `teams`
- `registrations`
- `grounds`
- `ground_reservations`
- `contacts`
- `payments`

Public users can read tournaments/grounds and submit registration/contact forms. Authenticated Supabase users can manage the admin dashboard data.

## Checks

```bash
npm run lint
npm run build
```
