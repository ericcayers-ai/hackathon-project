# Prompt eval harness

Checks `app/prompts/system-prompt.txt` against a small corpus of documented
regressions and edge cases (`corpus/cases.mjs`) by sending each case's input
to a live model and asserting on the rewrite it produces.

This exists because of
[`docs/decisions/0003-prompt-stabilization.md`](../../docs/decisions/0003-prompt-stabilization.md):
the Activity Limits fabrication fix and the "6/52" date-arithmetic question
are both marked unverified until this has actually been run against a live
model with a passing result. A prompt saying "don't do X" is not evidence
that the model doesn't do X.

## Run it against LM Studio

1. LM Studio → Developer tab → Start Server (see `app/CLAUDE.md` §4).
2. From `app/`:

```bash
npm run eval
```

Or point at a different endpoint/model:

```bash
node eval/run-eval.mjs --base-url http://localhost:1234/v1 --model google/gemma-3n-e4b
```

Run a single case:

```bash
node eval/run-eval.mjs --case activity-limits-absent-no-fabrication
```

Exit code is 1 if any `severity: 'must'` assertion failed against the live
model — wire this into CI once there's a CI runner with a reachable model
endpoint (there isn't one yet; this is currently a local-only check).

## Run it without LM Studio (`--mock`)

```bash
npm run eval:mock
```

This does **not** call a model. It runs the same corpus and assertion logic
against hand-written, known-good responses, so it proves the harness's
pass/fail logic is wired correctly even when LM Studio isn't running or is
busy with something else. A passing `--mock` run tells you the harness
works — it tells you nothing about what the real model actually does. Only
`npm run eval` against a live endpoint can confirm or refute the fabrication
fix and the date-arithmetic behavior.

`npm run test:eval` runs `run-eval.test.mjs`, which unit-tests the assertion
checker itself against both a correct and a deliberately-fabricated sample
(the fabricated one must fail) — this is what proves `--mock` passing isn't
just a rubber stamp.

## Adding a case

Add an entry to `corpus/cases.mjs` with an `input` (a full synthetic
discharge-summary-style document — never real patient data, see
`app/CLAUDE.md` §1) and one or more `assertions`. Assertion types:

- `must_include` / `must_not_include` — substring check, case-insensitive.
- `must_include_regex` / `must_not_include_regex` — regex check, case-insensitive.
- `section_must_include` / `section_must_not_include` — same, but scoped to
  the text under one of the seven fixed output headings (pass `heading`).

Set `severity: 'must'` to fail the run on a miss, or `severity: 'info'` to
report only — use `info` for known, accepted model limitations (see the
`6/52` case) rather than things the prompt is actually supposed to guarantee.

If you add a case, also add a matching canned response to
`mock-backend.mjs` (keyed on a distinguishing string in the input, e.g. the
synthetic NHI) so `--mock` keeps covering every case.

## What this doesn't do yet

- No CI wiring (needs a reachable model endpoint from CI, which doesn't exist).
- Corpus is 5 cases — enough to check the two open decisions in `0003`, not
  a comprehensive regression suite. Extend it as new regressions are found.
- No automated judgment of rewrite quality/tone, only the specific documented
  failure modes. A case can pass every assertion here and still read badly.
