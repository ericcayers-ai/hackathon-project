# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two distinct personas, with different situations and different accessibility bars:

1. **Clinicians/nurses** — reviewing an AI-generated plain-language rewrite of a discharge summary under time pressure, in a working-professional tool (the app's clinician screen). Their job: read the original, read the rewrite, correct anything the model got wrong (e.g. misread NZ date shorthand), and explicitly approve before it can reach a patient.
2. **Patients** — receiving the approved plain-language summary on their own phone, after discharge. This group may have low health literacy, be elderly, or be non-native English speakers — the accessibility bar here is strictly higher than for the clinician screen.

## Product Purpose

Nurse Notes rewrites hospital discharge summaries and consent forms into plain language (~6th-grade reading level) so patients can actually understand what happened to them, what to do next, and when to seek help — without ever sending unreviewed AI output directly to a patient.

## Positioning

Nurse Notes turns a discharge summary clinicians wrote for each other into something a patient can actually read and act on, made trustworthy by a mandatory human sign-off before release — not just "AI simplifies medical text." The differentiating mechanism is the clinician gate itself: a small on-device model drafts, a human catches its mistakes and signs. A model-only simplifier could not truthfully make the same trust claim.

## Operating Context

- Built for and demoed at the Aotearoa AI Hackathon Festival 2026 (University of Waikato, New Zealand).
- Clinician workflow: paste/upload a discharge summary (`.txt`/`.md`/`.pdf`) → generate a streamed plain-language rewrite locally against LM Studio → edit the rewrite → approve with a name → export a patient PDF or hand off to the patient view.
- Patient workflow: view the approved summary on a phone-shaped mock interface, optionally have it read aloud (Web Speech API), or scan a QR code that encodes the approved text directly (no network round-trip).
- The known, deliberately-preserved demo beat: the current small model (`google/gemma-3n-e4b`) misreads NZ date shorthand `6/52` ("6 weeks") as "6 weeks and 5 days." This is left in place on purpose — it is the live proof that the clinician gate catches real model errors, not a polish gap to hide.

## Capabilities and Constraints

- **Offline/on-device only.** No cloud, no account, nothing uploaded. Inference runs against a local LM Studio server (`http://localhost:1234/v1`, OpenAI-compatible). This is both a privacy property and the Māori data-sovereignty story: data that never leaves the device cannot be governed by someone else's jurisdiction.
- **Single self-contained HTML file build** (`vite-plugin-singlefile`) is load-bearing — the "runs fully offline, no install" pitch depends on `npm run build` producing one `dist/index.html` with everything inlined (JS, CSS, PDF worker). Any visual work must not reintroduce an external dependency (e.g. a font CDN link).
- **Synthetic/published sample data only** — never real patient records, in the app, the demo, or the repo.
- Stack: React 18 + Vite 5, no CSS framework (hand-rolled CSS custom properties in `app/src/styles.css`). This is an existing, working codebase, not greenfield — visual work should extend this stack, not introduce new build tooling.
- Reading-level badges (Flesch–Kincaid grade on the rewrite, clinical-jargon count on the original) are computed client-side with no external API, and are deliberately split rather than a single score, because FK alone rates dense clinical shorthand as "easy" when it's the opposite of easy for a patient.

## Brand Commitments

- Name: **Nurse Notes**. (An earlier, incorrect internal note claimed the product had been renamed to "ClearChart" — that was wrong and has been corrected throughout the app and docs; the product has always been intended as Nurse Notes.)
- Existing mark: a simple ✚ glyph used as a logo placeholder in both the clinician header and the patient phone-mockup header — not a confirmed final identity, open for the visual-identity phase to keep, refine, or replace.
- Footer privacy line ("Runs entirely on this device. No data leaves your machine.") is a confirmed, specific, true claim — voice guidance for new copy should match this register: concrete and verifiable, not generic reassurance.

## Evidence on Hand

- `app/CLAUDE.md`, `app/README.md` — the product's own written brief, most authoritative source for facts in this file.
- `app/samples/synthetic-discharge-01.txt` — the synthetic test document used in the demo (fictional patient "Aroha Ngata," NZ discharge-summary format with real-world shorthand density).
- No real customer evidence, testimonials, or deployment history exists — this is a hackathon prototype, not a shipped product; do not fabricate any of these.

## Product Principles

1. The clinician gate is the safety design, not a formality — it must never be visually de-emphasized in service of a cleaner look.
2. Model output is never shipped straight to a patient; every rewrite is human-editable until approved.
3. Everything a design decision touches must survive as a single offline HTML file — no CDN fonts, no external calls introduced for aesthetics.
4. The patient-facing surface carries a strictly higher accessibility/legibility bar than the clinician surface, because its audience is more likely to be vulnerable.
5. Voice and visual identity should read as specific and NZ-health-system-grounded (Right 5, Aotearoa context), not as generic AI-SaaS health-tech.

## Accessibility & Inclusion

- Patient-facing surface must account for possible low health literacy, elderly users, and non-native English speakers — larger default text, higher-contrast-by-default, simple hierarchy.
- No accessibility standard (e.g. WCAG level) has been formally required by any stakeholder; treat WCAG 2.2 AA as the working target given the healthcare context, and note this is a team-adopted target, not an externally mandated one.
