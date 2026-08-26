# 0001 — Product name is locked as "Nurse Notes"

**Status:** Decided
**Date:** 2026-08-07

## Decision

The product is named **Nurse Notes**. Mid-hackathon the team renamed it to
"ClearChart" and documented that rename as final throughout `app/CLAUDE.md`
and `app/README.md`. That rename has been reversed — "Nurse Notes" is the
locked, final name going forward.

## Scope of the change

Working-tree branding was reverted across:
`app/index.html`, `app/src/App.jsx`, `app/package.json`, `app/CLAUDE.md`,
`app/README.md`, root `README.md`.

`docs/NurseNotes_Pitch.pptx` and `docs/SDG_Hackathon_Idea_Guide.docx` were
checked for leftover "ClearChart" text and had none.

Historical git commit messages that reference "ClearChart" (e.g. "Fix
ClearChart branding in live frontend") were **not** rewritten — they're an
accurate record of what happened at the time.

## Why

User direction, explicit and final: "rename it all. it is locked in that
this is called nurse notes."
