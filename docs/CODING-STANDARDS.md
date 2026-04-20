# Coding Standards

## Core principles

- Prefer clarity over cleverness.
- Favor simple, composable components.
- Keep files focused on one responsibility.
- Write code that is easy for a future human reviewer to understand quickly.
- Treat security as a default requirement, not as a later hardening step.

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
- Keep page files focused on composition and route-level concerns.
- Build pages from reusable components instead of large one-off JSX trees.

## UI component library

- Create and maintain a reusable UI component library for shared interface patterns.
- Prefer shared components for buttons, form controls, cards, layouts, navigation, feedback states, and other repeated primitives.
- Pages should be assembled from these reusable components wherever practical rather than duplicating markup and styles.
- When a UI pattern is reused or is likely to be reused, extract it into the component library instead of re-implementing it inside route files.
- Keep component APIs, naming, spacing, styling, and accessibility behavior consistent across the application.
- Favor composition over highly configurable “do everything” components.

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

## APIs and security

- Treat API routes, Route Handlers, Server Actions, and all server-side code as security-sensitive.
- Validate and narrow all external input before using it.
- Use parameterized queries, prepared statements, or ORM-safe query builders; never build SQL queries by string concatenation with user input.
- Return only the fields required by the caller; do not expose internal data, secrets, tokens, stack traces, or other unnecessary information.
- Perform authentication and authorization checks before reading or mutating protected data.
- Keep secrets on the server only and never pass them to client components or browser-exposed environment variables.
- Prefer safe error handling that gives clients only the information they need while preserving useful server-side logs for debugging.
- Consider abuse prevention, auditability, and rate limiting when APIs become public or sensitive.

## Dependencies

- Prefer the built-in Next.js and React toolchain before introducing new libraries.
- Every dependency should have a clear purpose.
- Remove dead code and unused assets when replacing generated template content.

## Comments and documentation

- Comment intent, constraints, or trade-offs — not obvious code.
- Update the README when project scope or workflows change.
- Keep governance docs aligned with actual practice.

## Validation

Use `make precommit` before committing changes.

That target runs these default quality gates:

- `npm run format`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
