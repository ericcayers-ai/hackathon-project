# Node Description Batch 2 of 4

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "commit:repo:github.com/ericcayers-ai/hackathon-project@d2fe56bde9707bc38f371a990c5ac91782632473": "d2fe56b Sync Google Doc export [automated]" | kind=Commit | source=git | neighbors=[a64c5a6 Sync Google Doc export [automat…, worktree-nurse-notes-ui-overhaul, 8c94bf0 Rename ClearChart to Nurse Note…]
- "docs_ideation_txt": "IDEATION.txt (earlier plain-text draft)" | kind=entity | source=docs/IDEATION.txt | neighbors=[CLAUDE.md (Hackathon-Project), SDG Hackathon Idea Guide (Google Doc), README.md (Hackathon-Project)]
- "lib_extracttext": "extractText.js" | kind=code-symbol | source=app/src/lib/extractText.js:L1 | neighbors=[eda9214 Update docs and merge ClearChar…, extractPdf(), extractText()]
- "lib_extracttext_extracttext": "extractText()" | kind=code-symbol | source=app/src/lib/extractText.js:L32 | neighbors=[extractText.js, extractPdf(), App.jsx]
- "lib_llm": "llm.js" | kind=code-symbol | source=app/src/lib/llm.js:L1 | neighbors=[eda9214 Update docs and merge ClearChar…, fb89a65 Add patient mobile view, QR sav…, generateRewrite()]
- "lib_pdf_buildpatientpdf": "buildPatientPdf()" | kind=code-symbol | source=app/src/lib/pdf.js:L25 | neighbors=[pdf.js, isHeading(), downloadPatientPdf()]
- "lib_pdf_downloadpatientpdf": "downloadPatientPdf()" | kind=code-symbol | source=app/src/lib/pdf.js:L106 | neighbors=[pdf.js, buildPatientPdf(), App.jsx]
- "lib_readability_readinggrade": "readingGrade()" | kind=code-symbol | source=app/src/lib/readability.js:L29 | neighbors=[readability.js, countSentences(), App.jsx]
- "patientview": "PatientView.jsx" | kind=code-symbol | source=app/src/PatientView.jsx:L1 | neighbors=[PatientView(), speakSupported(), useSpeech()]
- "patientview_usespeech": "useSpeech()" | kind=code-symbol | source=app/src/PatientView.jsx:L26 | neighbors=[PatientView.jsx, PatientView(), speakSupported()]
- "readme_hackathon_project": "README.md (Hackathon-Project)" | kind=entity | source=README.md | neighbors=[IDEATION.txt (earlier plain-text draft), SDG Hackathon Idea Guide (Google Doc), AI Hackathon Festival 2026 - Participan…]
- "src_patientview_usespeech": "useSpeech()" | kind=code-symbol | source=app/src/PatientView.jsx:L26 | neighbors=[PatientView.jsx, PatientView(), speakSupported()]
- "universal_jargon_interpreter_concept": "Universal Jargon Interpreter App" | kind=entity | source=assets/images/10_universal_jargon_interpreter.png | neighbors=[Camera Scan Split-View UI, Target Documents (Prescription, Tenancy…, Verified Plain-Language Summary Card]
- "01_cold_chain_monitor_dose_disposition": "Dose-Disposition Quarantine Alert" | kind=entity | source=assets/images/01_cold_chain_monitor.png | neighbors=[Tamper-Evident Log, Temperature Excursion Chart]
- "01_cold_chain_monitor_temperature_chart": "Temperature Excursion Chart" | kind=entity | source=assets/images/01_cold_chain_monitor.png | neighbors=[IoT Sensor/Gateway Device, Dose-Disposition Quarantine Alert]
- "08_surplus_allocation_food_rescue_image": "Surplus Food Allocation / Food Rescue Concept" | kind=entity | source=assets/images/08_surplus_allocation_food_rescue.png | neighbors=[Ranked Recipient Locations List (1-2-3 …, Food Safety Verification Icon (Shield C…]
- "09_crisis_response_allocation_engine_image": "Crisis Response Allocation Engine Diagram" | kind=entity | source=assets/images/09_crisis_response_allocation_engine.png | neighbors=[Flood Risk Heatmap / Road Network Map, Supply Chain Flow: Food Pallet to Evacu…]
- "09_crisis_response_flood_risk_map": "Flood Risk Heatmap / Road Network Map" | kind=entity | source=assets/images/09_crisis_response_allocation_engine.png | neighbors=[Crisis Response Allocation Engine Diagr…, Supply Chain Flow: Food Pallet to Evacu…]
- "09_crisis_response_supply_chain_flow": "Supply Chain Flow: Food Pallet to Evacuation Centre" | kind=entity | source=assets/images/09_crisis_response_allocation_engine.png | neighbors=[Crisis Response Allocation Engine Diagr…, Flood Risk Heatmap / Road Network Map]
- "build_docx_add_hyperlink": "add_hyperlink()" | kind=code-symbol | source=tools/build_docx.py:L46 | neighbors=[build_docx.py, source_line()]
- "build_docx_labelled": "labelled()" | kind=code-symbol | source=tools/build_docx.py:L106 | neighbors=[build_docx.py, Bold inline label followed by body text.]
- "build_docx_make_table": "make_table()" | kind=code-symbol | source=tools/build_docx.py:L124 | neighbors=[build_docx.py, shade()]
- "build_docx_shade": "shade()" | kind=code-symbol | source=tools/build_docx.py:L116 | neighbors=[build_docx.py, make_table()]
- "build_docx_source_line": "source_line()" | kind=code-symbol | source=tools/build_docx.py:L153 | neighbors=[build_docx.py, add_hyperlink()]
- "commit:repo:github.com/ericcayers-ai/hackathon-project@6991cd0d4d7fb2c02ea04ecade18bffb96cdf1fb": "6991cd0 Phase 1 (partial): fix Activity Limits fabrication in system prompt" | kind=Commit | source=git | neighbors=[32a6cc8 Untrack graphify session state …, main]
- "gdoc_sdg_hackathon_idea_guide": "SDG Hackathon Idea Guide (Google Doc)" | kind=entity | source=.github/workflows/sync-gdoc.yml | neighbors=[IDEATION.txt (earlier plain-text draft), README.md (Hackathon-Project)]
- "jargon_interpreter_camera_scan_ui": "Camera Scan Split-View UI" | kind=entity | source=assets/images/10_universal_jargon_interpreter.png | neighbors=[Universal Jargon Interpreter App, Verified Plain-Language Summary Card]
- "jargon_interpreter_verified_summary_card": "Verified Plain-Language Summary Card" | kind=entity | source=assets/images/10_universal_jargon_interpreter.png | neighbors=[Camera Scan Split-View UI, Universal Jargon Interpreter App]
- "lib_extracttext_extractpdf": "extractPdf()" | kind=code-symbol | source=app/src/lib/extractText.js:L9 | neighbors=[extractText.js, extractText()]
- "lib_llm_generaterewrite": "generateRewrite()" | kind=code-symbol | source=app/src/lib/llm.js:L20 | neighbors=[llm.js, App.jsx]
- "lib_pdf_isheading": "isHeading()" | kind=code-symbol | source=app/src/lib/pdf.js:L20 | neighbors=[pdf.js, buildPatientPdf()]
- "lib_readability_countjargon": "countJargon()" | kind=code-symbol | source=app/src/lib/readability.js:L103 | neighbors=[readability.js, App.jsx]
- "lib_readability_countsentences": "countSentences()" | kind=code-symbol | source=app/src/lib/readability.js:L17 | neighbors=[readability.js, readingGrade()]
- "lib_readability_gradelabel": "gradeLabel()" | kind=code-symbol | source=app/src/lib/readability.js:L50 | neighbors=[readability.js, App.jsx]
- "patientview_patientview": "PatientView()" | kind=code-symbol | source=app/src/PatientView.jsx:L51 | neighbors=[PatientView.jsx, useSpeech()]
- "patientview_speaksupported": "speakSupported()" | kind=code-symbol | source=app/src/PatientView.jsx:L22 | neighbors=[PatientView.jsx, useSpeech()]
- "src_app_gradebadge": "GradeBadge()" | kind=code-symbol | source=app/src/App.jsx:L9 | neighbors=[App.jsx, PatientView.jsx]
- "src_patientview_patientview": "PatientView()" | kind=code-symbol | source=app/src/PatientView.jsx:L51 | neighbors=[PatientView.jsx, useSpeech()]
- "src_patientview_speaksupported": "speakSupported()" | kind=code-symbol | source=app/src/PatientView.jsx:L22 | neighbors=[PatientView.jsx, useSpeech()]
- "tools_build_docx_add_hyperlink": "add_hyperlink()" | kind=code-symbol | source=tools/build_docx.py:L46 | neighbors=[build_docx.py, source_line()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\ericc\OneDrive\Desktop\Programs\Hackathon-Project\.graphify\description-instructions\batch-001.json

Keep each description factual and concise (one sentence). No markdown, no prose
outside the JSON object. It is acceptable to omit a node if context is
insufficient — but include every node you can ground confidently.

Example answer format:
```json
{
  "node_id_1": "Resolves the configured ontology profile from graphify.yaml.",
  "node_id_2": "Colonel James Barclay, an antagonist in The Crooked Man."
}
```
