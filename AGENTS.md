<!-- BEGIN:nextjs-agent-rules -->

# AGENTS.md

GGU is a governance-first Next.js App Router project. Keep the codebase small,
clear, accessible, and easy for humans to review.

## Mission

Build a simple web application foundation that can safely use AI assistance
without lowering quality, security, maintainability, or accountability.

## Source of truth

Read these before making non-trivial changes:

1. `README.md`
2. `docs/AI-GOVERNANCE.md`
3. `docs/CODING-STANDARDS.md`
4. `docs/SUPABASE-VERCEL-SETUP.md`
5. Current Next.js documentation for the installed version (`node_modules/next/dist/docs/` or `https://nextjs.org/docs`) before making framework-specific assumptions.

## Operating rules for agents

- Human instructions override default preferences.
- Prefer the smallest safe change that satisfies the request.
- Assume the deployment target is Vercel and avoid unnecessary platform drift.
- Assume the auth/database stack is Supabase Auth + Supabase Postgres + Drizzle unless a human says otherwise.
- Use Server Components by default; add `"use client"` only when browser-only interactivity is required.
- Keep TypeScript strict. Avoid `any`, `// @ts-ignore`, and non-null assertions unless clearly justified.
- Prefer building pages from reusable UI library components instead of duplicating markup in route files.
- Extract repeated interface patterns into the shared component library.
- Preserve accessibility with semantic HTML, keyboard support, and readable contrast.
- Treat API and server-side code as security-sensitive: validate input, use safe database access patterns, and expose only necessary data.
- Keep secrets server-side and use `NEXT_PUBLIC_` only for values intentionally exposed to the browser.
- For Supabase-backed user data, keep Row Level Security enabled and write least-privilege policies.
- Do not add dependencies unless the benefit is clear and the addition is documented.
- Do not commit secrets, credentials, or environment-specific values.
- Update documentation when behavior, workflow, or standards materially change.

## Required checks before handoff

Prefer this shortcut before committing changes:

- `make precommit`

That target runs:

- `npm run format`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Definition of done

A task is complete when:

- the code is understandable,
- the standards in this repo are followed,
- the docs are updated when needed, and
- the checks pass or any remaining issue is clearly explained.
<!-- END:nextjs-agent-rules -->
