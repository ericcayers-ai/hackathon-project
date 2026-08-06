# Graph Report - .  (2026-08-06)

## Corpus Check
- Large corpus: 18 files · ~613,430 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 41 nodes · 34 edges · 13 communities detected
- Extraction: 85% EXTRACTED · 15% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output
- Edge kinds: conceptually_related_to: 13 · contains: 8 · references: 7 · shares_data_with: 3 · calls: 2 · rationale_for: 1


## Input Scope
- Requested: auto
- Resolved: committed (source: cli)
- Included files: 18 · Candidates: 25
- Excluded: 6 untracked · 1 ignored · 1 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.
## God Nodes (most connected - your core abstractions)
1. `README.md (Hackathon-Project)` - 4 edges
2. `SDG Hackathon Idea Guide (Google Doc)` - 3 edges
3. `IDEATION.txt (earlier plain-text draft)` - 3 edges
4. `IoT Sensor/Gateway Device` - 3 edges
5. `Universal Jargon Interpreter App` - 3 edges
6. `add_hyperlink()` - 2 edges
7. `labelled()` - 2 edges
8. `shade()` - 2 edges
9. `make_table()` - 2 edges
10. `source_line()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `IDEATION.txt (earlier plain-text draft)` --conceptually_related_to--> `SDG Hackathon Idea Guide (Google Doc)`  [INFERRED]
  docs/IDEATION.txt → .github/workflows/sync-gdoc.yml
- `CLAUDE.md (Hackathon-Project)` --references--> `IDEATION.txt (earlier plain-text draft)`  [EXTRACTED]
  CLAUDE.md → docs/IDEATION.txt
- `CLAUDE.md (Hackathon-Project)` --references--> `Hackathon AI Strategist Agent`  [EXTRACTED]
  CLAUDE.md → .claude/agents/hackathon-ai-strategist.md
- `README.md (Hackathon-Project)` --references--> `IDEATION.txt (earlier plain-text draft)`  [EXTRACTED]
  README.md → docs/IDEATION.txt
- `README.md (Hackathon-Project)` --references--> `SDG Hackathon Idea Guide (Google Doc)`  [EXTRACTED]
  README.md → .github/workflows/sync-gdoc.yml

## Hyperedges (group relationships)
- **Hackathon Ideation Documentation Chain** — readme_hackathon_project, gdoc_sdg_hackathon_idea_guide, docs_ideation_txt, sync-gdoc_workflow [EXTRACTED 0.90]

## Communities

### Community 0 - "DOCX Build Utility Functions"
Cohesion: 0.24
Nodes (6): add_hyperlink(), labelled(), make_table(), Bold inline label followed by body text., shade(), source_line()

### Community 1 - "Hackathon Ideation Documentation & Strategist Agent"
Cohesion: 0.38
Nodes (7): CLAUDE.md (Hackathon-Project), IDEATION.txt (earlier plain-text draft), SDG Hackathon Idea Guide (Google Doc), Hackathon AI Strategist Agent, AI Hackathon Festival 2026 - Participant Info PDF, README.md (Hackathon-Project), Sync Google Doc GitHub Workflow

### Community 2 - "Cold-Chain Monitor Concept"
Cohesion: 0.33
Nodes (6): Dose-Disposition Quarantine Alert, Cold Chain Monitor Concept Image, Medical Refrigerator/Vaccine Storage Unit, IoT Sensor/Gateway Device, Tamper-Evident Log, Temperature Excursion Chart

### Community 3 - "Universal Jargon Interpreter Concept"
Cohesion: 0.67
Nodes (4): Camera Scan Split-View UI, Target Documents (Prescription, Tenancy Agreement), Verified Plain-Language Summary Card, Universal Jargon Interpreter App

### Community 4 - "Surplus Food Allocation Concept"
Cohesion: 0.67
Nodes (3): Surplus Food Allocation / Food Rescue Concept, Ranked Recipient Locations List (1-2-3 pins), Food Safety Verification Icon (Shield Checkmark)

### Community 5 - "Crisis Response Allocation Engine Concept"
Cohesion: 1.00
Nodes (3): Crisis Response Allocation Engine Diagram, Flood Risk Heatmap / Road Network Map, Supply Chain Flow: Food Pallet to Evacuation Centre

### Community 6 - "Surplus Matching for Growers Concept"
Cohesion: 1.00
Nodes (2): Surplus Matching for Growers Concept Image, Surplus Matching App UI (Tablet Mockup)

### Community 7 - "Disability Funding Reassessment Concept"
Cohesion: 1.00
Nodes (1): Disability Funding Reassessment Dashboard Illustration

### Community 8 - "E-Waste Routing Concept"
Cohesion: 1.00
Nodes (1): E-Waste Routing Concept Image

### Community 9 - "Neighbourhood SDG Indicator Concept"
Cohesion: 1.00
Nodes (1): Neighbourhood SDG Indicator Map Mockup

### Community 10 - "Patient Health Literacy Concept"
Cohesion: 1.00
Nodes (1): Patient Health Literacy Tablet UI

### Community 11 - "Disaster Recovery Shocks Concept"
Cohesion: 1.00
Nodes (1): Disaster Recovery Shocks - Emergency Response Dashboard

### Community 12 - "Hackathon Summary PDF"
Cohesion: 1.00
Nodes (1): AI Hackathon 2026 Summary PDF

## Knowledge Gaps
- **17 isolated node(s):** `Bold inline label followed by body text.`, `Hackathon AI Strategist Agent`, `AI Hackathon Festival 2026 - Participant Info PDF`, `AI Hackathon 2026 Summary PDF`, `Cold Chain Monitor Concept Image` (+12 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Surplus Matching for Growers Concept`** (2 nodes): `Surplus Matching for Growers Concept Image`, `Surplus Matching App UI (Tablet Mockup)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Disability Funding Reassessment Concept`** (1 nodes): `Disability Funding Reassessment Dashboard Illustration`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `E-Waste Routing Concept`** (1 nodes): `E-Waste Routing Concept Image`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Neighbourhood SDG Indicator Concept`** (1 nodes): `Neighbourhood SDG Indicator Map Mockup`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Patient Health Literacy Concept`** (1 nodes): `Patient Health Literacy Tablet UI`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Disaster Recovery Shocks Concept`** (1 nodes): `Disaster Recovery Shocks - Emergency Response Dashboard`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hackathon Summary PDF`** (1 nodes): `AI Hackathon 2026 Summary PDF`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `Bold inline label followed by body text.`, `Hackathon AI Strategist Agent`, `AI Hackathon Festival 2026 - Participant Info PDF` to the rest of the system?**
  _17 weakly-connected nodes found - possible documentation gaps or missing edges._