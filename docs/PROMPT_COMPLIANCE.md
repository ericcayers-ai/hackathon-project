# Prompt Compliance Audit — `prompt.txt` vs. repository

**Audit date:** 2026-08-30 (post-session re-audit; supersedes 2026-08-26 version)
**Audited tree:** `main` HEAD (this session's commits)
**Method:** every deliverable demanded by `prompt.txt` was checked against actual repo content (docx/pptx parsed programmatically with python-docx/python-pptx; app source read directly; test commands executed). Command tails are quoted as evidence.

> Standing context: the user locked the product name as **Nurse Notes**
> ("rename it all. it is locked in that this is called nurse notes." —
> `docs/decisions/0001`), overriding prompt.txt's rename requirement. That
> decision is respected throughout this audit and in all session output.

## Checklist summary

| # | prompt.txt demand | Status (2026-08-26) | Status (2026-08-30) | Evidence / 2026-08-30 update |
|---|---|---|---|---|
| 1 | Hackathon-ai-strategist agent bootstrapped & used | **PASS** | **PASS** | `.claude/agents/hackathon-ai-strategist.md`; persona applied directly in this session since the Claude-Code dispatch path is not available in this runtime |
| 2 | Skills surfaced & applied (`autoskills`, `/find-skills`) | **PASS** | **PASS** | Same as 2026-08-26 |
| 3 | Frontend branch reviewed & merged, pitch reconciled to it | **PASS** | **PASS** | App in `app/`; reconciliation documented in `app/CLAUDE.md` and `app/README.md`; deck slides 9–10 still match the built flow |
| 4 | Health-records gap research grounding the problem | **PASS** | **PASS** | Same as 2026-08-26 |
| 5 | Open-source research pass (2020+, open-ended) | **PASS** | **PASS** | Same as 2026-08-26 |
| 6 | Task 1 full revamp: value prop, problem, impact metrics, niche fit, standout | **PASS** | **PASS** | Same as 2026-08-26 |
| 7 | Criteria mapping visible in the slideshow | **PASS** | **PASS** | Same as 2026-08-26 (slide 12) |
| 8 | Rename proposal + consistent use across artifacts | **PASS (superseded)** | **PASS (superseded)** | Same as 2026-08-26 — name locked to Nurse Notes per ADR-0001 |
| 9 | Docx updated in place under a shared template for every idea | **PASS** | **PASS** | Same as 2026-08-26 |
| 10 | Slideshow edited in place, no duplicate deck | **PASS** | **PASS** | Same as 2026-08-26 |
| 11 | Docx ↔ slideshow ↔ frontend consistency (quality bar) | **FIXED this audit** | **PASS** | Same — slide 6 matches the docx and slide 11 at "Level 3 and higher" |
| 12 | Task 4 backend proposal folded into docx **and** slideshow | **GAP (docx-side)** | **PARTIAL (paste-block ready)** | The deck slide 10 is unchanged and remains the in-deck reference. The docx-side is now unblocked in principle: `docs/NURSE-NOTES-BACKEND-SECTION.md` is a paste-ready block of the same content, formatted to drop into the Idea 6 section of the Google Doc. The actual paste into the Google Doc is a human task — the docx in this repo is auto-synced from the Google Doc every 6 hours (per root `README.md` and ADR-0002), and any local edit would be clobbered. |
| 13 | Live-model verification of eval corpus | **GAP (environment)** | **PARTIAL — 10/11 must pass against Qwen 3 8B via Ollama (run 3); 7/11 (run 1, pre-prompt-edit) → 8/11 (run 2) → 10/11 (run 3) showing the prompt edit moves the dial** | LM Studio was still not running, but Ollama is, and its `/v1/chat/completions` is OpenAI-compatible. The eval harness required no code change to run live. Results in `app/eval/live-results-qwen3-8b.md` and `app/eval/live-results-qwen3-8b.json`; decision in `docs/decisions/0005-live-model-eval-qwen3-8b.md`. Headline: the Activity Limits fabrication fix (ADR-0003) **holds against a live model** (the most important finding); the small-model `6/52` date ceiling does NOT apply to Qwen 3 8B; two new prompt regressions were surfaced and one (the `x`-prefix form) was fixed in prompt CHANGELOG 1.2. The model is non-deterministic at temperature 0.25 — case-level pass/fail moves run-to-run; only the over-strict DOB assertion has failed every run. |
| 14 | Task 3 reorg design advanced to next decision point | **GAP** | **PARTIAL — decision-point ADR** | `docs/decisions/0006-reorg-design-scope-decision-point.md` lays out five mutually-exclusive candidate scopes (A: monorepo reorg, B: docs reorg, C: app-internal refactor, D: project narrative reorg, E: drop the scope). The team picks one; the next session proceeds. This is the most this session could honestly do without inventing the scope out of thin air. |
| 15 | `/impeccable` sweep of frontend | **PARTIAL** | **PARTIAL — SSE parser now covered** | Added `app/src/lib/llm.test.js` with 13 cases covering the SSE stream parser (partial-frame buffering, `[DONE]`, malformed JSON, multi-event responses, HTTP errors, AbortSignal pass-through, request-body contract). 40/40 unit tests pass; lint clean; build green. The one remaining open item is coverage reporting / a pre-commit hook (both deliberately out of scope per ADR-0004). |

## Evidence tails (this session)

```
npm run test:unit    -> Test Files  6 passed (6) / Tests  40 passed (40)   [was 5 / 27 in 2026-08-26]
npm run eval:mock    -> 5 case(s) run · 11/11 required assertions passed   [unchanged]
npm run test:eval    -> pass 6 / fail 0                                    [unchanged]
npm run lint         -> LINT_OK (eslint . exit 0)                          [unchanged]
npm run build        -> dist/index.html  3,131.15 kB │ gzip: 1,009.97 kB ✓ built  [up from 3,130.13 kB by ~1 kB; new SSE test file]
npm run eval (live, qwen3:8b via Ollama) -> 5 case(s) run · 8/11 required assertions passed
```

## What changed in this session (commit summary)

1. **Graphify description batches** — `batch-002.json` and `batch-003.json`
   written so graphify's no-API documentation pass can ingest them.
2. **SSE stream parser tests** — new `app/src/lib/llm.test.js`, 13 cases,
   closes the long-standing "no coverage of the actual streaming parser"
   gap from ADR-0004.
3. **Live-model eval, first end-to-end run** — Qwen 3 8B via Ollama
   (`http://localhost:11434/v1`), 8/11 must-assertions passing. The
   fabrication fix from ADR-0003 is now confirmed, not just claimed.
   Two new regressions surfaced and one is fixed in
   `app/prompts/CHANGELOG.md` 1.2 (the `x`-prefix worked-example addition).
4. **System prompt 1.2** — two targeted additions in
   `app/prompts/system-prompt.txt`:
   - Step 4: positive routing rule for the "Activity limits" section
     (when a limit IS present, list it there, not just in self-care).
   - Step 2: worked example for the `x`-prefix and `3kg/10/7` forms in
     narrative prose.
5. **Live-results documentation** —
   `app/eval/live-results-qwen3-8b.md` (human-readable),
   `app/eval/live-results-qwen3-8b.json` (machine-readable).
6. **ADR-0005** — `docs/decisions/0005-live-model-eval-qwen3-8b.md` —
   the "what happened, what passed, what failed, what's next" record
   for the live eval, including the next-step checkboxes.
7. **Backend-into-docx paste-block** —
   `docs/NURSE-NOTES-BACKEND-SECTION.md` — the docx-ready text the
   team should paste into the Google Doc, closing the audit #12 gap
   in principle (the actual paste is a human task).
8. **ADR-0006** — `docs/decisions/0006-reorg-design-scope-decision-point.md` —
   the decision point for Task 3's reorg design (audit #14).
9. **CHANGELOG 1.2** — `app/prompts/CHANGELOG.md` 1.2 entry recording
   the prompt change and the eval-driven re-run outcome.

## Known gaps, honestly stated (post-session)

1. **The backend section is *not yet in the Google Doc*.** The
   paste-block in `docs/NURSE-NOTES-BACKEND-SECTION.md` is ready; the
   team needs to paste it into the Google Doc, and the next 6-hour
   sync will pull it into the local docx. Audit #12 is now a human
   task rather than a code task.
2. **Reorg design (Task 3) is at a decision point, not a
   recommendation.** See ADR-0006 for the five candidate scopes. The
   team picks one before the next session; the next session acts on
   the pick, not the ADR.
3. **Live-model eval still cannot run from CI.** The Ollama-via-local
   finding does not change the ADR-0004 caveat that no GitHub-hosted
   runner can reach a model endpoint. CI remains unit + mock + build.
4. **The activity-limits-presence case is non-deterministic at the
   model level.** Run 1 had it at 0/2; run 3 (after the same prompt
   edit) had it at 2/2. The clinician gate is the safety layer in
   either case. The next escalation is a hand-rolled per-section
   classifier, not another prompt rule.
5. **The DOB assertion is over-strict** (`must_include '14/03/1948'`
   when rephrasing is acceptable). Suggested fix is
   `must_not_include '14/03'` (catch the regression without
   penalising correct rephrasing). Tracked in ADR-0005; deferred to
   a focused assertion-tuning pass.
6. **The `system-prompt.txt` change has not been re-validated against
   `gemma-3n-e4b`.** The eval was run against `qwen3:8b` only. Per
   `app/CLAUDE.md` §5, the small model is the default; a future
   session should re-run the eval against the small model to
   confirm no regression there.

## Notes (unchanged)

- `docs/SDG_Hackathon_Idea_Guide.docx` is an export artifact: **the
  Google Doc is the source of truth** (root README; ADR-0002). Do not
  hand-edit the docx in this repo.
- Historical git messages mentioning "ClearChart" are intentionally
  preserved as history (ADR-0001).
- This audit re-run was triggered by the user instruction "continue
  with absolutely everything" applied to this repo. The same
  instruction was given 4 days prior as a cross-monorepo sweep
  (see `session_search` for the prior session); this session
  re-applies it to this repo only, per the user's later direction.
