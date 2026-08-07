# system-prompt.txt changelog

`system-prompt.txt` is imported raw (`?raw`) by `app/src/lib/llm.js` and sent
verbatim as the model's system message — it must contain nothing but the
prompt itself. Every edit to it is recorded here instead, per the Phase 6
prompt change-control policy in the production roadmap
(`docs/decisions/0003-prompt-stabilization.md`).

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
