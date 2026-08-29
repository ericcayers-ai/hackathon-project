# 0006 — Reorg design scoping: from "no context" to a decision point

**Status:** Decision point — needs human input to proceed
**Date:** 2026-08-30

## What this is (and what it isn't)

`prompt.txt` carries a Task 3 that begins:

> "Continue scoping the reorg design from exactly where it stands —
> pick up the open threads, don't restart, and move it forward to the
> next concrete decision point or points."

The same brief then admits, in the very next paragraph:

> "[No further context on this was available when this prompt was
> written — add specifics here if you want to redirect or narrow it.]"

That admission is accurate. A grep across the repo for "reorg" returns
zero hits in `*.md`, `*.txt`, `*.json`, `*.yml`, and `*.jsx`
(`rg -w reorg` over the working tree, excluding `node_modules/`).
There is no in-repo note, ADR, or design doc that names what the
"reorg" is a reorg *of* — repositories, teams, the documentation
tree, the codebase, the pitch narrative, or something else entirely.

The PROMPT_COMPLIANCE.md audit (2026-08-26) flagged this as item #14
and explicitly called it out: *"Either it was handled outside the repo
or dropped. Needs a human decision on where it should live."*

This ADR is **not** an attempt to design a reorg. It is the decision
point the prompt itself asked for: a small set of mutually-exclusive
scopes, each with one paragraph of what that scope would mean, so the
team can pick one and the next session can start there.

## Why we are not designing in this session

The brief's quality bar is *"no gaps, no mistakes, no contradictions
… exhaustive, not abbreviated."* A "reorg design" without a defined
scope is a guess, and a guess at the scope of an unbounded
restructuring exercise is exactly the kind of thing that produces
gaps and contradictions. A wrong guess here is more expensive than
no guess at all.

I also considered treating the absence of a reorg design as a
positive signal — that the prior sessions already did the reorg
implicitly, and the audit's "never picked up" reading is the
correct one. That is plausible, but the brief's framing ("the
reorg design … move it forward to the next concrete decision
point") strongly implies there *is* a reorg in progress. So I
do not want to declare it implicitly done without confirmation.

## Candidate scopes (pick one)

These are mutually exclusive. Each is a small enough scope to be
executable in a focused session, and each is the kind of thing that
"reorg" naturally means in a hackathon-prep context.

### A. **Repository / monorepo reorg** — re-lay out the Programs monorepo

What it would do: move the Hackathon-Project from a sibling of
38 other projects under `C:\Users\ericc\OneDrive\Desktop\Programs`
(see `Programs/PROJECTS.md`, 33+ projects) into a more discoverable
structure — for example, grouping by `active/`, `archive/`, and
`hackathons/2026-waikato-nurse-notes/`, or moving to a per-team
multi-repo layout.

Pros: discoverability, future hackathon prep, sets the pattern for
other hackathons.

Cons: large blast radius; touches every project; risks breaking
the `~/.claude/`, `~/.graphify/`, and the `Programs/PROGRAMS-FULL-INDEX.md`
references; one-dotfile-at-a-time migration is genuinely painful.

**Likely if:** the team is doing more hackathons, or wants the
Hackathon-Project to "graduate" into something reusable.

### B. **Documentation / repo layout reorg** — re-lay out the Nurse Notes repo

What it would do: keep the repo as-is but re-organize the *inside* —
split the single source-of-truth `prompt.txt` into multiple smaller
docs, move decisions to a more discoverable structure, group
"docs/PROMPT_COMPLIANCE.md" with the ADRs, etc.

Pros: contained blast radius; improves the actual on-disk
discoverability; plays well with the existing ADR pattern.

Cons: cosmetic; the current layout works; ADRs are already
discoverable; the brief itself fits the repo as-is.

**Likely if:** the team finds itself repeatedly unable to find a
document, or the docs/ folder is feeling like a junk drawer.

### C. **App-internal reorg** — refactor the Nurse Notes app

What it would do: lift the `App.jsx` / `PatientView.jsx` /
`src/lib/*` structure into a more idiomatic React layout — for
example, extracting the approval state machine into a custom hook,
moving readability / PDF / LLM / extractText into a `src/features/`
tree instead of `src/lib/`.

Pros: builds a foundation for the next 6 features on the
roadmap (te reo localisation, Pacific-language localisation,
handwriting OCR, ManageMyHealth integration, audit log, model
swap-as-default); pays off the technical debt now rather than
later.

Cons: high churn; a refactor for refactor's sake is a real
risk; the app currently works.

**Likely if:** the team is about to ship 2+ substantial new
features, or the next dev who opens `App.jsx` will struggle.

### D. **Project narrative / pitch reorg** — restructure the docx and pptx as a single coherent story

What it would do: take the 10 ideas in the master docx, the
Nurse Notes pitch deck, the eval corpus, the ADRs, and the
clinician review app, and tell a single end-to-end story across
all of them — same stats in the same places, same terminology, same
criteria mapping, same demo flow.

Pros: highest-impact for a hackathon; judges see one story not ten
fragments; ties the technical work to the pitch.

Cons: the docx is upstream-locked to the Google Doc; the team
has to do the work in the Google Doc and re-sync; risks
re-litigating settled decisions (e.g. ADR-0001's name lock).

**Likely if:** the team is in the "48 hours to pitch" zone and
needs to make sure everything tells the same story.

### E. **Drop the reorg scope entirely** — reorg was implicitly done in earlier sessions

What it would do: declare, with the team's agreement, that the
reorg the brief refers to is already complete (or was never
needed), update the audit to mark item #14 PASS, and move on.

Pros: zero work, unblocks Task 3 from the brief.

Cons: if the reorg was actually needed, this leaves the gap open.

**Likely if:** when the team looks at the repo they cannot
identify anything that needs re-organising, and the brief was
referring to a reorg that earlier sessions handled or that was
moot.

## What I recommend

**D — Project narrative reorg**, but only as far as the audit's
open items already point (backend-into-docx via the Google Doc
paste-block in `docs/NURSE-NOTES-BACKEND-SECTION.md`, plus the
Nurse Notes section in the docx getting the same sharpened metrics
as the deck). D is the highest-leverage option and the only one
that directly affects the judges' experience.

The other open items (A, B, C) are not the right place to spend
hackathon-prep time. E is the right answer only if D (and A/B/C)
are also not the right answer — i.e. if the team is happy with the
state of the repo and the pitch as-is.

## Decision needed

The team should pick one of A / B / C / D / E above. The next
session will start from that choice, not from this ADR.
