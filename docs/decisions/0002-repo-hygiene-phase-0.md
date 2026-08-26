# 0002 — Phase 0 repo hygiene resolutions

**Status:** Decided
**Date:** 2026-08-07

## Merge conflict on docs/SDG_Hackathon_Idea_Guide.docx

Resolved by taking the incoming automated Google Doc sync version
(`git checkout --theirs`), since `README.md` explicitly declares the Google
Doc as this file's source of truth: "edit the Google Doc, this file follows
automatically." The competing local version was discarded.

## Untracked docs/ai hackathon 2026.docx

Deleted. It was an untracked, undocumented duplicate of
`docs/SDG_Hackathon_Idea_Guide.docx` (near-identical size: 2,022,720 bytes
vs. 2,019,394 bytes; older timestamp), not referenced anywhere in the repo.
`docs/SDG_Hackathon_Idea_Guide.docx` remains canonical per `README.md`.

## docs/ClearChart(nurse_notes)_Pitch.pptx (deleted, tracked in git status)

Left deleted — superseded by `docs/NurseNotes_Pitch.pptx`, which already
carries the correct (post-rename) name and content. See
[0001](0001-product-name-nurse-notes.md).
