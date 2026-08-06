# Node Description Batch 2 of 2

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

- "02_surplus_matching_growers_image": "Surplus Matching for Growers Concept Image" | kind=entity | source=assets/images/02_surplus_matching_growers.png | neighbors=[Surplus Matching App UI (Tablet Mockup)]
- "08_surplus_allocation_ranked_locations_ui": "Ranked Recipient Locations List (1-2-3 pins)" | kind=entity | source=assets/images/08_surplus_allocation_food_rescue.png | neighbors=[Surplus Food Allocation / Food Rescue C…]
- "08_surplus_allocation_safety_check_ui": "Food Safety Verification Icon (Shield Checkmark)" | kind=entity | source=assets/images/08_surplus_allocation_food_rescue.png | neighbors=[Surplus Food Allocation / Food Rescue C…]
- "build_docx_bullet": "bullet()" | kind=code-symbol | source=tools/build_docx.py:L90 | neighbors=[build_docx.py]
- "build_docx_numbered": "numbered()" | kind=code-symbol | source=tools/build_docx.py:L98 | neighbors=[build_docx.py]
- "build_docx_para": "para()" | kind=code-symbol | source=tools/build_docx.py:L72 | neighbors=[build_docx.py]
- "build_docx_rationale_107": "Bold inline label followed by body text." | kind=entity | source=tools/build_docx.py:L107 | neighbors=[labelled()]
- "claude_md_hackathon_project": "CLAUDE.md (Hackathon-Project)" | kind=entity | source=CLAUDE.md | neighbors=[IDEATION.txt (earlier plain-text draft)]
- "jargon_interpreter_document_use_cases": "Target Documents (Prescription, Tenancy Agreement)" | kind=entity | source=assets/images/10_universal_jargon_interpreter.png | neighbors=[Universal Jargon Interpreter App]
- "participant_info_pdf": "AI Hackathon Festival 2026 - Participant Info PDF" | kind=entity | source=.graphify/converted/pdf/AI_Hackathon_Festival_2026_-_Participant_Info_88eebc4a5b4d.md | neighbors=[README.md (Hackathon-Project)]
- "surplus_matching_app_ui": "Surplus Matching App UI (Tablet Mockup)" | kind=entity | source=assets/images/02_surplus_matching_growers.png | neighbors=[Surplus Matching for Growers Concept Im…]
- "03_disability_funding_reassessment_image": "Disability Funding Reassessment Dashboard Illustration" | kind=entity | source=assets/images/03_disability_funding_reassessment.png
- "04_ewaste_routing_image": "E-Waste Routing Concept Image" | kind=entity | source=assets/images/04_ewaste_routing.png
- "05_neighbourhood_sdg_indicator_image": "Neighbourhood SDG Indicator Map Mockup" | kind=entity | source=assets/images/05_neighbourhood_sdg_indicator.png
- "06_patient_health_literacy_image": "Patient Health Literacy Tablet UI" | kind=entity | source=assets/images/06_patient_health_literacy.png
- "07_disaster_recovery_shocks_image": "Disaster Recovery Shocks - Emergency Response Dashboard" | kind=entity | source=assets/images/07_disaster_recovery_shocks.png
- "hackathon_summary_pdf": "AI Hackathon 2026 Summary PDF" | kind=entity | source=.graphify/converted/pdf/ai-hackathon-2026-summary_3c2c6f0c6149.md

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
