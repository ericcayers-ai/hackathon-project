# system-prompt.txt changelog

`system-prompt.txt` is imported raw (`?raw`) by `app/src/lib/llm.js` and sent
verbatim as the model's system message — it must contain nothing but the
prompt itself. Every edit to it is recorded here instead, per the Phase 6
prompt change-control policy in the production roadmap
(`docs/decisions/0003-prompt-stabilization.md`).

## 1.3 — 2026-08-30 (REVERTED — see note)

Added an explicit "ANTI-OVER-CORRECTION" paragraph under the Step 4
"Activity limits" rule. The 1.2 rule said the section MUST list a limit
when one is present. The 1.3 rule spelled out three concrete bad
patterns to avoid (limits only in self-care, duplicated verbatim in
both sections, over-paraphrase).

**Result:** 3-run re-eval showed 1.3 is probably net negative on this
5-case corpus. The activity-limits-presence case stayed non-deterministic
(0/2, 0/2, 2/2 — same as 1.2), the `x`-prefix compound case got
slightly worse (2/2 → 1/2 → 1/2), and a NEW fabrication appeared in
the heart-failure case ("Do not lift heavy objects or bend your hip
more than 90 degrees for 6 weeks" for a patient with no such limit in
the source). The 1.3 rule appeared to nudge the model on a different
case than the one it was targeting.

**Reverted in the same session.** The 1.3 paragraph is removed from
`system-prompt.txt`; the prompt is back to the post-1.2 baseline. The
3-run JSON in `app/eval/live-results-qwen3-8b-run1/2/3.json` is
preserved as evidence of what 1.3 did, so future work on this
question has data to look at. The CHANGELOG entry is kept as a
historical record of the attempt, not a current change.

**Why this is documented in the changelog and not just in the
ADR:** future sessions loading this prompt should not re-attempt 1.3
in isolation without first reading the 3-run JSON and the §4 finding
in `docs/decisions/0005`. The next session's correct first move on
this question is **to add more corpus cases** (Qwen-specific
behaviour, isolated `2/2` form, dose-change form) so the
over-correction case has more statistical power, not to try another
prompt rule.

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
