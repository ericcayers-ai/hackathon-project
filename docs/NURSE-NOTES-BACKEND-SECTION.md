# Nurse Notes — Technical Approach / Backend (paste-ready for the Google Doc)

> **Where this goes:** the master Idea Guide at
> [`docs/SDG_Hackathon_Idea_Guide.docx`](../SDG_Hackathon_Idea_Guide.docx)
> is an auto-synced export of the team's
> [Google Doc](https://docs.google.com/document/d/1v9TGIXIDZ8Q5S1D9JDCVOB71_XFWTghllkWLofQOd0M/edit)
> (per root `README.md`; resolved by ADR-0002). **Any local edit to the
> docx in this repo is clobbered at the next 6-hour sync.** This file is
> the docx-ready text the team should paste into the Google Doc, in the
> Idea 6 (Nurse Notes) section, after the existing "Approach" content
> and before "Build-and-demo" — so the master docx (and therefore the
> local copy after the next sync) finally has a "Technical Approach /
> Backend" subsection that matches the pitch deck slide 10.
>
> Until this lands in the Google Doc, the canonical backend
> description is the pitch deck
> ([`docs/NurseNotes_Pitch.pptx`](../NurseNotes_Pitch.pptx), slide 10)
> and this file. Tracked as audit item #12 in
> [`docs/PROMPT_COMPLIANCE.md`](../PROMPT_COMPLIANCE.md).

---

## Technical Approach / Backend

Nurse Notes runs **entirely on the user's own device**. There is no
custom backend to deploy, no hospital integration to wire up, and no
model to train.

### The four steps (matches pitch deck slide 10)

1. **Ingest and structure.** The clinician loads a synthetic or
   previously-saved discharge summary / consent form. PDF parsing runs
   in the browser using Mozilla's pdf.js (bundled at build time,
   no network); the resulting text is what the model sees.
2. **Rewrite + clinician gate.** A small open-weights model (default
   `google/gemma-3n-e4b`, swappable to `Qwen 3 8B` for cleaner
   output — see "Model choices" below) rewrites the source at a
   6th-grade reading level using the system prompt at
   `app/prompts/system-prompt.txt` (the single source of truth). The
   rewrite **streams token-by-token** into a two-pane review screen
   where a nurse can edit, then explicitly **Approve for release**
   before anything is shown to a patient. The clinician gate is the
   safety design — model output is never sent to a patient
   unedited.
3. **Visual breakdown.** After approval, the export is a patient-facing
   PDF (jsPDF, in-browser) plus a structured view: medication
   timeline, a red-flag "call now" card, and a follow-up calendar.
   Structure does the comprehension work that prose alone cannot.
4. **Language and format.** Re-localisation into te reo Māori and
   Pacific languages is on the demo path; large-print and audio
   output are roadmap items. All require human verification by a
   speaker of the language before release — Right 5 demands it.

### Why the 48-hour hackathon window fits

- PDF extraction: one browser library call (`pdf.js`), no model.
- One structured-extraction call (the rewrite) against a model running
  on `localhost:1234` via the OpenAI-compatible API exposed by LM
  Studio or Ollama.
- The review UI is ordinary CRUD — paste, generate, edit, approve,
  export. No real-time state, no websocket, no auth, no database.
- **Nothing to train, nothing to integrate.**

### Model choices (all on-device, all open-weights)

| Model | Size | Why you would pick it | Why you would not |
|---|---|---|---|
| `google/gemma-3n-e4b` | ~4B params, Q4 quant | Default. Smallest, fastest, fits any laptop. Demonstrates the "tiny on-device model" story. | The model-size ceiling on NZ date shorthand `6/52` (reads as "6 weeks and 5 days") is documented and kept on purpose as a demo of the clinician gate — see `app/CLAUDE.md` §2 and `docs/decisions/0003-prompt-stabilization.md`. |
| `qwen3:8b` (via Ollama) | 8B params, Q4 quant | Cleaner date output (the `6/52` ceiling does **not** apply — confirmed by live eval, `app/eval/live-results-qwen3-8b.md`). Better adherence to prompt rules for narrative-prose shorthand like the `x`-prefix form. | ~2x slower on CPU; needs ~6 GB RAM. Still runs on-device — no cloud. |
| `qwen3-8b-32k` | 8B params, 32K ctx | Same model, longer context. Useful if the team demos multi-document input (e.g. discharge summary + clinic letter) in a single generation. | Heavier; not necessary for the core demo. |

