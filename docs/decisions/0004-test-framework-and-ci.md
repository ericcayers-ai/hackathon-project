# 0004 — Test framework, lint/format tooling, and CI (Phase 2)

**Status:** Decided / implemented
**Date:** 2026-08-13

## What this covers

Phase 2 of the production roadmap (`docs/decisions/0003-prompt-stabilization.md`
is Phase 1): install the test framework `app/` never had, and gate merges on
it.

## Decisions

- **Vitest**, not `node:test`, for `app/src` — matches the existing
  Vite/ESM/JSX setup with minimal config (`app/vite.config.js`'s `test`
  block), and gives jsdom + React Testing Library for component tests.
  `app/eval/` keeps its own `node:test`-based self-test
  (`run-eval.test.mjs`) — it's a standalone CLI harness, not part of the
  component/unit suite, and converting it wouldn't add anything.
- **Vitest is scoped to `src/**/*.test.{js,jsx}`** (`vite.config.js`
  `test.include`) specifically so it does not also try to collect
  `app/eval/run-eval.test.mjs`, which uses `node:test`'s API, not Vitest's —
  they'd fail to parse as Vitest suites otherwise.
- **ESLint flat config** (`eslint.config.js`): `@eslint/js` recommended +
  `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh`. Running it for
  the first time against the existing codebase caught one real bug — see
  below.
- **Prettier is configured but not enforced in CI.** `.prettierrc.json`
  matches the codebase's existing style (no semicolons, single quotes). The
  existing source was never written against Prettier, and running
  `--write` across it would touch nearly every line of every file as one
  unrelated mass-reformat — not something to do silently as part of adding
  tooling. `npm run format` / `npm run format:check` exist for local/opt-in
  use; CI (`.github/workflows/ci.yml`) intentionally does not gate on
  `format:check`. Revisit if/when the team wants to commit to a
  repo-wide reformat as its own deliberate change.
- **`KNOWN_HEADINGS` (`app/src/lib/pdf.js`) and `QR_SAFE_LIMIT`
  (`app/src/PatientView.jsx`) are now exported**, not just module-private —
  needed so tests can assert against them directly (notably
  `pdf.test.js`'s drift check, below). No behavior change.

## A real bug this caught

Running ESLint for the first time (there was no lint config before this)
immediately flagged `no-const-assign` in `app/eval/run-eval.mjs`'s
`runCase()`: a `for (const assertion of kase.assertions)` loop reassigned
`assertion` inside a `catch` block. This never fired in practice, because
`checkAssertion()` only throws for an assertion `type` string it doesn't
recognize, and a separate test
(`run-eval.test.mjs`: "every corpus case assertion type is one checkAssertion
actually implements") already guarantees every corpus case avoids that. But
had a future case *ever* hit that catch path, it would have crashed the
eval harness itself with a `TypeError: Assignment to constant variable`
instead of reporting the assertion error it was trying to report — the
opposite of what a `try/catch` there is supposed to buy you. Fixed by
introducing a separate `note` variable instead of reassigning the loop
binding.

## CI (`.github/workflows/ci.yml`)

Runs on push to `main` and on PRs touching `app/**`: install → lint → Vitest
(`test:unit`) → eval harness self-test (`eval:mock` — proves the harness
logic, not the model — see `app/eval/README.md`) → eval harness's own unit
tests (`test:eval`) → `vite build`. Does **not** run `npm run eval` against
a real model — there's no reachable LM Studio endpoint from a GitHub-hosted
runner, and standing one up is out of scope here (would need a self-hosted
runner or a cloud-hosted model endpoint, either of which is a real
infrastructure decision, not a CI config tweak).

## What Phase 2 in the roadmap asked for that this does NOT cover

Deliberately left out of this pass — not needed to unblock anything, and
each is nontrivial enough to deserve its own pass rather than being folded
in silently:
- Coverage reporting/thresholds.
- A pre-commit hook running lint/tests locally (nothing currently stops a
  broken commit from landing outside of CI).
- Testing `generateRewrite()`'s actual SSE-stream parsing in `llm.js` — the
  App.jsx component tests exercise the approval-gate state machine by typing
  directly into the editable rewrite textarea, deliberately sidestepping the
  need to mock a streaming fetch response. Real coverage of the stream
  parser itself is still open.
