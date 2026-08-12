# 0003 — Prompt stabilization (Phase 1)

**Status:** Partially decided — fabrication rule fixed; date-bug decision deferred to eval-suite build
**Date:** 2026-08-07

## Activity Limits fabrication regression — fixed (prompt-side)

`app/prompts/system-prompt.txt` now explicitly instructs the model to emit
the `[flag for nurse review]` sentinel for "Activity limits" when the source
document doesn't mention it, instead of inventing a plausible-sounding limit.
See `app/prompts/CHANGELOG.md` 1.1.

**This is not yet verified against a live model.** No eval harness exists in
this repo yet (that's the next Phase 1 deliverable) — until it does, "fixed"
means "the prompt now says not to," not "confirmed not to happen." Do not
describe this as resolved in a pitch/demo context until it's been run against
the eval corpus with a passing result.

## "6/52" date-arithmetic bug — decision deferred, not abandoned

`app/CLAUDE.md` §2 documents this as an intentional demo artifact (the small
model reads `6/52` as "6 weeks and 5 days"; the nurse catches and corrects it,
demonstrating why the clinician gate exists).

Per the roadmap (`docs/decisions/../..` — see the plan's Phase 1 judgment
call), the recommended long-term direction is to fix this via a deterministic
date-parsing pass rather than relying on LLM arithmetic — a production tool
should not ship a known-wrong date parser on purpose. That fix is deferred to
when the eval suite exists to prove it doesn't regress other date handling
(`/24`, `/12`, the `x` prefix, compounds like `3kg/10/7`, non-time slashes
like `2/2`), since a hand-rolled parser is easy to get subtly wrong on exactly
those edge cases.

**Interim state:** kept as documented, not silently treated as permanent
scope. Next concrete step: build `app/eval/corpus/` + `app/eval/run-eval.mjs`
(still open — requires a running/mocked LM Studio endpoint, which this
session did not have available).

**Update 2026-08-13:** The harness now exists — see `app/eval/README.md`.
5 cases cover the Activity Limits fabrication rule (present + absent
control), the non-time-slash edge cases (`2/2`, calendar dates, blood
pressure), the `x` prefix and `3kg/10/7` compound form, and the `6/52`
ceiling (recorded as `severity: info`, not a pass/fail gate — see above).
`npm run eval:mock` plus `npm run test:eval` (in `app/`) prove the harness's
own pass/fail logic is correct — including that it actually fails on the
documented fabrication phrase, not just rubber-stamping everything — using
hand-written responses, no model involved.

**Still not done, because LM Studio was unavailable this session (in use
for something else):** `npm run eval` against the real
`google/gemma-3n-e4b` endpoint. Both open questions above — is the
fabrication rule actually holding, and what does the live model really do
with `6/52` — remain unverified until someone runs that command against a
live LM Studio server and reads the output. Do not mark either "confirmed
fixed" from this session's work alone.

## Why this matters

Both issues live in `app/prompts/system-prompt.txt`, which is the entire
clinical-safety logic of the product — 100% of what determines whether a
patient sees an accurate plain-language rewrite. Neither should be
"fixed" by assertion; both need the eval harness to actually confirm.
