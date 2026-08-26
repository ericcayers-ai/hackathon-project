# Community Labeling

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the community listing below
and write 2-5 word plain-language names for each.

## Language

Write every name in English (en). Do not switch languages.

## Communities

Community 0: main, worktree-nurse-notes-ui-overhaul, 0c25dcb Fix sync-gdoc: git diff --quiet misses new untracked, 0f4a291 Overhaul pptx design, fix duplicate/overclaim bugs, , 1563e36 Add files via upload, 16bda27 Sync Google Doc export [automated], 2dff076 Sync Google Doc export [automated], 32a6cc8 Untrack graphify session state (branch.json, worktre, 3edbcc3 Phase 0: rename ClearChart back to Nurse Notes; repo, 460c9ed Delete AI Hackathon 2026 - Ideation.docx, 49b68c9 Organize docs etc, 4f6b143 Merge README from origin
Community 1: extractText(, readingGrade(, vite.config.js, proxy, 23bc223 Merge remote-tracking branch 'origin/main' into main, 2db3f5d Sync Google Doc export [automated], c1b47d3 Fix ClearChart branding in live frontend, close docx, eda9214 Update docs and merge ClearChart app (wip, extractText.js, extractPdf(, llm.js, generateRewrite(
Community 2: build_docx.py, add_hyperlink(, bullet(, labelled(, make_table(, numbered(, para(, Bold inline label followed by body text., shade(, source_line(
Community 3: build_docx.py, add_hyperlink(, bullet(, labelled(, make_table(, numbered(, para(, Bold inline label followed by body text., shade(, source_line(
Community 4: IoT Sensor/Gateway Device, Dose-Disposition Quarantine Alert, Cold Chain Monitor Concept Image, Medical Refrigerator/Vaccine Storage Unit, Tamper-Evident Log, Temperature Excursion Chart
Community 5: IDEATION.txt (earlier plain-text draft, README.md (Hackathon-Project, CLAUDE.md (Hackathon-Project, SDG Hackathon Idea Guide (Google Doc, AI Hackathon Festival 2026 - Participant Info PDF
Community 6: buildPatientPdf(, downloadPatientPdf(, pdf.js, isHeading(, KNOWN_HEADINGS
Community 7: useSpeech(, GradeBadge(, PatientView.jsx, PatientView(, speakSupported(
Community 8: App.jsx, App(, GradeBadge(, JargonBadge(
Community 9: Universal Jargon Interpreter App, Camera Scan Split-View UI, Target Documents (Prescription, Tenancy Agreement, Verified Plain-Language Summary Card
Community 10: useSpeech(, PatientView.jsx, PatientView(, speakSupported(
Community 11: Surplus Food Allocation / Food Rescue Concept, Ranked Recipient Locations List (1-2-3 pins, Food Safety Verification Icon (Shield Checkmark
Community 12: Crisis Response Allocation Engine Diagram, Flood Risk Heatmap / Road Network Map, Supply Chain Flow: Food Pallet to Evacuation Centre
Community 13: Surplus Matching for Growers Concept Image, Surplus Matching App UI (Tablet Mockup
Community 14: vite.config.js, proxy
Community 15: Disability Funding Reassessment Dashboard Illustration
Community 16: E-Waste Routing Concept Image
Community 17: Neighbourhood SDG Indicator Map Mockup
Community 18: Patient Health Literacy Tablet UI
Community 19: Disaster Recovery Shocks - Emergency Response Dashboard
Community 20: AI Hackathon 2026 Summary PDF

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
