# Graph Report - .  (2026-08-12)

## Corpus Check
- Large corpus: 83 files · ~671,308 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 143 nodes · 227 edges · 21 communities detected
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output
- Edge kinds: contains: 61 · ON_BRANCH: 55 · PARENT_OF: 34 · MODIFIES: 22 · calls: 17 · conceptually_related_to: 13 · imports: 12 · imports_from: 4 · references: 4 · shares_data_with: 3 · rationale_for: 2


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 83 · Candidates: 128
- Excluded: 13 untracked · 12850 ignored · 1 sensitive · 1 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `213a931`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `checkAssertion()` - 4 edges
2. `main()` - 4 edges
3. `cases` - 3 edges
4. `extractSection()` - 3 edges
5. `runCase()` - 3 edges
6. `useSpeech()` - 3 edges
7. `extractText()` - 3 edges
8. `buildPatientPdf()` - 3 edges
9. `downloadPatientPdf()` - 3 edges
10. `readingGrade()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `IDEATION.txt (earlier plain-text draft)` --conceptually_related_to--> `SDG Hackathon Idea Guide (Google Doc)`  [INFERRED]
  docs/IDEATION.txt → .github/workflows/sync-gdoc.yml
- `CLAUDE.md (Hackathon-Project)` --references--> `IDEATION.txt (earlier plain-text draft)`  [EXTRACTED]
  CLAUDE.md → docs/IDEATION.txt
- `README.md (Hackathon-Project)` --references--> `IDEATION.txt (earlier plain-text draft)`  [EXTRACTED]
  README.md → docs/IDEATION.txt
- `README.md (Hackathon-Project)` --references--> `SDG Hackathon Idea Guide (Google Doc)`  [EXTRACTED]
  README.md → .github/workflows/sync-gdoc.yml
- `README.md (Hackathon-Project)` --references--> `AI Hackathon Festival 2026 - Participant Info PDF`  [EXTRACTED]
  README.md → .graphify/converted/pdf/AI_Hackathon_Festival_2026_-_Participant_Info_88eebc4a5b4d.md

## Hyperedges (group relationships)
- **Hackathon Ideation Documentation Chain** — readme_hackathon_project, gdoc_sdg_hackathon_idea_guide, docs_ideation_txt, sync-gdoc_workflow [EXTRACTED 0.90]

## Communities

### Community 0 - "Community 0"
Cohesion: 0.24
Nodes (23): main, worktree-nurse-notes-ui-overhaul, 0c25dcb Fix sync-gdoc: git diff --quiet misses new untracked file, 1563e36 Add files via upload, 16bda27 Sync Google Doc export [automated], 23bc223 Merge remote-tracking branch 'origin/main' into main, 2db3f5d Sync Google Doc export [automated], 2dff076 Sync Google Doc export [automated] (+15 more)

### Community 1 - "Community 1"
Cohesion: 0.17
Nodes (15): 213a931 Phase 1: build prompt eval harness (app/eval/), 32a6cc8 Untrack graphify session state (branch.json, worktree.json, cache/), 6991cd0 Phase 1 (partial): fix Activity Limits fabrication in system prompt, cases, mockChat(), RESPONSES, checkAssertion(), __dirname (+7 more)

### Community 2 - "Community 2"
Cohesion: 0.12
Nodes (12): extractPdf(), extractText(), generateRewrite(), ACRONYM_RE, ACRONYMS, countJargon(), countSentences(), gradeLabel() (+4 more)

### Community 3 - "Community 3"
Cohesion: 0.18
Nodes (13): proxy, 0f4a291 Overhaul pptx design, fix duplicate/overclaim bugs, add PIAAC reading-level section to docx, 3edbcc3 Phase 0: rename ClearChart back to Nurse Notes; repo hygiene, 7ed0528 Sync Google Doc export [automated], 8c94bf0 Rename ClearChart to Nurse Notes; install Impeccable and overhaul UI identity, a64c5a6 Sync Google Doc export [automated], c4efce6 Merge upstream Nurse-Notes improvements: better prompt, cleaner PatientView, d2fe56b Sync Google Doc export [automated] (+5 more)

### Community 4 - "Community 4"
Cohesion: 0.24
Nodes (6): add_hyperlink(), labelled(), make_table(), Bold inline label followed by body text., shade(), source_line()

### Community 5 - "Community 5"
Cohesion: 0.24
Nodes (6): add_hyperlink(), labelled(), make_table(), Bold inline label followed by body text., shade(), source_line()

### Community 6 - "Community 6"
Cohesion: 0.33
Nodes (6): Dose-Disposition Quarantine Alert, Cold Chain Monitor Concept Image, Medical Refrigerator/Vaccine Storage Unit, IoT Sensor/Gateway Device, Tamper-Evident Log, Temperature Excursion Chart

### Community 7 - "Community 7"
Cohesion: 0.50
Nodes (5): CLAUDE.md (Hackathon-Project), IDEATION.txt (earlier plain-text draft), SDG Hackathon Idea Guide (Google Doc), AI Hackathon Festival 2026 - Participant Info PDF, README.md (Hackathon-Project)

### Community 8 - "Community 8"
Cohesion: 0.60
Nodes (4): buildPatientPdf(), downloadPatientPdf(), isHeading(), KNOWN_HEADINGS

### Community 10 - "Community 10"
Cohesion: 0.67
Nodes (4): Camera Scan Split-View UI, Target Documents (Prescription, Tenancy Agreement), Verified Plain-Language Summary Card, Universal Jargon Interpreter App

### Community 11 - "Community 11"
Cohesion: 0.83
Nodes (3): PatientView(), speakSupported(), useSpeech()

### Community 12 - "Community 12"
Cohesion: 0.67
Nodes (3): Surplus Food Allocation / Food Rescue Concept, Ranked Recipient Locations List (1-2-3 pins), Food Safety Verification Icon (Shield Checkmark)

### Community 13 - "Community 13"
Cohesion: 1.00
Nodes (3): Crisis Response Allocation Engine Diagram, Flood Risk Heatmap / Road Network Map, Supply Chain Flow: Food Pallet to Evacuation Centre

### Community 14 - "Community 14"
Cohesion: 1.00
Nodes (2): Surplus Matching for Growers Concept Image, Surplus Matching App UI (Tablet Mockup)

### Community 15 - "Community 15"
Cohesion: 1.00
Nodes (1): proxy

### Community 16 - "Community 16"
Cohesion: 1.00
Nodes (1): Disability Funding Reassessment Dashboard Illustration

### Community 17 - "Community 17"
Cohesion: 1.00
Nodes (1): E-Waste Routing Concept Image

### Community 18 - "Community 18"
Cohesion: 1.00
Nodes (1): Neighbourhood SDG Indicator Map Mockup

### Community 19 - "Community 19"
Cohesion: 1.00
Nodes (1): Patient Health Literacy Tablet UI

### Community 20 - "Community 20"
Cohesion: 1.00
Nodes (1): Disaster Recovery Shocks - Emergency Response Dashboard

### Community 21 - "Community 21"
Cohesion: 1.00
Nodes (1): AI Hackathon 2026 Summary PDF

## Knowledge Gaps
- **30 isolated node(s):** `RESPONSES`, `__dirname`, `SYSTEM_PROMPT`, `HEADINGS`, `KNOWN_HEADINGS` (+25 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 14`** (2 nodes): `Surplus Matching for Growers Concept Image`, `Surplus Matching App UI (Tablet Mockup)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 15`** (1 nodes): `proxy`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 16`** (1 nodes): `Disability Funding Reassessment Dashboard Illustration`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 17`** (1 nodes): `E-Waste Routing Concept Image`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (1 nodes): `Neighbourhood SDG Indicator Map Mockup`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (1 nodes): `Patient Health Literacy Tablet UI`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (1 nodes): `Disaster Recovery Shocks - Emergency Response Dashboard`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (1 nodes): `AI Hackathon 2026 Summary PDF`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `GradeBadge()` connect `Community 3` to `Community 2`?**
  _High betweenness centrality (0.002) - this node is a cross-community bridge._
- **What connects `RESPONSES`, `__dirname`, `SYSTEM_PROMPT` to the rest of the system?**
  _30 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.12105263157894737 - nodes in this community are weakly interconnected._