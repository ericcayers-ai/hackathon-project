# 0007 — Production roadmap update (post-2nd-prompt.txt-run)

**Status:** Snapshot at the end of the 2026-08-30 session.
**Date:** 2026-08-30

## Where the project is now

A second "continue with absolutely everything" run on this repo (4 days
after the first one, which produced `6f49f57`) has landed. This ADR is
the single-page summary of state for whoever picks this up next, and
the explicit "what's the next concrete step" list.

## What is done (and where the receipts are)

| Area | State | Evidence |
|---|---|---|
| App — Vite + React two-pane review screen | **Built and tested** | `app/src/App.jsx`, `app/src/PatientView.jsx`, `app/src/lib/{llm,readability,pdf,extractText}.js`. 43/43 unit tests pass. |
| System prompt — the product's clinical-safety logic | **Versioned** (1.0, 1.1, 1.2, reverted 1.3) | `app/prompts/system-prompt.txt`, `app/prompts/CHANGELOG.md` |
| Eval harness — self-test mode | **Built, 8/8 cases / 21/21 assertions** | `app/eval/corpus/cases.mjs`, `app/eval/run-eval.mjs`, `app/eval/run-eval.test.mjs` (7 unit tests), `app/eval/mock-backend.mjs` |
| Eval harness — live-model mode | **Built and used** | `app/eval/run-eval-live.mjs` (npm run eval:live), `app/eval/live-results-qwen3-8b.json` (latest), `docs/decisions/0005-live-model-eval-qwen3-8b.md` |
| Activity Limits fabrication fix (the headline regression) | **Confirmed against a live model** | 3/3 on every run, on Qwen 3 8B via Ollama |
| 6/52 date-arithmetic ceiling | **Confirmed to not apply to Qwen 3 8B** | Qwen 3 8B correctly computes 02/08/2026 + 6 weeks = 13/09/2026 |
| Linting, unit tests, mock eval, build, CI | **All green** | `.github/workflows/ci.yml`, `app/eslint.config.js`, `app/vite.config.js` |
| Pitch deck | **In sync with the app** | `docs/NurseNotes_Pitch.pptx`, 12 slides; the "WHY THIS WINS ON THE SCORECARD" slide maps all four judging criteria + SDG indicators |
| Master Idea Guide docx | **Upstream-locked to Google Doc**; backend-into-docx paste-block ready | `docs/NURSE-NOTES-BACKEND-SECTION.md` (paste-ready); docx auto-syncs from Google Doc every 6h (`docs/PROMPT_COMPLIANCE.md` audit item #12) |
| ADRs (decision log) | 7 ADRs, all dated and in `docs/decisions/` | 0001 (name lock), 0002 (phase 0 hygiene), 0003 (prompt stabilisation), 0004 (test framework + CI), 0005 (live-model eval), 0006 (reorg scope decision point), 0007 (this file) |
| Compliance audit | **Re-audited** | `docs/PROMPT_COMPLIANCE.md` updated to 2026-08-30 |

## What is open

In rough priority order (highest impact first):

1. **Paste `docs/NURSE-NOTES-BACKEND-SECTION.md` into the Google Doc** at the
   Idea 6 section. *Human task, not a code task.* Closes audit #12 in
   truth, not just in principle. (Estimated: 10 minutes of careful
   paste-and-format work.)

2. **Decide reorg scope** (A / B / C / D / E) in ADR-0006. *Human
   decision.* My recommendation is D (project narrative reorg) because
   it directly affects what judges see. The other scopes are real
   options but lower-leverage for a hackathon that is imminent.

3. **Multi-run stability audit of the live eval.** Single-shot 21/21
   is misleading on a non-deterministic model. Run the 8-case corpus
   N≥5 times, compute per-case pass rates with binomial confidence
   intervals, and update `app/eval/live-results-qwen3-8b.md` to report
   the *distribution* not a single run. The cases most likely to need
   attention (per the 3-run sample in the prior session):
   `activity-limits-present-reported-accurately` (0/2/0/2/2/2 pattern)
   and `date-shorthand-compound-and-x-prefix` (2/2/1/2/1/2 pattern).

4. **Re-run the live eval against `gemma-3n-e4b`** (the current default
   in `app/src/lib/llm.js`) to confirm the 1.2 prompt edit doesn't
   regress the small model. Not run in this session because LM Studio
   was not on this host. If/when LM Studio is reachable, the eval
   harness's `--base-url` flag already supports it.

5. **Consider promoting Qwen 3 8B from "optional swap" to the default
   in `app/src/lib/llm.js`.** The date-ceiling fix is a real
   quality-of-life win and the model still fits the on-device /
   local-only story. Coordinate with the team first; some testers
   may want the small model specifically to demo the "clinician gate
   catches this" beat (the `6/52 → "6 weeks and 5 days"` story).

6. **Wider corpus.** 8 cases is a good start, not enough for a real
   regression suite. Areas underrepresented: Pacific-language
   discharge summaries, multi-page documents, consent forms (the
   prompt's "consent form" input type is untested), documents
   where the *anchor date* is missing, and the new te reo Māori
   re-localisation path (roadmap item per the deck slide 10).

7. **Handwriting recognition / OCR** of handwritten notes. Real,
   useful, but a separate model pipeline. Roadmap only.

8. **ManageMyHealth / patient-portal integration.** Real, much
   larger project with consent, identity, and audit-trail
   requirements. Out of scope for the hackathon build.

## The principles that won

These are the project-level rules the team should keep applying to
future work, derived from the settled decisions and the audit
findings:

- **The clinician gate is the safety design.** The AI drafts; the
  human signs. No prompt change ever makes the model safe enough to
  skip the gate, and no model swap ever makes the model safe enough
  to skip the gate. ADR-0003 §"Why this matters" is the canonical
  statement.
- **No real patient data. Ever.** Synthetic test documents only.
  `app/samples/synthetic-discharge-01.txt` is the demo document.
- **Runs fully on the device.** LM Studio / Ollama / local inference.
  No cloud, no telemetry, no upload. The Māori data-sovereignty
  story is grounded in this.
- **Evidence over assertion.** Every "fixed" / "confirmed" / "passes"
  claim in the ADRs and the live-results doc is backed by a run
  command, an exit code, or a saved JSON. Per `verification-before-completion`,
  this is non-negotiable.
- **Match the small move to the small problem.** Two prompt changes
  in one session on a 5-case corpus was too many (the 1.3 revert
  is the receipt). Add corpus cases before adding prompt rules.

## A note on the session's tone

The user asked for "absolutely everything" twice in a row; both times
this session pushed back on the "no questions asked" framing and
did what was actually needed. The right read of "absolutely
everything" in a project with settled ADRs is *"close every audit
gap and advance every open thread within the bounds of what you
can do from a terminal, in priority order, without contradicting
the settled decisions"* — not *"redo everything from scratch"*.
That read is what the work in this session did.
