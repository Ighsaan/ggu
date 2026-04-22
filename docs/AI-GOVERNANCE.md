# AI Governance

This project allows AI-assisted development, but human owners remain accountable
for product decisions, security, privacy, and releases.

## Project scope and purpose

GGU is a gaming-focused web application where users can sign in with Google and
engage with a curated dashboard experience that highlights games and invites
community feedback/voting.

Current production-aligned scope:

- `/login` handles sign-in and user entry flow.
- `/dashboard` is the primary product surface and is built from reusable sections
  such as top navigation, hero messaging, game carousels, and footer actions.
- Authenticated users are synced into `public.users` through the Supabase +
  Drizzle data layer.

Any AI-generated change that substantially alters this scope should be treated
as a product or architecture proposal and require explicit human approval.

## Governance principles

1. **Human authority** — humans approve scope, architecture, and production release decisions.
2. **Transparency** — meaningful AI-generated changes should be disclosed in commit or PR notes.
3. **Small safe changes** — prefer narrow, reviewable increments over large speculative rewrites.
4. **Security first** — never commit secrets, tokens, private keys, or environment-specific credentials.
5. **Traceable quality** — lint, type-check, and build validation are the baseline gates for changes.
6. **Standards alignment** — implementation decisions must align with project coding and design standards.

## Coding standards baseline

AI contributions must follow `docs/CODING-STANDARDS.md` and these non-negotiable
expectations:

- Keep TypeScript strict; avoid `any`, broad escape hatches, and unsafe assertions unless documented.
- Use Next.js App Router conventions and default to Server Components; add `"use client"` only when browser-side interactivity is required.
- Prefer reusable components over large one-off route JSX blocks.
- Keep server-side code security-sensitive: validate inputs, narrow outputs, and protect secrets.
- Use CSS Modules for local styles; keep global CSS limited to tokens, resets, and app-wide primitives.
- Maintain accessibility through semantic HTML, keyboard-friendly behavior, and readable contrast.

## Design standards baseline

AI-generated UI changes should preserve the current GGU visual and interaction
language unless a human explicitly requests a redesign:

- Keep the gaming-oriented, high-contrast identity used across `/login` and `/dashboard`.
- Preserve clear section hierarchy (top bar, hero, banners, carousels, footer) and avoid collapsing distinct content blocks into generic layouts.
- Reuse shared UI primitives and existing dashboard components before introducing new visual patterns.
- Maintain consistent spacing, typography roles (display vs body), and button treatments.
- Favor responsive behavior that preserves readability and interaction clarity on small screens.
- Keep imagery, iconography, and call-to-action wording aligned with the existing GGU product tone.

## Deployment target

This application is intended to be hosted on **Vercel**.

That means AI-assisted changes should:

- preserve compatibility with normal Vercel deployment workflows,
- avoid unnecessary platform drift or deployment-specific complexity,
- treat **preview deployments** as the preferred validation environment, and
- require explicit human approval before **production** deployment decisions.

## Platform assumptions

The current application baseline assumes:

- **Supabase Auth** for authentication,
- **Google sign-in** as the only enabled auth provider for now,
- **Supabase Postgres** for application data,
- **Drizzle ORM + migrations** for schema management, and
- **Vercel** for web hosting and deployment.

Changes that alter these foundations should be treated as architectural changes
and reviewed carefully.

## Change risk levels

| Level  | Examples                                                                                                              | Policy                                                                       |
| ------ | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Low    | copy updates, visual polish within established patterns, docs, small UI component refinements                         | AI may implement directly; human review required before merge                |
| Medium | dependency changes, route-level layout changes, data flow updates, component contract changes                         | AI may draft and implement, but human review is required with extra scrutiny |
| High   | auth, payments, user data handling, telemetry, secret management, destructive operations, deployment or infra changes | human approval required before implementation and again before merge/release |

## Mandatory guardrails

- Do not store secrets in the repository.
- Do not add analytics, tracking, or outbound integrations without explicit human approval.
- Do not introduce destructive scripts or migrations without a rollback plan.
- Do not add packages casually; every new dependency should solve a clear problem.
- Prefer maintainable platform primitives before introducing framework or library complexity.

## Vercel-specific guardrails

- Manage secrets and deployment configuration through Vercel environment variables or approved infrastructure tooling, not committed files.
- Use `NEXT_PUBLIC_` only for values intentionally meant to be exposed to the browser.
- Do not expose internal tokens, server-only environment variables, preview URLs, or unnecessary deployment metadata to clients.
- Keep runtime choices explicit. If a route, function, or feature depends on Node.js, Edge Runtime, or platform-specific behavior, that should be intentional and documented.
- Prefer validating meaningful changes in a Vercel preview deployment before production rollout.
- New cron jobs, storage services, analytics, or marketplace integrations should be treated as higher-risk changes and reviewed by a human.

## Supabase-specific guardrails

- Keep Supabase service-role credentials server-side only and do not send them to browser code.
- Treat auth, RLS policies, and database migrations as security-sensitive changes.
- New user-data tables should enable **Row Level Security** before they are considered ready.
- Prefer least-privilege policies and return only the fields the caller actually needs.
- Keep Google OAuth configuration, redirect URLs, and Supabase environment settings aligned across local, preview, and production environments.

## Required workflow for AI-assisted changes

1. Understand the task and relevant repo docs (`README.md`, this file, and `docs/CODING-STANDARDS.md` at minimum).
2. Make the smallest viable change aligned with project scope and design language.
3. Run validation commands when relevant.
4. Document behavior and standards changes.
5. Leave a clear summary for human review.

## Review checklist

Before merging AI-assisted work, a human reviewer should confirm:

- the change still aligns with the current GGU product scope,
- coding standards were followed,
- design standards were preserved or intentionally updated,
- no secrets or unsafe patterns were introduced,
- implementation is readable and maintainable,
- lint, type-check, and build pass,
- Vercel deployment expectations are still respected,
- Supabase auth and RLS expectations are still respected, and
- docs still reflect the current state of the project.
