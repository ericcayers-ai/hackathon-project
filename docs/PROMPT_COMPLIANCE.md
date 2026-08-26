# Prompt Compliance Audit — `prompt.txt` vs. repository

**Audit date:** 2026-08-26 · **Audited tree:** `main` @ `0610566` (post-rebase onto `origin/main` = `6619a43`)
**Method:** every deliverable demanded by `prompt.txt` was checked against actual repo content (docx/pptx parsed programmatically with python-docx/python-pptx; app source read directly; test commands executed). Command tails are quoted as evidence.

> Standing context: the user later locked the product name back to **Nurse Notes**
> ("rename it all. it is locked in that this is called nurse notes." —
> `docs/decisions/0001`), overriding prompt.txt's rename requirement. That
> decision is respected throughout this audit.

## Checklist summary

| # | prompt.txt demand | Status | Evidence |
|---|---|---|---|
| 1 | Hackathon-ai-strategist agent bootstrapped & used | **PASS** | `.claude/agents/hackathon-ai-strategist.md` tracked in repo |
| 2 | Skills surfaced & applied (`autoskills`, `/find-skills`) | **PASS** | `.claude/skills/{accessibility,frontend-design,seo}`, `.agents/skills/*`, `.continue/skills/*`, `skills-lock.json` |
| 3 | Frontend branch reviewed & merged, pitch reconciled to it | **PASS** | Working app in `app/`; README/app-CLAUDE.md document the reconciliation; deck slide 9/10 describe the built flow accurately |
| 4 | Health-records gap research grounding the problem | **PASS** | Guide docx Idea 6: HQSC 56% figure, Pacific ~90%, 16.1% readmissions, Right 5 legal framing, all sourced in docx Sources §Health literacy |
| 5 | Open-source research pass (2020+, open-ended) | **PASS** | docx Idea 10: WebLLM (arXiv 2412.15803), WebGPU on-device inference, Māori data-sovereignty alignment; deck slide 12 tech claims match |
| 6 | Task 1 full revamp: value prop, problem, impact metrics, niche fit, standout | **PASS** | Deck slides 2–7 & 9–11 carry the sharpened framing (legal-right hook, Kessels memory stat, PIAAC levels, clinician gate); docx Idea 6 carries the same claims |
| 7 | Criteria mapping visible **in the slideshow** | **PASS** | Slide 12 "WHY THIS WINS ON THE SCORECARD" maps all four official criteria + SDG indicators |
| 8 | Rename proposal + consistent use across artifacts | **PASS (superseded)** | Renamed to ClearChart mid-project, then reverted to Nurse Notes by explicit user lock-in (ADR-0001); name is now consistent everywhere (0 stray "ClearChart" strings in either Office file) |
| 9 | Docx updated in place under a shared template for **every** idea | **PASS** | All 10 ideas present with uniform Problem/SDG/Approach/Build-and-demo/Risks structure; comparison table scores Ideas 1–8 + 10 |
| 10 | Slideshow edited **in place**, no duplicate deck | **PASS** | Single `docs/NurseNotes_Pitch.pptx` (12 slides); superseded `ClearChart(nurse_notes)_Pitch.pptx` deleted from HEAD |
| 11 | Docx ↔ slideshow ↔ frontend consistency (quality bar) | **FIXED this audit** | Deck slide 6 claimed medical files sit at "Level 4 & above"; the source-of-truth docx and deck slide 11 both say **Level 3 and higher** (PIAAC). Slide 6 corrected to match |
| 12 | Task 4 backend proposal folded into docx **and** slideshow | **GAP (docx-side)** | Deck slide 10 documents the concrete backend plan (PDF extraction → structured-extraction call → rewrite call → review screen; "nothing to train, nothing to integrate"). The docx has **no corresponding "Technical Approach / Backend" section** — it lives only in condensed slide form. Not fixable here: the Guide docx is auto-synced from the team's Google Doc every 6h (`sync-gdoc.yml`, root README); local edits would be clobbered at the next sync |
| 13 | Live-model verification of eval corpus | **GAP (environment)** | Eval harness + mock self-tests pass (`eval:mock` 11/11, `test:eval` 6/6) proving harness logic; `npm run eval` against live LM Studio (`google/gemma-3n-e4b`) remains unrun — documented openly in `docs/decisions/0003` (LM Studio unavailable during sessions). Fabrication-rule fix is prompt-side only until then |
| 14 | Task 3 reorg design advanced to next decision point | **GAP** | No reorg-design artifact anywhere in the repo (searched md/txt/mjs/jsx/json/yml: 0 hits for "reorg"). prompt.txt itself carried "[No further context on this was available…]" — the thread appears never picked up |
| 15 | `/impeccable` sweep of frontend | **PARTIAL** | Phase 2 added the first real safety net (ESLint caught a latent crash bug in the eval runner — ADR-0004); lint clean, 27/27 unit tests, build green. SSE-stream parsing in `llm.js` remains untested (open item listed in ADR-0004) |

## Evidence tails

```
npm run lint        -> LINT_OK (eslint . exit 0)
npm run test:unit   -> Test Files  5 passed (5) / Tests  27 passed (27)
npm run eval:mock   -> 5 case(s) run · 11/11 required assertions passed
npm run test:eval   -> pass 6 / fail 0
npm run build       -> dist/index.html  3,130.13 kB │ gzip: 1,009.65 kB ✓ built
```

One real defect was found and fixed during audit: `pdf.test.js`'s prompt-drift
guard anchored its regex on bare `\n\n`, which fails on Windows working trees
where `core.autocrlf=true` materialises the prompt file as CRLF (committed blob
is LF-only; Linux CI unaffected). Fixed by normalising CRLF→LF after
`readFileSync`.

## Known gaps, honestly stated

1. **Backend section missing from the master docx** (item 12). The content
   exists — it is simply on the wrong side of the docx↔deck split, and the docx
   is upstream-owned (Google Doc sync). The team must paste the slide-10
   material into the Google Doc itself.
2. **Reorg-design scoping (Task 3) has no artifact** (item 14). Either it was
   handled outside the repo or dropped. Needs a human decision on where it
   should live.
3. **Live-model eval not run** (item 13). Requires LM Studio running locally;
   everything short of that is proven by tests.
4. The docx still frames the idea as "Patient Health Literacy and Informed
   Consent" (Idea 6) rather than carrying a dedicated Nurse Notes entry with
   the deck's sharper metrics (e.g. Kessels 20%→97% claim). Same upstream-sync
   constraint as gap 1.

## Notes

- `docs/SDG_Hackathon_Idea_Guide.docx` is an export artifact: **the Google Doc
  is the source of truth** (root README; ADR-0002 resolved a prior conflict by
  deferring to it). Do not hand-edit the docx in this repo.
- Historical git messages mentioning "ClearChart" are intentionally preserved
  as history (ADR-0001).
