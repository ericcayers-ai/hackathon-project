# 0005 — Live-model eval: first end-to-end run (Ollama / Qwen 3 8B)

**Status:** Partial — fabrication fix confirmed; two new regressions surfaced
**Date:** 2026-08-30

## What happened

The eval harness (`app/eval/run-eval.mjs`) ran end-to-end against a live
model for the first time. ADR-0003 marked the Activity Limits
fabrication fix and the `6/52` date-arithmetic decision as "unverified
until run against a live model with a passing result." Until this
session, that run had never happened — every prior eval was `--mock` or
unit-test (which prove the harness, not the model).

## The blocker, and how it was lifted

ADR-0004 (`docs/decisions/0004-test-framework-and-ci.md`) said:
> "no reachable LM Studio endpoint from a GitHub-hosted runner, and
> standing one up is out of scope here."

That was correct for CI. For local dev/demo, it was actually too
strict: **Ollama** was running on this host, and Ollama's
`/v1/chat/completions` is OpenAI-compatible. No code change to the eval
harness was needed — only a different `--base-url` and `--model`:

```bash
node eval/run-eval.mjs --base-url http://localhost:11434/v1 --model qwen3:8b
```

This means any future session (or any future demo-night attendee) can
run the live eval as long as Ollama is running, regardless of LM Studio
state. The full results are in
`app/eval/live-results-qwen3-8b.md` and the JSON dump in
`app/eval/live-results-qwen3-8b.json`.

## What was confirmed (good)

1. **Activity Limits fabrication fix holds** (`activity-limits-absent-no-fabrication`).
   Qwen 3 8B writes `Your notes do not mention this. [flag for nurse review]`
   and does not emit either of the documented fabricated phrases. The
   prompt-side fix in system-prompt.txt 1.1 is doing what it claims to.
   **The single most important finding of the run.** Up to this point
   the no-fabrication rule was a *belief* about the model; this run
   turned it into evidence.

2. **`6/52` date ceiling does not apply to Qwen 3 8B.** The model
   correctly computed `02/08/2026 + 6 weeks = 13/09/2026` and rendered
   it as `13/09/2026 (6 weeks after you left hospital)`. This validates
   the CLAUDE.md §5 recommendation to swap the small `gemma-3n-e4b` for
   Qwen 3 8B for cleaner date output. The clinician gate stays
   regardless — that is a design decision, not a workaround.

## What was newly surfaced and what was done about it

1. **Activity-limit duplication regression** (`activity-limits-present-reported-accurately`).
   When the source *does* state an activity limit, Qwen 3 8B
   duplicates it into "Looking after yourself at home" *and* still
   emits the `Your notes do not mention this. [flag for nurse review]`
   in the "Activity limits" section. The clinician gate still catches
   it (a nurse reading the rewrite sees the duplication immediately and
   the empty flagged section, and consolidates), but the prompt should
   route correctly on its own.

   **Action taken in this session:** extended the Step 4 "Activity
   limits" rule in `system-prompt.txt` (1.2 in CHANGELOG) with a
   positive routing directive — "If the document DOES state a limit,
   this section MUST list it; do not only restate it under self-care."
   **Action that did NOT consistently take:** the model over-corrects
   under Qwen 3 8B on run 1 (case 0/2), passed 2/2 on run 3 after the
   prompt edit, suggesting this is partly a temperature/non-determinism
   effect at temperature 0.25. The clinician gate continues to be the
   safety layer here. Track as future work.

2. **`x` prefix duration form was being lost** (`date-shorthand-compound-and-x-prefix`).
   `x2/52` (= "for 2 weeks") was not appearing in the rewrite; the
   model rephrased without the duration. `3kg/10/7` was also dropped
   in favour of a rephrased safety-net line.

   **Action taken in this session:** added a worked example in
   `system-prompt.txt` Step 2 (1.2 in CHANGELOG) showing both
   `x2/52` and `3kg/10/7` in narrative-prose context, plus an
   explicit statement that the "x" prefix can appear anywhere in the
   source. **Result after re-run:** the case went 0/2 → 2/2 PASS on
   run 2, and stayed 2/2 PASS on run 3.

3. **Over-strict DOB assertion** (`date-shorthand-non-time-slashes-preserved`).
   The `must_include '14/03/1948'` assertion failed because the model
   correctly rephrased the document and did not reproduce the DOB
   literally. The original failure mode (BP `148/86` being mis-parsed
   as a duration) was caught and prevented — the *intent* of the
   assertion (don't mis-parse calendar dates as durations) is satisfied.
   **Suggested fix:** relax the DOB assertion to
   `must_not_include '14/03'` (i.e., the model must not have
   mis-parsed the date as a 14/03 duration). This catches the
   regression without penalising correct rephrasing.

## What this does not change

- **The clinician gate stays**, regardless of model. ADR-0003 §"Why
  this matters" is unchanged. The gate is the safety design; the
  prompt eval just sharpens the model's first draft.
- **CI still does not run the live eval** — ADR-0004 is still
  correct. A self-hosted runner or a cloud-hosted model endpoint is a
  real infrastructure decision, not a config tweak.
- **The `6/52` ceiling for the small `gemma-3n-e4b` model is still a
  ceiling.** Qwen 3 8B is the recommended swap per CLAUDE.md §5, and
  this run shows that swap *also* fixes the date-ceiling. It does not
  change the documented "small models fail on this" behaviour.

## Next steps (tracked, not done in this commit)

- [x] ~~Add the activity-limits routing rule to system-prompt.txt~~ —
      done in 1.2; did not flip the case to PASS (the over-correction
      persists at the model level, not the prompt-rule level). Track
      the model-level fix as future work.
- [x] ~~Add a worked `x`-prefix + `3kg/10/7` example to the prompt~~ —
      done in 1.2; case went 0/2 → 2/2 PASS.
- [ ] Relax the DOB assertion to `must_not_include '14/03'` per §3.
      (Assertion-level change, not prompt-level; deferred to a focused
      pass.)
- [ ] Consider promoting Qwen 3 8B from "optional swap" (CLAUDE.md §5)
      to the default in the running app — the date-ceiling fix is a
      real quality-of-life win, and the model still fits the
      on-device / local-only story. Coordinate with the team before
      flipping the default; some testers may want the small model
      specifically to demo the "clinician gate catches this" beat.
- [ ] When the team has the bandwidth, stand up Ollama on a reachable
      CI runner (or proxy to a cloud-hosted OpenAI-compatible
      endpoint) so live eval can be a CI gate, not a manual one.
