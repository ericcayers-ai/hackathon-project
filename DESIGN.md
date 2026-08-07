---
name: Nurse Notes
description: Plain-language discharge summaries, signed by a nurse before release
colors:
  cover: "#b9a37e"
  cover-dark: "#8d7852"
  cover-ink: "#2c2418"
  cover-ink-soft: "#43371f"
  paper: "#f7f6f2"
  paper-dim: "#efece4"
  ink: "#1c1f1d"
  ink-soft: "#55594f"
  line: "#d9d2bf"
  pen: "#2b3a67"
  pen-dark: "#202b4d"
  pen-tint: "#e3e6ef"
  band: "#a5372a"
  band-tint: "#f3e2de"
  warn-bg: "#f6e9c9"
  warn-line: "#c99a2e"
  warn-ink: "#6b4d0f"
  ok-bg: "#e4ead9"
  ok-line: "#7a9c5e"
  ok-ink: "#33501f"
  danger-bg: "#f5e0dc"
  danger-line: "#c2705f"
  danger-ink: "#7a2f1f"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    letterSpacing: "0.02em"
  record:
    fontFamily: "'SF Mono', 'Cascadia Code', Consolas, 'Liberation Mono', monospace"
    fontSize: "13px"
    lineHeight: 1.6
rounded:
  sm: "3px"
  tab: "7px 7px 0 0"
  pill: "999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.pen}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "8px 14px"
  button-primary-hover:
    backgroundColor: "{colors.pen-dark}"
  tag-wristband:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.band}"
    rounded: "{rounded.pill}"
    padding: "3px 12px 3px 6px"
  tag-wristband-signed:
    textColor: "{colors.ok-ink}"
---

# Design System: Nurse Notes

## Overview

**Creative North Star: "The Bedside Chart Clip"**

Nurse Notes is styled as a patient's physical hospital chart: a kraft chart-cover binder framing cool paper-white pages, tabbed section dividers instead of floating cards, and a wristband-style tag as the one recurring identity mark. The system exists to make one thing legible at a glance — whether a rewrite has been signed by a human yet — and to do that through shape and material, not just color, so the safety gate reads as unmistakable even to someone skimming. It deliberately rejects the generic "digital health SaaS" look this app started with: teal-and-mint gradients, uniform rounded cards, and diffuse drop shadows.

**Confirmed visual anti-references:** generic teal/mint digital-health SaaS; purple-gradient AI-startup gloss; rounded-card-with-soft-shadow-on-everything templating.

**Key Characteristics:**
- Warm kraft chrome (structural chart-cover) framing cool paper-white content, not a single-temperature palette
- One confident accent — ballpoint-signature blue — carries every primary action
- Wristband red is reserved exclusively for the identity tag and the unsigned-gate accent; it never appears as decoration
- Flat, offset "stacked paper" shadows replace blurred ambient glow
- The pill shape is reserved for exactly one element (the wristband tag); everything else is squared

## Colors

Warm structural neutrals plus one confident accent (Restrained strategy) — appropriate for a task-focused clinical tool where the eye must land on the safety gate, not the chrome.

### Primary
- **Ballpoint Ink** (`#2b3a67` / `pen`): every primary action — Generate, Approve, the plain-language tab header. The one saturated color in the interface's "structure," chosen to evoke a signature in ink, not a corporate brand blue.
- **Ballpoint Ink, Deep** (`#202b4d` / `pen-dark`): hover state for primary actions.

### Secondary
- **Wristband Red** (`#a5372a` / `band`): the identity-tag motif and the unsigned-gate accent bar only. The Wristband Rule (below) governs its use.

### Tertiary
- **Kraft Cover** (`#b9a37e` / `cover`): the chart-cover chrome — header band only, never a content surface.
- **Kraft Cover, Deep** (`#8d7852` / `cover-dark`): the header's bottom edge and the phone mockup's outer shell family.

### Neutral
- **Cool Paper** (`#f7f6f2` / `paper`): every content surface — panes, cards, inputs. Deliberately cooler than a cream/parchment default.
- **Paper, Dim** (`#efece4` / `paper-dim`): toolbars and read-only surfaces, one step down from Paper.
- **Carbon Ink** (`#1c1f1d` / `ink`): primary text.
- **Carbon Ink, Soft** (`#55594f` / `ink-soft`): secondary text, hints, captions — verified at 6.6:1 contrast on Paper.
- **Chart Line** (`#d9d2bf` / `line`): hairline borders and dividers.

### Named Rules
**The Wristband Rule.** Wristband Red appears in exactly two places: the identity tag (nurse name + timestamp) and the unsigned gate's left accent bar. It never decorates a button, an icon, or a background. Its rarity is what makes the signed/unsigned distinction legible at a glance.

## Typography

