# Node Description Batch 1 of 4

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

- "branch:repo:github.com/ericcayers-ai/hackathon-project#main": "main" | kind=Branch | source=git | neighbors=[0c25dcb Fix sync-gdoc: git diff --quiet…, 0f4a291 Overhaul pptx design, fix dupli…, 1563e36 Add files via upload, 16bda27 Sync Google Doc export [automat…, 23bc223 Merge remote-tracking branch 'o…, 2db3f5d Sync Google Doc export [automat…] | lang=en
- "branch:repo:github.com/ericcayers-ai/hackathon-project#worktree-nurse-notes-ui-overhaul": "worktree-nurse-notes-ui-overhaul" | kind=Branch | source=git | neighbors=[0c25dcb Fix sync-gdoc: git diff --quiet…, 1563e36 Add files via upload, 16bda27 Sync Google Doc export [automat…, 23bc223 Merge remote-tracking branch 'o…, 2db3f5d Sync Google Doc export [automat…, 2dff076 Sync Google Doc export [automat…] | lang=en
- "src_app": "App.jsx" | kind=code-symbol | source=app/src/App.jsx:L1 | neighbors=[3edbcc3 Phase 0: rename ClearChart back…, 8c94bf0 Rename ClearChart to Nurse Note…, c1b47d3 Fix ClearChart branding in live…, eda9214 Update docs and merge ClearChar…, fb89a65 Add patient mobile view, QR sav…, extractText()] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@eda92145df33142918b07c85eefe69d5b5128939": "eda9214 Update docs and merge ClearChart app (wip)" | kind=Commit | source=git | neighbors=[68fc5be Update prompt file, vite.config.js, main, worktree-nurse-notes-ui-overhaul, 2db3f5d Sync Google Doc export [automat…, c1b47d3 Fix ClearChart branding in live…] | lang=en
- "lib_readability": "readability.js" | kind=code-symbol | source=app/src/lib/readability.js:L1 | neighbors=[eda9214 Update docs and merge ClearChar…, ACRONYM_RE, ACRONYMS, countJargon(), countSentences(), countSyllablesInWord()] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@fb89a6574083158285863c77242e14c78fafb19d": "fb89a65 Add patient mobile view, QR save-to-phone, TTS; single-file build; Mana…" | kind=Commit | source=git | neighbors=[23bc223 Merge remote-tracking branch 'o…, vite.config.js, main, worktree-nurse-notes-ui-overhaul, 0f4a291 Overhaul pptx design, fix dupli…, 7ed0528 Sync Google Doc export [automat…] | lang=pt
- "build_docx": "build_docx.py" | kind=code-symbol | source=tools/build_docx.py:L1 | neighbors=[add_hyperlink(), bullet(), labelled(), make_table(), numbered(), para()] | lang=en
- "tools_build_docx": "build_docx.py" | kind=code-symbol | source=tools/build_docx.py:L1 | neighbors=[add_hyperlink(), bullet(), labelled(), make_table(), numbered(), para()] | lang=en
- "lib_pdf": "pdf.js" | kind=code-symbol | source=app/src/lib/pdf.js:L1 | neighbors=[8c94bf0 Rename ClearChart to Nurse Note…, c4efce6 Merge upstream Nurse-Notes impr…, eda9214 Update docs and merge ClearChar…, buildPatientPdf(), downloadPatientPdf(), isHeading()] | lang=en
- "src_patientview": "PatientView.jsx" | kind=code-symbol | source=app/src/PatientView.jsx:L1 | neighbors=[8c94bf0 Rename ClearChart to Nurse Note…, c4efce6 Merge upstream Nurse-Notes impr…, fb89a65 Add patient mobile view, QR sav…, GradeBadge(), PatientView(), speakSupported()] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@23bc22363229f2b0bc17c4d3b39439849fa48195": "23bc223 Merge remote-tracking branch 'origin/main' into main" | kind=Commit | source=git | neighbors=[main, worktree-nurse-notes-ui-overhaul, fb89a65 Add patient mobile view, QR sav…, 2db3f5d Sync Google Doc export [automat…, c1b47d3 Fix ClearChart branding in live…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@3edbcc3f5a47dbdb73a310e3f41054443886a6b9": "3edbcc3 Phase 0: rename ClearChart back to Nurse Notes; repo hygiene" | kind=Commit | source=git | neighbors=[main, 32a6cc8 Untrack graphify session state …, App.jsx, 7ed0528 Sync Google Doc export [automat…, c4efce6 Merge upstream Nurse-Notes impr…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@7ed0528c383d603c2e4a6f4c921976dbdde6507b": "7ed0528 Sync Google Doc export [automated]" | kind=Commit | source=git | neighbors=[main, worktree-nurse-notes-ui-overhaul, 3edbcc3 Phase 0: rename ClearChart back…, a64c5a6 Sync Google Doc export [automat…, fb89a65 Add patient mobile view, QR sav…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@8c94bf03c1864097b6a51534b662ef1f284204da": "8c94bf0 Rename ClearChart to Nurse Notes; install Impeccable and overhaul UI id…" | kind=Commit | source=git | neighbors=[worktree-nurse-notes-ui-overhaul, pdf.js, App.jsx, PatientView.jsx, d2fe56b Sync Google Doc export [automat…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@c1b47d3b3bf52fe5fc32cb000a5d1bce8f56518e": "c1b47d3 Fix ClearChart branding in live frontend, close docx Task 2 comparison …" | kind=Commit | source=git | neighbors=[main, worktree-nurse-notes-ui-overhaul, 23bc223 Merge remote-tracking branch 'o…, App.jsx, eda9214 Update docs and merge ClearChar…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@c4efce65e04bb196940177012d05665097ac6326": "c4efce6 Merge upstream Nurse-Notes improvements: better prompt, cleaner Patient…" | kind=Commit | source=git | neighbors=[0f4a291 Overhaul pptx design, fix dupli…, main, 3edbcc3 Phase 0: rename ClearChart back…, pdf.js, PatientView.jsx] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@d193f555e8ee24a5a550a7e50cf1911d54447409": "d193f55 Merge remote-tracking branch 'origin/main'" | kind=Commit | source=git | neighbors=[1563e36 Add files via upload, 4f6b143 Merge README from origin, main, worktree-nurse-notes-ui-overhaul, b57214b Add concept images per idea; co…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@0c25dcb45625ced8864b5445a31c5a747e0f067e": "0c25dcb Fix sync-gdoc: git diff --quiet misses new untracked file" | kind=Commit | source=git | neighbors=[main, worktree-nurse-notes-ui-overhaul, 16bda27 Sync Google Doc export [automat…, 7c83d44 Add scheduled GitHub Action to …] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@1563e36590a8fb6667dc082a66a1c76bdd41a4c1": "1563e36 Add files via upload" | kind=Commit | source=git | neighbors=[main, worktree-nurse-notes-ui-overhaul, d193f55 Merge remote-tracking branch 'o…, 460c9ed Delete AI Hackathon 2026 - Idea…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@16bda27ba4ac30a5058d5ffe3441692dfe210101": "16bda27 Sync Google Doc export [automated]" | kind=Commit | source=git | neighbors=[0c25dcb Fix sync-gdoc: git diff --quiet…, main, worktree-nurse-notes-ui-overhaul, 940e5ad Merge gdoc export with images i…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@2db3f5d4b4e642389c3130dc6542c24a116968f6": "2db3f5d Sync Google Doc export [automated]" | kind=Commit | source=git | neighbors=[main, worktree-nurse-notes-ui-overhaul, 23bc223 Merge remote-tracking branch 'o…, eda9214 Update docs and merge ClearChar…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@2dff0767ba25e19143a8c8b25d4ea042f2c362a3": "2dff076 Sync Google Doc export [automated]" | kind=Commit | source=git | neighbors=[main, worktree-nurse-notes-ui-overhaul, d34c4f1 Organize repo: docs/, assets/im…, 940e5ad Merge gdoc export with images i…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@460c9ed5e5ee648de2d1beb2aee4be4707e2c6ab": "460c9ed Delete AI Hackathon 2026 - Ideation.docx" | kind=Commit | source=git | neighbors=[main, worktree-nurse-notes-ui-overhaul, 1563e36 Add files via upload, 5821624 Claude workflow setup and curre…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@49b68c966ee132d3015b7502f0de6d99907a641f": "49b68c9 Organize docs etc" | kind=Commit | source=git | neighbors=[main, worktree-nurse-notes-ui-overhaul, ed37f0a Update prompt file, 6a71f12 Add hackathon-ai-strategist sub…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@4f6b143aa6598fdea147b79691dd07a7cd9322a3": "4f6b143 Merge README from origin" | kind=Commit | source=git | neighbors=[main, worktree-nurse-notes-ui-overhaul, d193f55 Merge remote-tracking branch 'o…, c5761bd Initial hackathon project commit] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@58216241beaf3fdd48610a547bc40b416f95c02a": "5821624 Claude workflow setup and current plan" | kind=Commit | source=git | neighbors=[main, worktree-nurse-notes-ui-overhaul, 460c9ed Delete AI Hackathon 2026 - Idea…, c5761bd Initial hackathon project commit] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@68fc5be502e0f4e0b1aecfefc60afb5f869e2f76": "68fc5be Update prompt file" | kind=Commit | source=git | neighbors=[main, worktree-nurse-notes-ui-overhaul, eda9214 Update docs and merge ClearChar…, ed37f0a Update prompt file] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@6a71f12c63837cc59e0f0fd6fbad94c5530c5d21": "6a71f12 Add hackathon-ai-strategist subagent and wire it into CLAUDE.md routing…" | kind=Commit | source=git | neighbors=[main, worktree-nurse-notes-ui-overhaul, 49b68c9 Organize docs etc, d34c4f1 Organize repo: docs/, assets/im…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@7c83d4448fd5aa5cf51066c26e18a4587e1b5027": "7c83d44 Add scheduled GitHub Action to sync Google Doc export into repo" | kind=Commit | source=git | neighbors=[main, worktree-nurse-notes-ui-overhaul, 0c25dcb Fix sync-gdoc: git diff --quiet…, b57214b Add concept images per idea; co…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@940e5adbbaf1ed668ee2c9eaa5b1f0497cb0d6fb": "940e5ad Merge gdoc export with images into single tracked docx; simplify sync w…" | kind=Commit | source=git | neighbors=[16bda27 Sync Google Doc export [automat…, main, worktree-nurse-notes-ui-overhaul, 2dff076 Sync Google Doc export [automat…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@b57214bcdcbc1b977bcf3fc03a8700687450a55c": "b57214b Add concept images per idea; confirm doc matches Google Doc source" | kind=Commit | source=git | neighbors=[main, worktree-nurse-notes-ui-overhaul, 7c83d44 Add scheduled GitHub Action to …, d193f55 Merge remote-tracking branch 'o…] | lang=it
- "commit:repo:github.com/ericcayers-ai/hackathon-project@c5761bd15c6852d9553481b5a5835b67e45c5fdc": "c5761bd Initial hackathon project commit" | kind=Commit | source=git | neighbors=[main, worktree-nurse-notes-ui-overhaul, 4f6b143 Merge README from origin, 5821624 Claude workflow setup and curre…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@d34c4f16931606f99d2bc83f88a1d01af4cfaaff": "d34c4f1 Organize repo: docs/, assets/images/, tools/; drop stale zip and sessio…" | kind=Commit | source=git | neighbors=[2dff076 Sync Google Doc export [automat…, main, worktree-nurse-notes-ui-overhaul, 6a71f12 Add hackathon-ai-strategist sub…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@ed37f0a76abbab2c44e6c10c69b072e6a09deee3": "ed37f0a Update prompt file" | kind=Commit | source=git | neighbors=[49b68c9 Organize docs etc, main, worktree-nurse-notes-ui-overhaul, 68fc5be Update prompt file] | lang=pt
- "01_cold_chain_monitor_sensor_device": "IoT Sensor/Gateway Device" | kind=entity | source=assets/images/01_cold_chain_monitor.png | neighbors=[Cold Chain Monitor Concept Image, Medical Refrigerator/Vaccine Storage Un…, Temperature Excursion Chart] | lang=en
- "app": "App.jsx" | kind=code-symbol | source=app/src/App.jsx:L1 | neighbors=[App(), GradeBadge(), JargonBadge()] | lang=en
- "app_vite_config": "vite.config.js" | kind=code-symbol | source=app/vite.config.js:L1 | neighbors=[proxy, eda9214 Update docs and merge ClearChar…, fb89a65 Add patient mobile view, QR sav…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@0f4a29104d33e041967e3a4152d19e3a71e6fea1": "0f4a291 Overhaul pptx design, fix duplicate/overclaim bugs, add PIAAC reading-l…" | kind=Commit | source=git | neighbors=[main, c4efce6 Merge upstream Nurse-Notes impr…, fb89a65 Add patient mobile view, QR sav…] | lang=en
- "commit:repo:github.com/ericcayers-ai/hackathon-project@32a6cc8cdb0eb696b7f962b59afe8a8e3d9f960d": "32a6cc8 Untrack graphify session state (branch.json, worktree.json, cache/)" | kind=Commit | source=git | neighbors=[main, 6991cd0 Phase 1 (partial): fix Activity…, 3edbcc3 Phase 0: rename ClearChart back…] | lang=pt
- "commit:repo:github.com/ericcayers-ai/hackathon-project@a64c5a6ed3f72640e52718c3da5510558cc37bd3": "a64c5a6 Sync Google Doc export [automated]" | kind=Commit | source=git | neighbors=[7ed0528 Sync Google Doc export [automat…, worktree-nurse-notes-ui-overhaul, d2fe56b Sync Google Doc export [automat…] | lang=pt

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
