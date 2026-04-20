# GGU

GGU is currently a **governance-ready Next.js starter project**. At this stage,
it is not a finished product with domain-specific features yet; it is a clean
foundation for building a web application with clear AI contribution rules,
coding standards, and quality gates.

## What exists so far

This repository currently includes:

- a simple **Next.js 16** web app using the **App Router**,
- **TypeScript** with strict mode,
- **ESLint** and **Prettier** for code quality and consistency,
- an `AGENTS.md` file to guide AI coding agents,
- project-level **AI governance** and **coding standards** docs,
- a `Makefile` with a `precommit` target for local validation, and
- a **GitHub Actions CI workflow** that validates formatting, linting, type safety, and build health.

## Project direction right now

The current purpose of the project is to provide a solid starting point for a
future web application while keeping human oversight explicit and maintaining a
clean baseline for AI-assisted development.

## Hosting target

This application is intended to be hosted on **Vercel**.

Current governance assumptions:

- preview deployments are the preferred place to validate meaningful changes,
- production deployment decisions require human approval, and
- secrets should be managed through Vercel environment variables, not committed files.

## Tech stack

- Next.js 16
- React 19
- TypeScript
- ESLint
- Prettier
- GitHub Actions
- Vercel for hosting and deployment

## Governance and standards

- Agent instructions: [`AGENTS.md`](./AGENTS.md)
- AI governance policy: [`docs/AI-GOVERNANCE.md`](./docs/AI-GOVERNANCE.md)
- Coding standards: [`docs/CODING-STANDARDS.md`](./docs/CODING-STANDARDS.md)

## Available scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
npm run format
npm run format:check
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

## Optional local AI tooling

Vercel publishes an agent plugin that adds Vercel-focused skills, commands, and
context for compatible coding-agent environments.

Example install command for the Codex target:

```bash
npx plugins add vercel/vercel-plugin -t codex -s user
```

Important:

- this is **local agent tooling**, not a dependency of this web app,
- it does **not** get bundled into production, and
- it belongs in the developer or agent environment, not in application runtime code.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000).

## Suggested next steps

- define the actual product scope for GGU,
- add real routes and user-facing features,
- introduce data storage or authentication only when requirements are clear, and
- keep governance docs aligned with the evolving project.
