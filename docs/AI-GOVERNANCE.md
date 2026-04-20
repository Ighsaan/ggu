# AI Governance

This project allows AI-assisted development, but human owners remain accountable
for product decisions, security, privacy, and releases.

## Governance principles

1. **Human authority** — humans approve scope, architecture, and production release decisions.
2. **Transparency** — meaningful AI-generated changes should be disclosed in commit or PR notes.
3. **Small safe changes** — prefer narrow, reviewable increments over large speculative rewrites.
4. **Security first** — never commit secrets, tokens, private keys, or environment-specific credentials.
5. **Traceable quality** — lint, type-check, and build validation are the baseline gates for changes.

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
- lint, type-check, and build pass, and
- docs still reflect the current state of the project.
