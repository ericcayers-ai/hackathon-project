# Community Labeling

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the community listing below
and write 2-5 word plain-language names for each.

## Language

Write every name in English (en). Do not switch languages.

## Communities

Community 0: main, 0c25dcb Fix sync-gdoc: git diff --quiet misses new untracked, 16bda27 Sync Google Doc export [automated], 2dff076 Sync Google Doc export [automated], 49b68c9 Organize docs etc, 68fc5be Update prompt file, 6a71f12 Add hackathon-ai-strategist subagent and wire it int, 7c83d44 Add scheduled GitHub Action to sync Google Doc expor, 940e5ad Merge gdoc export with images into single tracked do, b57214b Add concept images per idea; confirm doc matches Goo, d34c4f1 Organize repo: docs/, assets/images/, tools/; drop s, ed37f0a Update prompt file
Community 1: add_hyperlink(, labelled(, make_table(, shade(, source_line(, build_docx.py, bullet(, numbered(, para(, Bold inline label followed by body text.
Community 2: IoT Sensor/Gateway Device, Dose-Disposition Quarantine Alert, Cold Chain Monitor Concept Image, Medical Refrigerator/Vaccine Storage Unit, Tamper-Evident Log, Temperature Excursion Chart
Community 3: 1563e36 Add files via upload, 460c9ed Delete AI Hackathon 2026 - Ideation.docx, 4f6b143 Merge README from origin, 5821624 Claude workflow setup and current plan, c5761bd Initial hackathon project commit, d193f55 Merge remote-tracking branch 'origin/main'
Community 4: IDEATION.txt (earlier plain-text draft, SDG Hackathon Idea Guide (Google Doc, README.md (Hackathon-Project, CLAUDE.md (Hackathon-Project, AI Hackathon Festival 2026 - Participant Info PDF
Community 5: Universal Jargon Interpreter App, Camera Scan Split-View UI, Target Documents (Prescription, Tenancy Agreement, Verified Plain-Language Summary Card
Community 6: Surplus Food Allocation / Food Rescue Concept, Ranked Recipient Locations List (1-2-3 pins, Food Safety Verification Icon (Shield Checkmark
Community 7: Crisis Response Allocation Engine Diagram, Flood Risk Heatmap / Road Network Map, Supply Chain Flow: Food Pallet to Evacuation Centre
Community 8: Surplus Matching for Growers Concept Image, Surplus Matching App UI (Tablet Mockup
Community 9: Disability Funding Reassessment Dashboard Illustration
Community 10: E-Waste Routing Concept Image
Community 11: Neighbourhood SDG Indicator Map Mockup
Community 12: Patient Health Literacy Tablet UI
Community 13: Disaster Recovery Shocks - Emergency Response Dashboard
Community 14: AI Hackathon 2026 Summary PDF

## Instructions

Write a single JSON object mapping each community id (as a string) to its
2-5 word name to: C:\Users\ericc\OneDrive\Desktop\Programs\Hackathon-Project\.graphify\label-instructions\communities.json

Example:
```json
{
  "0": "Authentication Flow",
  "1": "Authentication Flow",
  "2": "Authentication Flow"
}
```

Then re-run `graphify update` (or `graphify label`) to ingest the names.
