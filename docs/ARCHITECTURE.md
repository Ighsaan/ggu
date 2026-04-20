# Architecture and Infrastructure Overview

This document explains how GGU is put together today, how requests move through the system, and which external services are responsible for each part of the stack.

## Goals of the current architecture

The current design optimizes for:

- **simple managed infrastructure** instead of self-hosted services,
- **clear separation** between browser-safe configuration and server-only secrets,
- **Supabase-managed authentication** with Google as the provider,
- **Drizzle-managed SQL schema** instead of hand-maintained dashboard SQL, and
- **Vercel-native deployment** for both preview and production environments.

## High-level topology

At a high level, the project consists of four main systems:

1. **Next.js app on Vercel**
   - serves the web UI, server components, route handlers, and server actions,
   - runs the protected dashboard and auth callback route,
   - holds deployment-time environment variables.

2. **Supabase Auth**
   - manages user authentication, sessions, and cookies,
   - brokers Google OAuth,
   - redirects users back to the app after sign-in.

3. **Supabase Postgres**
   - stores application data,
   - stores the starter `profiles` table,
   - enforces Row Level Security (RLS) policies defined in the Drizzle SQL migration.

4. **Google OAuth**
   - is the upstream identity provider,
   - handles the account chooser and consent screen,
   - returns authenticated users back to Supabase.

## Request and auth flow

### Sign-in flow

When a user signs in with Google, the flow is:

1. The user visits `/login` on the Next.js app.
2. The form on that page calls `signInWithGoogleAction()` in `lib/actions/auth.ts`.
3. The server action creates a Supabase server client and computes a callback URL like:
   - `/auth/callback?next=/dashboard`
4. Supabase generates an OAuth authorization URL for the Google provider.
5. The browser is redirected to Google, but **through Supabase Auth**.
6. After successful Google sign-in, Google redirects back to Supabase at:
   - `https://<supabase-project-ref>.supabase.co/auth/v1/callback`
7. Supabase completes the provider handshake and redirects the browser back to the app callback route.
8. `app/auth/callback/route.ts` exchanges the returned code for a Supabase session.
9. The app redirects the user to the requested in-app route, currently defaulting to `/dashboard`.

### Protected route flow

For a protected request such as `/dashboard`:

1. The app reads the Supabase session from cookies.
2. If no user is present, the request is redirected to `/login`.
3. If a user is present, the app renders the protected page.
4. If `DATABASE_URL` is configured, the app attempts to mirror the authenticated user into the `profiles` table via Drizzle.

## Data flow and database layer

### Database access

The runtime database layer lives in `db/index.ts`.

- `DATABASE_URL` is the **runtime** connection string used by the deployed app.
- The app uses the `postgres` driver together with `drizzle-orm/postgres-js`.
- The runtime path is intentionally simple: one connection string, one Drizzle entry point, one schema import.

### Why pooled connections are used at runtime

The app is designed to run in a serverless environment on Vercel. Because of that, runtime database access should use the **pooled Supabase connection string** rather than a direct long-lived Postgres connection.

This keeps the runtime compatible with Vercel’s execution model and avoids exhausting database connections.

### Migrations

Schema management is handled with **Drizzle Kit**.

Relevant files:

- `drizzle.config.ts`
- `drizzle/0000_curvy_proudstar.sql`
- `drizzle/meta/_journal.json`

Important details:

- `drizzle.config.ts` now loads `.env.local` first and then `.env`.
- `DATABASE_URL` is sufficient for the deployed runtime.
- `DIRECT_URL` exists primarily for local migration workflows where a direct connection is preferred or required.
- Applied migration state is tracked in `drizzle.__drizzle_migrations`.

## Current application structure

### App Router

The app uses the Next.js App Router. The main routes are:

- `/` — landing page and setup status
- `/login` — Google sign-in entry point
- `/dashboard` — protected authenticated page
- `/auth/callback` — auth code exchange route

### Server-side Supabase helpers

Supabase server logic is split into small helpers:

- `lib/supabase/config.ts` — validates required public Supabase env values
- `lib/supabase/server.ts` — creates the server-side Supabase client
- `lib/supabase/user.ts` — reads session/user details
- `lib/supabase/middleware.ts` + `proxy.ts` — keeps auth session behavior aligned with the App Router

### Domain data

The first application-owned table is `profiles`.

That table:

- keys rows by `auth.users.id`,
- stores basic user metadata,
- is protected by RLS policies so authenticated users can only access their own row.

## Environment variable model

The project deliberately separates **public browser config** from **server-only secrets**.

### Browser-safe / public

These are exposed to the client bundle and must be safe to disclose:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`

### Server-side only

These must never be exposed to the browser:

- `DATABASE_URL`
- `DIRECT_URL`
- any service-role keys or provider secrets

### Environment placement

Typical placement is:

- `.env.local` for local development
- Vercel **Production** env vars for live traffic
- Vercel **Preview** env vars for preview deployments

## Deployment architecture

### Vercel

Vercel is responsible for:

- building the Next.js app,
- hosting preview and production deployments,
- storing deployment environment variables,
- serving the production domain and preview URLs.

### Supabase

Supabase is responsible for:

- Auth
- session lifecycle
- OAuth provider integration
- Postgres hosting
- RLS enforcement

### Google

Google is only responsible for identity verification during sign-in. It is **not** the session store and it does **not** directly redirect back into app business logic. The app trusts the Supabase session that comes back after the OAuth flow is completed.

## Operational notes

### Preview deployments

Preview deployments should keep the same public Supabase project URL and anon key as production, but they may use different app URLs for redirect/callback purposes. Supabase must allow both preview and production callback URLs.

### Local development

For local development:

- the app usually runs at `http://localhost:3000`,
- the auth callback is `http://localhost:3000/auth/callback`,
- `.env.local` should hold the active local configuration.

### Secret handling

Do not commit any of the following to the repository:

- database passwords,
- Google client secrets,
- Supabase service-role keys,
- Vercel tokens,
- cookies, access tokens, or refresh tokens.

## Failure modes to watch for

The most common integration issues in this architecture are:

1. **Wrong redirect URI in Google**
   - Google must redirect to the Supabase callback, not directly to the app.

2. **Bad public env values in Vercel**
   - malformed `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, or `NEXT_PUBLIC_SITE_URL` will break login flow in ways that can look like auth or callback bugs.

3. **Missing runtime `DATABASE_URL`**
   - auth can work while database sync fails.

4. **Migration state mismatch**
   - if the schema exists but `drizzle.__drizzle_migrations` is missing or empty, `npm run db:migrate` may try to reapply already-created tables.

## Summary

GGU currently follows a straightforward hosted architecture:

- **Vercel** runs the Next.js application,
- **Supabase Auth** handles sign-in and sessions,
- **Supabase Postgres** stores application data,
- **Google** is the OAuth provider, and
- **Drizzle** defines and evolves the application schema.

That gives the project a relatively low-ops setup with a clean separation between UI, auth/session handling, and database concerns.
