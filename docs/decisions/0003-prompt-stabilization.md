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

## Why this matters

Both issues live in `app/prompts/system-prompt.txt`, which is the entire
clinical-safety logic of the product — 100% of what determines whether a
patient sees an accurate plain-language rewrite. Neither should be
"fixed" by assertion; both need the eval harness to actually confirm.