**Display/Body Font:** System UI stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`) — no custom webfont, by constraint: the app ships as one offline HTML file, and a font-CDN link would silently reintroduce a network dependency.
**Record Font:** `'SF Mono', 'Cascadia Code', Consolas, 'Liberation Mono', monospace` — the clinical-record panes and PDF body read as typewritten chart text.

**Character:** A workhorse system stack carrying real hierarchy through size, weight, and letter-spacing rather than a decorative typeface — appropriate for an Operate-mode clinical tool where legibility under time pressure outranks personality.

### Hierarchy
- **Display** (800, 22px, 1.1): the "Nurse Notes" wordmark in the header only.
- **Title** (700, 17px): patient-view header name, badge numerals — one step above body for emphasis without a new size tier.
- **Body** (400, 15px, 1.5): banner copy, approval fields, settings.
- **Patient Body** (400, 17px, 1.65): the plain-language text on the patient's phone view — deliberately larger than clinician-screen body text per the accessibility principle that the patient audience carries a higher legibility bar.
- **Record** (400, 13px monospace, 1.6): the two clinical-record textareas — smaller and denser on purpose, reading as an authentic chart excerpt.
- **Label** (700, 13px, uppercase, 0.06em tracking): tab headers ("ORIGINAL", "PLAIN LANGUAGE"), form labels.

### Named Rules
**The Two-Tier Body Rule.** Clinician-facing body text stays at 15px; patient-facing body text steps up to 17px. The same rewrite is never shown at the same size to both audiences.

## Layout

Two-column grid (`1fr 1fr`) for the clinician compare view, collapsing to a single column under 860px. The comparison is simultaneous by design — a nurse must see the original and the rewrite at once to correct it — so this never becomes a tab-switcher, only a stacked column on narrow viewports. Content is padded 24px horizontally inside `.app__body`; the header band alone runs full-bleed edge-to-edge. Vertical rhythm is an 16–24px gap between major sections (banner, panes, approve row).

## Elevation & Depth

Flat by design, with one deliberate exception: a hard, offset "stacked paper" shadow (`2px 3px 0 rgba(28,31,29,0.09)`) on cards and panes, evoking a sheet lifted slightly off a stack rather than a blurred SaaS glow. No ambient ombré shadows anywhere in the system.

### Shadow Vocabulary
- **Paper Stack** (`box-shadow: 2px 3px 0 rgba(28, 31, 29, 0.09)`): every card-like surface — settings panel, banner, panes, approve row, QR panel, phone mockup.

### Named Rules
**The Flat Offset Rule.** Depth comes from a hard directional offset, never blur. A blurred shadow anywhere in this system is a regression toward the rejected SaaS default.

## Shapes

Corner language is a deliberate hierarchy, not a single global radius. Small squared corners (3px) read as "paper," a top-only tab radius (7px 7px 0 0) reads as a chart divider, and a full pill (999px) is reserved for exactly one component.

### Named Rules
**The One Pill Rule.** Only the wristband identity tag is pill-shaped. Every other interactive element — buttons, inputs, panes — is squared (3px). A second pill-shaped element anywhere in the system dilutes the tag's role as the sole signature mark.

## Components

### Buttons
- **Shape:** squared (3px radius) — the pill shape is reserved for the wristband tag, never a button.
- **Primary:** Ballpoint Ink background, white text, 8px/14px padding; darkens to Ballpoint Ink Deep on hover.
- **Ghost/ Secondary:** transparent or Paper background, Chart Line border, Carbon Ink text.
- **Toggle states:** `aria-pressed`/`aria-expanded` true renders a Pen-Tint background wash — a state must be visible without relying on color alone in combination with the icon/label text change it accompanies.

### Tags (signature component)
- **Wristband Tag:** pill-shaped, Paper background, 1.5px border in Wristband Red (unsigned context) or Ok Green (signed), a small solid dot before the text. Carries the nurse name + timestamp on both the clinician approval banner and the patient phone view — the one element that appears identically in both surfaces, anchoring the "same signed record, two screens" story.

### Cards / Panes
- **Corner Style:** 3px on the body; the pane's own header renders as a floating tab (7px 7px 0 0 radius, positioned above the pane) rather than an inline card header.
- **Background:** Paper, with Paper-Dim toolbars.
- **Shadow Strategy:** Paper Stack (see Elevation).
- **Border:** 1px Chart Line.

### Inputs / Fields
- **Style:** 1px Chart Line border, Paper background, 3px radius.
- **Focus:** a 2px Ballpoint Ink ring offset by a 2px Paper gap (`box-shadow: 0 0 0 2px paper, 0 0 0 4px pen`) — applied uniformly to every interactive element, since the incumbent system had no focus styling at all.

### Status Badges
- **Style:** never color-only — every severity level (plain-language / moderate / complex) pairs its color with a distinct glyph (✓ / △ / ✕) so the state survives grayscale or color-blind viewing.

## Do's and Don'ts

### Do:
- **Do** keep the wristband tag's exact markup and color logic identical between the clinician approval banner and the patient phone view — it is the app's one cross-surface identity thread.
- **Do** pair every status color with a non-color glyph or shape.
- **Do** keep all typography in the system font stack; the single-file offline build cannot depend on a font CDN.
- **Do** keep the gate banner the largest, topmost, most visually assertive element on the clinician screen — no future polish pass may shrink or de-emphasize it.

### Don't:
- **Don't** introduce a second pill-shaped element; the shape is reserved for the wristband tag.
- **Don't** use Wristband Red as a decorative accent outside the tag and the unsigned-gate bar.
- **Don't** add blurred/ambient box-shadows; use the Flat Offset shadow vocabulary only.
- **Don't** collapse the two-pane compare view into a tab-switcher — simultaneous side-by-side comparison is a task requirement, not a layout preference.
