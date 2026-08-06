# Graph Report - .  (2026-08-06)

## Corpus Check
- Large corpus: 25 files · ~639,477 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 57 nodes · 65 edges · 15 communities detected
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output
- Edge kinds: ON_BRANCH: 17 · PARENT_OF: 17 · conceptually_related_to: 13 · contains: 8 · references: 4 · shares_data_with: 3 · calls: 2 · rationale_for: 1


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 25 · Candidates: 80
- Excluded: 3 untracked · 1 ignored · 1 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `68fc5be`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `README.md (Hackathon-Project)` - 3 edges
2. `IDEATION.txt (earlier plain-text draft)` - 3 edges
3. `IoT Sensor/Gateway Device` - 3 edges
4. `Universal Jargon Interpreter App` - 3 edges
5. `add_hyperlink()` - 2 edges
6. `labelled()` - 2 edges
7. `shade()` - 2 edges
8. `make_table()` - 2 edges
9. `source_line()` - 2 edges
10. `SDG Hackathon Idea Guide (Google Doc)` - 2 edges

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
Cohesion: 0.32
Nodes (12): main, 0c25dcb Fix sync-gdoc: git diff --quiet misses new untracked file, 16bda27 Sync Google Doc export [automated], 2dff076 Sync Google Doc export [automated], 49b68c9 Organize docs etc, 68fc5be Update prompt file, 6a71f12 Add hackathon-ai-strategist subagent and wire it into CLAUDE.md routing rules, 7c83d44 Add scheduled GitHub Action to sync Google Doc export into repo (+4 more)

### Community 1 - "Community 1"
Cohesion: 0.24
Nodes (6): add_hyperlink(), labelled(), make_table(), Bold inline label followed by body text., shade(), source_line()

### Community 2 - "Community 2"
Cohesion: 0.33
Nodes (6): Dose-Disposition Quarantine Alert, Cold Chain Monitor Concept Image, Medical Refrigerator/Vaccine Storage Unit, IoT Sensor/Gateway Device, Tamper-Evident Log, Temperature Excursion Chart

### Community 3 - "Community 3"
Cohesion: 0.40
Nodes (6): 1563e36 Add files via upload, 460c9ed Delete AI Hackathon 2026 - Ideation.docx, 4f6b143 Merge README from origin, 5821624 Claude workflow setup and current plan, c5761bd Initial hackathon project commit, d193f55 Merge remote-tracking branch 'origin/main'

### Community 4 - "Community 4"
Cohesion: 0.50
Nodes (5): CLAUDE.md (Hackathon-Project), IDEATION.txt (earlier plain-text draft), SDG Hackathon Idea Guide (Google Doc), AI Hackathon Festival 2026 - Participant Info PDF, README.md (Hackathon-Project)

### Community 5 - "Community 5"
Cohesion: 0.67
Nodes (4): Camera Scan Split-View UI, Target Documents (Prescription, Tenancy Agreement), Verified Plain-Language Summary Card, Universal Jargon Interpreter App

### Community 6 - "Community 6"
Cohesion: 0.67
Nodes (3): Surplus Food Allocation / Food Rescue Concept, Ranked Recipient Locations List (1-2-3 pins), Food Safety Verification Icon (Shield Checkmark)

### Community 7 - "Community 7"
Cohesion: 1.00
Nodes (3): Crisis Response Allocation Engine Diagram, Flood Risk Heatmap / Road Network Map, Supply Chain Flow: Food Pallet to Evacuation Centre

### Community 8 - "Community 8"
Cohesion: 1.00
Nodes (2): Surplus Matching for Growers Concept Image, Surplus Matching App UI (Tablet Mockup)

### Community 9 - "Community 9"
Cohesion: 1.00
Nodes (1): Disability Funding Reassessment Dashboard Illustration

### Community 10 - "Community 10"
Cohesion: 1.00
Nodes (1): E-Waste Routing Concept Image

### Community 11 - "Community 11"
Cohesion: 1.00
Nodes (1): Neighbourhood SDG Indicator Map Mockup

### Community 12 - "Community 12"
Cohesion: 1.00
Nodes (1): Patient Health Literacy Tablet UI

### Community 13 - "Community 13"
Cohesion: 1.00
Nodes (1): Disaster Recovery Shocks - Emergency Response Dashboard

### Community 14 - "Community 14"
Cohesion: 1.00
Nodes (1): AI Hackathon 2026 Summary PDF

## Knowledge Gaps
- **17 isolated node(s):** `Bold inline label followed by body text.`, `CLAUDE.md (Hackathon-Project)`, `AI Hackathon Festival 2026 - Participant Info PDF`, `AI Hackathon 2026 Summary PDF`, `Cold Chain Monitor Concept Image` (+12 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 8`** (2 nodes): `Surplus Matching for Growers Concept Image`, `Surplus Matching App UI (Tablet Mockup)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 9`** (1 nodes): `Disability Funding Reassessment Dashboard Illustration`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 10`** (1 nodes): `E-Waste Routing Concept Image`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 11`** (1 nodes): `Neighbourhood SDG Indicator Map Mockup`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 12`** (1 nodes): `Patient Health Literacy Tablet UI`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (1 nodes): `Disaster Recovery Shocks - Emergency Response Dashboard`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (1 nodes): `AI Hackathon 2026 Summary PDF`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `Bold inline label followed by body text.`, `CLAUDE.md (Hackathon-Project)`, `AI Hackathon Festival 2026 - Participant Info PDF` to the rest of the system?**
  _17 weakly-connected nodes found - possible documentation gaps or missing edges._