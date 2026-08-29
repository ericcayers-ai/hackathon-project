# system-prompt.txt changelog

`system-prompt.txt` is imported raw (`?raw`) by `app/src/lib/llm.js` and sent
verbatim as the model's system message — it must contain nothing but the
prompt itself. Every edit to it is recorded here instead, per the Phase 6
prompt change-control policy in the production roadmap
(`docs/decisions/0003-prompt-stabilization.md`).

## 1.2 — 2026-08-30

Two targeted additions surfaced by the first end-to-end live-model eval
run (`app/eval/live-results-qwen3-8b.md`, decision in
`docs/decisions/0005-live-model-eval-qwen3-8b.md`):

1. **Step 4 — "Activity limits" routing when a limit IS present.**
   The 1.1 rule covered the absence case (don't fabricate) but did not
   cover the presence case (when a limit IS stated, this section MUST
   list it, not only restate it under self-care). Added a positive
   routing rule with a concrete example ("Do not bend your hip more
   than 90 degrees for 6 weeks. Do not drive for 6 weeks. Do not lift
   more than 5 kg for 6 weeks.") and a flag for partial limits.

2. **Step 2 — `x`-prefix and compound quantity-over-time worked
   examples in narrative prose.** The shorthand table already listed
   the rules, and Step 2 already showed them as standalone lines; what
   the live model needed was a worked example for how the forms look
   in the middle of a sentence ("Fluid restriction advised x2/52" ->
   "Drink less fluid for 2 weeks, as advised by your medical team.")
   and an explicit statement that the "x" prefix can appear anywhere
   in the source, not only in follow-up intervals.

**Re-ran the live eval after this change.** `x`-prefix case went
0/2 → 2/2 PASS. The activity-limits-presence case did NOT improve
under Qwen 3 8B with this prompt (still failing for the over-correction
reason documented in the live-results report — the model puts the
limits in "Looking after yourself at home" but still emits the empty
flag in the "Activity limits" section). The 1.1 absence-case rule
still passes. The clinician gate continues to be the safety layer
that catches the present-case over-correction; no eval-driven prompt
change so far has closed that gap. Track as future work.

## 1.1 — 2026-08-07

Added an explicit no-fabrication rule under "Activity limits" in Step 4
(Output): when the source document doesn't mention activity/driving/lifting/
work limits at all, the model must write the standard
`[flag for nurse review]` sentinel rather than inventing a plausible-sounding
limit. This closes the fabrication regression documented in `app/CLAUDE.md`
§2 ("Known regression from the prompt rewrite").

**Not yet validated against a live model** — see
`docs/decisions/0003-prompt-stabilization.md` for what's still needed
(eval corpus + harness) before this can be marked confirmed-fixed rather
than just "the rule now says not to."

## 1.0 — prior (undated)

Rewritten against a real-format Waikato outpatient clinic record: broader
input types (discharge summary, clinic record, letter, consent form), fuller
NZ shorthand disambiguation (`/24`, `/12`, the `x` prefix, compounds like
`3kg/10/7`, non-time slashes like `2/2`), full shorthand glossary, explicit
patient/staff instruction separation. Introduced the Activity Limits
fabrication regression fixed in 1.1.
