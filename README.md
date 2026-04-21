# GGU

GGU is now a **minimal Next.js app** wired for:

- **Supabase Auth** with **Google sign-in**
- **Supabase Postgres**
- **Drizzle ORM** migrations
- **Vercel** hosting and deployment

The current app surface is intentionally small:

- `/login`
- `/dashboard`

The dashboard is public and always shows whether there is an active session. A successful Google login creates or updates a row in `public.users`.

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
- Google sign-in route and callback flow using Supabase SSR helpers
- public dashboard that shows signed-in vs signed-out state
- user sync into `public.users` after successful login
- Drizzle schema and migration setup for Supabase Postgres
- optional GitHub Actions migration job for main branch pushes
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

4. Apply the database migrations:

   ```bash
   npm run db:migrate
   ```

5. Start the app:

   ```bash
   npm run dev
   ```

6. Open:
   - `/login`
   - `/dashboard`

## CI/CD migration note

The GitHub Actions workflow can run `npm run db:migrate` on pushes to `main` when the repository secret `DATABASE_URL` is configured with the Supabase runtime connection string.

## Next recommended steps

- add the real domain tables beyond the auth-backed `users` table,
- refine the UI/UX once the core flow is locked,
- define the production domain and Vercel project settings,
- keep database policies aligned with any future user data tables.
