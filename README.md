# AI Hackathon Festival 2026 — Waikato

Prep repo for the University of Waikato AI Hackathon Festival (SDG-focused, 2 days, teams of 3–7).

## Structure

- `docs/` — the deliverable and source briefs
  - `SDG_Hackathon_Idea_Guide.docx` — main ideation doc (10 ideas, judging notes, pitch structure, concept images). Synced from the team's [Google Doc](https://docs.google.com/document/d/1v9TGIXIDZ8Q5S1D9JDCVOB71_XFWTghllkWLofQOd0M/edit) every 6 hours via GitHub Action — edit the Google Doc, this file follows automatically.
  - `IDEATION.txt` — earlier plain-text ideation draft (superseded by the docx, kept for history)
  - `AI Hackathon Festival 2026 - Participant Info.pdf` — official event brief (schedule, venue, judging, rules)
  - `ai-hackathon-2026-summary.pdf` — shorter derived summary
- `assets/images/` — concept illustrations, one per idea, embedded in the docx
- `tools/` — supporting scripts
  - `build_docx.py` — original docx generator (superseded by the live Google Doc sync)
  - `LLM-TokenOptimizer.ps1` — unrelated local dev tooling
- `.github/workflows/sync-gdoc.yml` — pulls the Google Doc export into `docs/SDG_Hackathon_Idea_Guide.docx` on a schedule

## Sync

The Google Doc is the source of truth. To force an immediate sync instead of waiting for the schedule:

```
gh workflow run sync-gdoc.yml
```
