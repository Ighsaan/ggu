# AI Governance

This project allows AI-assisted development, but human owners remain accountable
for product decisions, security, privacy, and releases.

## Governance principles

1. **Human authority** — humans approve scope, architecture, and production release decisions.
2. **Transparency** — meaningful AI-generated changes should be disclosed in commit or PR notes.
3. **Small safe changes** — prefer narrow, reviewable increments over large speculative rewrites.
4. **Security first** — never commit secrets, tokens, private keys, or environment-specific credentials.
5. **Traceable quality** — lint, type-check, and build validation are the baseline gates for changes.

## Deployment target

This application is intended to be hosted on **Vercel**.

That means AI-assisted changes should:

- preserve compatibility with normal Vercel deployment workflows,
- avoid unnecessary platform drift or deployment-specific complexity,
- treat **preview deployments** as the preferred validation environment, and
- require explicit human approval before **production** deployment decisions.

## Change risk levels

| Level  | Examples                                                                                                              | Policy                                                                       |
| ------ | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Low    | copy updates, styling, layout polish, docs, small UI components                                                       | AI may implement directly; human review required before merge                |
| Medium | dependency changes, route changes, application state, config updates, data flow changes                               | AI may draft and implement, but human review is required with extra scrutiny |
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

## Required workflow for AI-assisted changes

1. Understand the task and relevant repo docs.
2. Make the smallest viable change.
3. Run validation commands when relevant.
4. Document behavior and standards changes.
5. Leave a clear summary for human review.

## Review checklist

Before merging AI-assisted work, a human reviewer should confirm:

- the change matches the intended scope,
- no secrets or unsafe patterns were introduced,
- the implementation is readable and maintainable,
- lint, type-check, and build pass,
- Vercel deployment expectations are still respected, and
- docs still reflect the current state of the project.
