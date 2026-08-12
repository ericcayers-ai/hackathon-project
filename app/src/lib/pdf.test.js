// Unit tests for the PDF-export heading detector. The file's own comment
// flags the real risk here: `KNOWN_HEADINGS` (pdf.js) is a hand-maintained
// copy of the headings `app/prompts/system-prompt.txt` Step 4 instructs the
// model to emit — if the prompt's heading text changes and this list isn't
// updated too, every heading silently renders as body text in the exported
// PDF instead of bold. The last test in this file reads the prompt directly
// and fails if the two ever drift apart, instead of relying on someone
// remembering to update both files by hand.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { test, expect } from 'vitest'
import { isHeading, KNOWN_HEADINGS } from './pdf.js'

test('isHeading matches known headings exactly, case-insensitively, ignoring markdown decoration', () => {
  expect(isHeading('Activity limits')).toBe(true)
  expect(isHeading('ACTIVITY LIMITS')).toBe(true)
  expect(isHeading('## Activity limits')).toBe(true)
  expect(isHeading('**Activity limits**')).toBe(true)
  expect(isHeading('Activity limits:')).toBe(true)
})

test('isHeading does not match body text or a heading used mid-sentence', () => {
  expect(isHeading('Your activity limits are listed below.')).toBe(false)
  expect(isHeading('Take amoxicillin 500mg TDS.')).toBe(false)
  expect(isHeading('')).toBe(false)
})

test('isHeading matches both the em-dash and hyphen variant of "Warning signs"', () => {
  expect(isHeading('Warning signs — call someone now')).toBe(true)
  expect(isHeading('Warning signs - call someone now')).toBe(true)
})

test('KNOWN_HEADINGS covers every heading system-prompt.txt Step 4 actually emits', () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const prompt = readFileSync(path.join(__dirname, '..', '..', 'prompts', 'system-prompt.txt'), 'utf8')

  const block = prompt.match(
    /Use these headings, in this order, spelled exactly like this\.[\s\S]*?\n\n([\s\S]*?)\n\nUnder/,
  )
  expect(block, 'could not locate the Step 4 heading block in system-prompt.txt — did that section move or get reworded?').toBeTruthy()

  const promptHeadings = block[1]
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

  expect(promptHeadings.length).toBeGreaterThan(0)
  for (const heading of promptHeadings) {
    expect(
      KNOWN_HEADINGS.some((h) => h.toLowerCase() === heading.toLowerCase()),
      `"${heading}" is emitted by system-prompt.txt but missing from KNOWN_HEADINGS in pdf.js — it will render as plain body text, not a bold heading, in the exported PDF.`,
    ).toBe(true)
  }
})
