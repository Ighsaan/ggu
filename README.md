# GGU

GGU is now a **governance-first Next.js starter** that is pre-wired for:

- **Supabase Auth** with **Google sign-in**
- **Supabase Postgres**
- **Drizzle ORM** and SQL migrations
- **Vercel** hosting and deployment

The repository is still an early foundation rather than a finished product, but the application layer, auth flow, database wiring, and setup documentation are now in place.

## Current stack

- Next.js 16
- React 19
- TypeScript
- Supabase Auth (Google provider)
- Supabase Postgres
- Drizzle ORM + Drizzle Kit
- ESLint
- Prettier
- GitHub Actions
- Vercel for hosting and deployment

## What is already implemented

- App Router project scaffold
- shared UI component library primitives (`Button`, `ButtonLink`, `Card`, `Badge`)
- Google sign-in route and callback flow using Supabase SSR helpers
- session-refresh proxy for Next.js App Router
- protected dashboard example
- Drizzle schema and migration setup for Supabase Postgres
- starter `profiles` table migration with RLS policies
- `Makefile` with `make precommit`
- AI governance, coding standards, and repo agent instructions

## Important docs

- Agent instructions: [`AGENTS.md`](./AGENTS.md)
- AI governance: [`docs/AI-GOVERNANCE.md`](./docs/AI-GOVERNANCE.md)
- Coding standards: [`docs/CODING-STANDARDS.md`](./docs/CODING-STANDARDS.md)
- Supabase + Vercel setup guide: [`docs/SUPABASE-VERCEL-SETUP.md`](./docs/SUPABASE-VERCEL-SETUP.md)
- Architecture and infrastructure overview: [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)

## Environment variables

Copy `.env.example` to `.env.local` and fill in the real values.

Main variables:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `DATABASE_URL`
- `DIRECT_URL`

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
npm run format
npm run format:check
npm run db:generate
npm run db:migrate
npm run db:studio
```

## Pre-commit workflow

Before committing changes, run:

```bash
make precommit
```

This runs:

- `npm run format`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy envs:

   ```bash
   cp .env.example .env.local
   ```

3. Fill in your Supabase values.

4. Apply the initial database migration:

   ```bash
   npm run db:migrate
   ```

5. Start the app:

   ```bash
   npm run dev
   ```

## Next recommended steps

- decide the first real domain data model beyond the starter `profiles` table,
- add additional protected routes and business features,
- define the production domain and Vercel project settings,
- keep RLS policies aligned with every new user-data table.