The model's *choice* is decoupled from the *architecture*: swapping
the model is a one-line change in `app/src/lib/llm.js` (the
`DEFAULT_MODEL` constant), or a dropdown in the app's Settings panel
— no rebuild required. The clinician gate and the rest of the safety
design stay the same regardless of model.

### What is *not* in the backend (deliberate)

- **No EHR / hospital system integration.** This is a local demo, not
  a clinical system. No HL7 / FHIR / ManageMyHealth connector.
  Connecting to a real patient record system is a separate, much
  larger project with its own consent, identity, and audit-trail
  requirements.
- **No authentication, no multi-user, no audit log.** A real
  deployment would need at least an audit log of who approved what,
  and that is a 2-day project on its own (separate feature, future
  roadmap).
- **No cloud, no telemetry, no account.** The app makes one outbound
  request and it is to `http://localhost:1234/v1`. The Māori
  data-sovereignty story is grounded in this: data that never moves
  cannot be governed by someone else's jurisdiction.
- **No auto-send of rewrites.** The gate is manual by design. The
  model drafts; the human signs.

### Evidence the design works (vs. is a slide claim)

- **System prompt** — full text at
  [`app/prompts/system-prompt.txt`](../../app/prompts/system-prompt.txt)
  (Changelog 1.1, 1.2 in `app/prompts/CHANGELOG.md`).
- **Eval harness** — 5 corpus cases, 12 assertions, at
  [`app/eval/corpus/cases.mjs`](../../app/eval/corpus/cases.mjs).
  Self-test (`npm run eval:mock`) proves the harness; live-model run
  (`npm run eval --base-url http://localhost:11434/v1 --model qwen3:8b`)
  proves the prompt against a real model — see the live results in
  [`app/eval/live-results-qwen3-8b.md`](../../app/eval/live-results-qwen3-8b.md)
  and the decision in
  [`docs/decisions/0005-live-model-eval-qwen3-8b.md`](../decisions/0005-live-model-eval-qwen3-8b.md).
- **Test suite** — Vitest, 40 tests across 6 files (`npm run test:unit`),
  covering the Flesch–Kincaid + jargon counter, PDF export, text
  extraction (txt / md / pdf), the prompt-drift guard, the approval
  state machine, and the SSE stream parser in `app/src/lib/llm.js`.
  CI at `.github/workflows/ci.yml` runs lint, unit tests, eval mock,
  eval-harness unit tests, and `vite build` on every push to `main`.
- **Linting** — ESLint flat config (`eslint.config.js`), with a real
  bug found on first run (a `no-const-assign` inside the eval
  harness's `try/catch` — see ADR-0004).

### Hackathon buildability — what is on the demo path vs. roadmap

| Item | Status | Time cost |
|---|---|---|
| Working clinician review screen (Vite + React, two panes, edit, approve) | **Built** (`app/src/App.jsx`) | — |
| Streaming rewrite from local model | **Built** (`app/src/lib/llm.js`) | — |
| Synthetic test document | **Built** (`app/samples/synthetic-discharge-01.txt`) | — |
| Patient PDF export (jsPDF) | **Built** (`app/src/lib/pdf.js`) | — |
| Jargon counter on the original pane | **Built** (`app/src/lib/readability.js`) | — |
| Flesch–Kincaid grade on the rewrite pane | **Built** (`app/src/lib/readability.js`) | — |
| Live-model eval harness (5 cases) | **Built and run** (`app/eval/`) | — |
| Single-file offline build (`dist/index.html`) | **Built** (Vite inline base) | — |
| Lint + unit tests + CI | **Built** (`.github/workflows/ci.yml`) | — |
| **Te reo Māori re-localisation** | **Demo path**: a te reo prompt variant is a 1-hour extension of the existing prompt; a speaker-verified glossary is the harder part. | 2-4 hours with a te reo speaker in the room |
| **Pacific-language re-localisation** (Samoan, Tongan) | Roadmap | 4-8 hours per language with a speaker in the room |
| **Handwriting recognition (OCR of handwritten notes)** | Roadmap | A separate model; not realistic in 48 hours without a pre-trained pipeline |
| **ManageMyHealth / patient-portal integration** | Future project | A real, larger project; not in scope |
