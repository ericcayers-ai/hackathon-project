// Unit tests for extractText's file-type routing. The .pdf parsing path
// (pdfjs-dist, worker, canvas) isn't exercised here — that needs a real PDF
// fixture and a rendering environment beyond what jsdom gives cheaply; this
// covers the .txt/.md path (the common case) and confirms a .pdf-named file
// is actually routed into the PDF branch rather than read as raw text.
import { test, expect } from 'vitest'
import { extractText } from './extractText.js'

test('reads .txt files as plain UTF-8 text', async () => {
  const file = new File(['Hello, this is a discharge summary.'], 'note.txt', { type: 'text/plain' })
  await expect(extractText(file)).resolves.toBe('Hello, this is a discharge summary.')
})

test('reads .md files as plain text even without an explicit mime type', async () => {
  const file = new File(['# Heading\nBody text'], 'note.md', { type: '' })
  await expect(extractText(file)).resolves.toBe('# Heading\nBody text')
})

test('routes .pdf-named files into the PDF branch, not the plain-text branch', async () => {
  // Not a valid PDF payload — the point is only that extractText attempts
  // to parse it as one (and fails) instead of silently returning the raw
  // bytes as if they were text, which would be the routing bug to catch.
  const file = new File(['not a real pdf'], 'note.pdf', { type: 'application/pdf' })
  await expect(extractText(file)).rejects.toBeTruthy()
})
