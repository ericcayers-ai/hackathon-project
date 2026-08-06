# Node Description Batch 1 of 2

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
LANGUAGE: each entry has a `lang=` marker giving the language of its source.
Write that entry's description in EXACTLY that language. Do not translate to
a single common language — match each node's source language individually.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "branch:repo:github.com/ericcayers-ai/hackathon-project#main": "main" | kind=Branch | source=git | neighbors=[0c25dcb Fix sync-gdoc: git diff --quiet…, 1563e36 Add files via upload, 16bda27 Sync Google Doc export [automat…, 2dff076 Sync Google Doc export [automat…, 460c9ed Delete AI Hackathon 2026 - Idea…, 49b68c9 Organize docs etc] | lang=en
- "build_docx": "build_docx.py" | kind=code-symbol | source=tools/build_docx.py:L1 | neighbors=[add_hyperlink(), bullet(), labelled(), make_table(), numbered(), para()] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@d193f555e8ee24a5a550a7e50cf1911d54447409": "d193f55 Merge remote-tracking branch 'origin/main'" | kind=Commit | source=git | neighbors=[1563e36 Add files via upload, 4f6b143 Merge README from origin, main, b57214b Add concept images per idea; co…] | lang=en
- "01_cold_chain_monitor_sensor_device": "IoT Sensor/Gateway Device" | kind=entity | source=assets/images/01_cold_chain_monitor.png | neighbors=[Cold Chain Monitor Concept Image, Medical Refrigerator/Vaccine Storage Un…, Temperature Excursion Chart] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@0c25dcb45625ced8864b5445a31c5a747e0f067e": "0c25dcb Fix sync-gdoc: git diff --quiet misses new untracked file" | kind=Commit | source=git | neighbors=[main, 16bda27 Sync Google Doc export [automat…, 7c83d44 Add scheduled GitHub Action to …] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@1563e36590a8fb6667dc082a66a1c76bdd41a4c1": "1563e36 Add files via upload" | kind=Commit | source=git | neighbors=[main, d193f55 Merge remote-tracking branch 'o…, 460c9ed Delete AI Hackathon 2026 - Idea…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@16bda27ba4ac30a5058d5ffe3441692dfe210101": "16bda27 Sync Google Doc export [automated]" | kind=Commit | source=git | neighbors=[0c25dcb Fix sync-gdoc: git diff --quiet…, main, 940e5ad Merge gdoc export with images i…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@2dff0767ba25e19143a8c8b25d4ea042f2c362a3": "2dff076 Sync Google Doc export [automated]" | kind=Commit | source=git | neighbors=[main, d34c4f1 Organize repo: docs/, assets/im…, 940e5ad Merge gdoc export with images i…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@460c9ed5e5ee648de2d1beb2aee4be4707e2c6ab": "460c9ed Delete AI Hackathon 2026 - Ideation.docx" | kind=Commit | source=git | neighbors=[main, 1563e36 Add files via upload, 5821624 Claude workflow setup and curre…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@49b68c966ee132d3015b7502f0de6d99907a641f": "49b68c9 Organize docs etc" | kind=Commit | source=git | neighbors=[main, ed37f0a Update prompt file, 6a71f12 Add hackathon-ai-strategist sub…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@4f6b143aa6598fdea147b79691dd07a7cd9322a3": "4f6b143 Merge README from origin" | kind=Commit | source=git | neighbors=[main, d193f55 Merge remote-tracking branch 'o…, c5761bd Initial hackathon project commit] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@58216241beaf3fdd48610a547bc40b416f95c02a": "5821624 Claude workflow setup and current plan" | kind=Commit | source=git | neighbors=[main, 460c9ed Delete AI Hackathon 2026 - Idea…, c5761bd Initial hackathon project commit] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@6a71f12c63837cc59e0f0fd6fbad94c5530c5d21": "6a71f12 Add hackathon-ai-strategist subagent and wire it into CLAUDE.md routing…" | kind=Commit | source=git | neighbors=[main, 49b68c9 Organize docs etc, d34c4f1 Organize repo: docs/, assets/im…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@7c83d4448fd5aa5cf51066c26e18a4587e1b5027": "7c83d44 Add scheduled GitHub Action to sync Google Doc export into repo" | kind=Commit | source=git | neighbors=[main, 0c25dcb Fix sync-gdoc: git diff --quiet…, b57214b Add concept images per idea; co…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@940e5adbbaf1ed668ee2c9eaa5b1f0497cb0d6fb": "940e5ad Merge gdoc export with images into single tracked docx; simplify sync w…" | kind=Commit | source=git | neighbors=[16bda27 Sync Google Doc export [automat…, main, 2dff076 Sync Google Doc export [automat…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@b57214bcdcbc1b977bcf3fc03a8700687450a55c": "b57214b Add concept images per idea; confirm doc matches Google Doc source" | kind=Commit | source=git | neighbors=[main, 7c83d44 Add scheduled GitHub Action to …, d193f55 Merge remote-tracking branch 'o…] | lang=it
- "commit:repo:github.com/ericcayers-ai/hackathon-project@c5761bd15c6852d9553481b5a5835b67e45c5fdc": "c5761bd Initial hackathon project commit" | kind=Commit | source=git | neighbors=[main, 4f6b143 Merge README from origin, 5821624 Claude workflow setup and curre…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@d34c4f16931606f99d2bc83f88a1d01af4cfaaff": "d34c4f1 Organize repo: docs/, assets/images/, tools/; drop stale zip and sessio…" | kind=Commit | source=git | neighbors=[2dff076 Sync Google Doc export [automat…, main, 6a71f12 Add hackathon-ai-strategist sub…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@ed37f0a76abbab2c44e6c10c69b072e6a09deee3": "ed37f0a Update prompt file" | kind=Commit | source=git | neighbors=[49b68c9 Organize docs etc, main, 68fc5be Update prompt file] | lang=pt
- "docs_ideation_txt": "IDEATION.txt (earlier plain-text draft)" | kind=entity | source=docs/IDEATION.txt | neighbors=[CLAUDE.md (Hackathon-Project), SDG Hackathon Idea Guide (Google Doc), README.md (Hackathon-Project)] | lang=en
- "readme_hackathon_project": "README.md (Hackathon-Project)" | kind=entity | source=README.md | neighbors=[IDEATION.txt (earlier plain-text draft), SDG Hackathon Idea Guide (Google Doc), AI Hackathon Festival 2026 - Participan…] | lang=en
- "universal_jargon_interpreter_concept": "Universal Jargon Interpreter App" | kind=entity | source=assets/images/10_universal_jargon_interpreter.png | neighbors=[Camera Scan Split-View UI, Target Documents (Prescription, Tenancy…, Verified Plain-Language Summary Card] | lang=en
- "01_cold_chain_monitor_dose_disposition": "Dose-Disposition Quarantine Alert" | kind=entity | source=assets/images/01_cold_chain_monitor.png | neighbors=[Tamper-Evident Log, Temperature Excursion Chart] | lang=en
- "01_cold_chain_monitor_temperature_chart": "Temperature Excursion Chart" | kind=entity | source=assets/images/01_cold_chain_monitor.png | neighbors=[IoT Sensor/Gateway Device, Dose-Disposition Quarantine Alert] | lang=en
- "08_surplus_allocation_food_rescue_image": "Surplus Food Allocation / Food Rescue Concept" | kind=entity | source=assets/images/08_surplus_allocation_food_rescue.png | neighbors=[Ranked Recipient Locations List (1-2-3 …, Food Safety Verification Icon (Shield C…] | lang=en
- "09_crisis_response_allocation_engine_image": "Crisis Response Allocation Engine Diagram" | kind=entity | source=assets/images/09_crisis_response_allocation_engine.png | neighbors=[Flood Risk Heatmap / Road Network Map, Supply Chain Flow: Food Pallet to Evacu…] | lang=en
- "09_crisis_response_flood_risk_map": "Flood Risk Heatmap / Road Network Map" | kind=entity | source=assets/images/09_crisis_response_allocation_engine.png | neighbors=[Crisis Response Allocation Engine Diagr…, Supply Chain Flow: Food Pallet to Evacu…] | lang=en
- "09_crisis_response_supply_chain_flow": "Supply Chain Flow: Food Pallet to Evacuation Centre" | kind=entity | source=assets/images/09_crisis_response_allocation_engine.png | neighbors=[Crisis Response Allocation Engine Diagr…, Flood Risk Heatmap / Road Network Map] | lang=en
- "build_docx_add_hyperlink": "add_hyperlink()" | kind=code-symbol | source=tools/build_docx.py:L46 | neighbors=[build_docx.py, source_line()] | lang=en
- "build_docx_labelled": "labelled()" | kind=code-symbol | source=tools/build_docx.py:L106 | neighbors=[build_docx.py, Bold inline label followed by body text.] | lang=en
- "build_docx_make_table": "make_table()" | kind=code-symbol | source=tools/build_docx.py:L124 | neighbors=[build_docx.py, shade()] | lang=en
- "build_docx_shade": "shade()" | kind=code-symbol | source=tools/build_docx.py:L116 | neighbors=[build_docx.py, make_table()] | lang=en
- "build_docx_source_line": "source_line()" | kind=code-symbol | source=tools/build_docx.py:L153 | neighbors=[build_docx.py, add_hyperlink()] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@68fc5be502e0f4e0b1aecfefc60afb5f869e2f76": "68fc5be Update prompt file" | kind=Commit | source=git | neighbors=[main, ed37f0a Update prompt file] | lang=en
- "gdoc_sdg_hackathon_idea_guide": "SDG Hackathon Idea Guide (Google Doc)" | kind=entity | source=.github/workflows/sync-gdoc.yml | neighbors=[IDEATION.txt (earlier plain-text draft), README.md (Hackathon-Project)] | lang=en
- "jargon_interpreter_camera_scan_ui": "Camera Scan Split-View UI" | kind=entity | source=assets/images/10_universal_jargon_interpreter.png | neighbors=[Universal Jargon Interpreter App, Verified Plain-Language Summary Card] | lang=en
- "jargon_interpreter_verified_summary_card": "Verified Plain-Language Summary Card" | kind=entity | source=assets/images/10_universal_jargon_interpreter.png | neighbors=[Camera Scan Split-View UI, Universal Jargon Interpreter App] | lang=en
- "01_cold_chain_monitor_image": "Cold Chain Monitor Concept Image" | kind=entity | source=assets/images/01_cold_chain_monitor.png | neighbors=[IoT Sensor/Gateway Device] | lang=en
- "01_cold_chain_monitor_medical_fridge": "Medical Refrigerator/Vaccine Storage Unit" | kind=entity | source=assets/images/01_cold_chain_monitor.png | neighbors=[IoT Sensor/Gateway Device] | lang=en
- "01_cold_chain_monitor_tamper_log": "Tamper-Evident Log" | kind=entity | source=assets/images/01_cold_chain_monitor.png | neighbors=[Dose-Disposition Quarantine Alert] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\ericc\OneDrive\Desktop\Programs\Hackathon-Project\.graphify\description-instructions\batch-000.json

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
