# Coding Standards

## Core principles

- Prefer clarity over cleverness.
- Favor simple, composable components.
- Keep files focused on one responsibility.
- Write code that is easy for a future human reviewer to understand quickly.

## TypeScript

- Use strict TypeScript patterns.
- Prefer explicit types when they improve readability.
- Avoid `any` unless absolutely necessary and documented.
- Prefer unions, narrowing, and small helper types over broad escape hatches.

## Next.js and React

- Use the App Router conventions already established in this repo.
- Default to **Server Components**.
- Add `"use client"` only when hooks, event handlers, or browser APIs are required.
- Keep metadata accurate in `app/layout.tsx` for SEO and clarity.
- Prefer semantic HTML and accessible structure.

## Styling

- Use CSS Modules for route-specific styling.
- Keep global CSS limited to tokens, resets, and application-wide defaults.
- Design for responsive layouts from the start.
- Preserve accessible contrast and readable spacing.

## Naming and structure

- Use `PascalCase` for React component names.
- Use `camelCase` for variables and functions.
- Use concise, descriptive names instead of abbreviations where possible.
- Keep route segment names lowercase and filesystem-friendly.
- Use the `@/*` import alias when it improves readability.

## Dependencies

- Prefer the built-in Next.js and React toolchain before introducing new libraries.
- Every dependency should have a clear purpose.
- Remove dead code and unused assets when replacing generated template content.

## Comments and documentation

- Comment intent, constraints, or trade-offs — not obvious code.
- Update the README when project scope or workflows change.
- Keep governance docs aligned with actual practice.

## Validation

Use these commands as the default project quality gates:

- `npm run lint`
- `npm run typecheck`
- `npm run build`
