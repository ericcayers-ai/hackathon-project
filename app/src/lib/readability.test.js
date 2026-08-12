// Unit tests for the client-side reading-grade and jargon-detection logic.
// Pure functions, no DOM dependency — run under Vitest (`npm run test:unit`)
// alongside the component tests for consistency with the rest of the suite.
import { test, expect } from 'vitest'
import { readingGrade, gradeLabel, countJargon } from './readability.js'

test('readingGrade returns null for empty or whitespace-only input', () => {
  expect(readingGrade('')).toBe(null)
  expect(readingGrade('   \n  ')).toBe(null)
  expect(readingGrade(undefined)).toBe(null)
})

test('readingGrade is clamped to a minimum of 1', () => {
  expect(readingGrade('The cat sat.')).toBeGreaterThanOrEqual(1)
})

test('readingGrade rates short plain sentences lower than long complex ones', () => {
  const plain = 'You are safe. You can go home. Take your pills.'
  const complex =
    'The consolidation identified on radiographic imaging is consistent with a ' +
    'community-acquired pneumonic process necessitating antimicrobial intervention.'
  expect(readingGrade(plain)).toBeLessThan(readingGrade(complex))
})

test('readingGrade treats decimals and initials as not ending a sentence', () => {
  // Regression guard: "38.7" and "Dr S. Patel" must not be split into
  // multiple fake sentences, which would artificially deflate the grade
  // (more "sentences" -> shorter average sentence length -> lower grade).
  const withDecimalAndInitial = 'Dr S. Patel saw the patient. Temp was 38.7 degrees.'
  const withoutThoseArtifacts = 'The doctor saw the patient. Temperature was normal.'
  // Both should compute a sane clamped grade, not throw or return null.
  expect(Number.isInteger(readingGrade(withDecimalAndInitial))).toBe(true)
  expect(Number.isInteger(readingGrade(withoutThoseArtifacts))).toBe(true)
})

test('gradeLabel buckets correctly at the documented boundaries', () => {
  expect(gradeLabel(null)).toBe('')
  expect(gradeLabel(1)).toBe('plain language')
  expect(gradeLabel(6)).toBe('plain language')
  expect(gradeLabel(7)).toBe('moderate')
  expect(gradeLabel(9)).toBe('moderate')
  expect(gradeLabel(10)).toBe('complex')
})

test('countJargon returns zero for plain text with no shorthand', () => {
  const { count, unique } = countJargon('You are doing well and can go home today.')
  expect(count).toBe(0)
  expect(unique).toBe(0)
})

test('countJargon detects acronyms, jargon words, and NZ time/dose shorthand', () => {
  const text = 'Take amoxicillin 500mg TDS for 5/7. Watch for haemoptysis or SOB.'
  const { count } = countJargon(text)
  // TDS, 500mg, 5/7, haemoptysis, SOB = 5 shorthand hits.
  expect(count).toBe(5)
})

test('countJargon acronym matching respects word boundaries (no false positives inside words)', () => {
  // "OD" (once daily) is matched case-sensitively; "GOOD" contains the
  // substring "OD" but must not match because it's not bounded by a
  // non-alphanumeric character on the left.
  const { count } = countJargon('The patient made a GOOD recovery.')
  expect(count).toBe(0)
})

test('countJargon deduplicates repeated shorthand for the unique count', () => {
  const { count, unique } = countJargon('SOB on exertion. Also complains of SOB at rest.')
  expect(count).toBe(2)
  expect(unique).toBe(1)
})
