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
4. Current Next.js documentation for the installed version (`node_modules/next/dist/docs/` or `https://nextjs.org/docs`) before making framework-specific assumptions.

## Operating rules for agents

- Human instructions override default preferences.
- Prefer the smallest safe change that satisfies the request.
- Use Server Components by default; add `"use client"` only when browser-only interactivity is required.
- Keep TypeScript strict. Avoid `any`, `// @ts-ignore`, and non-null assertions unless clearly justified.
- Preserve accessibility with semantic HTML, keyboard support, and readable contrast.
- Do not add dependencies unless the benefit is clear and the addition is documented.
- Do not commit secrets, credentials, or environment-specific values.
- Update documentation when behavior, workflow, or standards materially change.

## Required checks before handoff

Run these when the change can affect application behavior:

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
