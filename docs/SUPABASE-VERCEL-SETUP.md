# Supabase + Vercel Setup Guide

This repo is already wired for:

- Supabase Auth with **Google sign-in**
- Supabase Postgres
- Drizzle ORM + migrations
- Vercel hosting

What still needs to happen is the **external account configuration**.

## 1) Create the Supabase project

Create a new Supabase project and collect:

- Project URL
- Anon key
- Database pooled connection string
- Database direct connection string

You will use those values for `.env.local` and Vercel environment variables.

## 2) Configure Google OAuth for Supabase

In **Google Cloud Console**:

1. Create an OAuth client.
2. Add this as an authorized redirect URI:

   ```text
   https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
   ```

3. Copy the Google client ID and client secret.

In **Supabase**:

1. Go to **Authentication → Providers → Google**.
2. Enable Google.
3. Paste the Google client ID and client secret.

## 3) Configure Supabase redirect URLs

In **Supabase Authentication URL settings**, add the application callback URLs for each environment.

Recommended values:

- Local dev:

  ```text
  http://localhost:3000/auth/callback
  ```

- Vercel preview deployment callback URL
- Vercel production domain callback URL

Also set the site URL to your primary app URL when production is ready.

## 4) Fill in local env vars

Copy `.env.example` to `.env.local`.

Required variables:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
DATABASE_URL=...
DIRECT_URL=...
```

### Which database URL goes where?

- `DATABASE_URL`: use the **pooled** Supabase connection string for application runtime
- `DIRECT_URL`: use the **direct** Supabase connection string for local Drizzle migrations when available

## 5) Apply the migration

After `.env.local` is filled in, run:

```bash
npm run db:migrate
```

The current app migration creates the `users` table used by the app layer and keeps the runtime database ready for login-driven syncing.

## 6) Start the app locally

```bash
npm run dev
```

Then visit:

- `/login`
- `/dashboard`

The dashboard is public and will report whether you are logged in.

## 7) Set up Vercel

In Vercel:

1. Import the GitHub repository.
2. Add these environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `DATABASE_URL`
   - optionally `NEXT_PUBLIC_SITE_URL` for the production domain

3. Deploy the project.

### Notes

- `DIRECT_URL` is mainly needed for local migration workflows.
- `DATABASE_URL` is the important runtime variable for the deployed app.

## 8) Optional GitHub Actions DB migration job

The repo CI workflow can also run `npm run db:migrate` on pushes to `main`.

To enable that, add this repository secret:

- `DATABASE_URL` = your Supabase runtime database URL

If the secret is not configured, the migration job skips itself cleanly.

## 9) Update Supabase after the first Vercel deploy

Once Vercel gives you a preview URL and/or production domain, add those callback URLs to Supabase Auth settings if they are not already present.

## What you need to provide / configure

From your side, the main setup work is:

1. Create the Supabase project
2. Create the Google OAuth client in Google Cloud
3. Paste the Google client credentials into Supabase
4. Fill in the env vars locally and in Vercel
5. Run the DB migration with real connection strings
6. Add the callback URLs in Supabase
7. Import the repo into Vercel

## What the repo already handles

The codebase already includes:

- Supabase SSR server client
- auth callback route
- public dashboard and login pages
- Drizzle schema and migration setup
- app user sync using Drizzle ORM
- Vercel-oriented documentation and env guidance
