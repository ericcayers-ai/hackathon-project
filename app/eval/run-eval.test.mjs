// Unit tests for the eval harness itself (not the model). Proves the
// assertion-checking logic actually distinguishes good output from bad —
// a `--mock` run that always passes would be worthless. Run with:
//   node --test app/eval/run-eval.test.mjs

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { checkAssertion, extractSection } from './run-eval.mjs'
import { cases } from './corpus/cases.mjs'

const GOOD_ACTIVITY_SECTION = `Activity limits
Your notes do not mention this. [flag for nurse review]

Who to call`

const FABRICATED_ACTIVITY_SECTION = `Activity limits
Your doctor may have limited the amount of activity you can do while you recover.

Who to call`

test('extractSection pulls the right slice between two known headings', () => {
  const text = `Follow-up appointments\nSee GP in 1 week.\n\nActivity limits\nYour notes do not mention this. [flag for nurse review]\n\nWho to call\nCall the ward.`
  assert.equal(extractSection(text, 'Activity limits'), 'Your notes do not mention this. [flag for nurse review]')
  assert.equal(extractSection(text, 'Who to call'), 'Call the ward.')
})

test('section_must_include passes on correctly-flagged absence, fails on fabrication', () => {
  const assertion = {
    type: 'section_must_include',
    heading: 'Activity limits',
    value: '[flag for nurse review',
  }
  assert.equal(checkAssertion(assertion, GOOD_ACTIVITY_SECTION), true)
  assert.equal(checkAssertion(assertion, FABRICATED_ACTIVITY_SECTION), false)
})

test('must_not_include catches the documented fabrication phrase', () => {
  const assertion = { type: 'must_not_include', value: 'may have limited the amount of activity' }
  assert.equal(checkAssertion(assertion, GOOD_ACTIVITY_SECTION), true)
  assert.equal(checkAssertion(assertion, FABRICATED_ACTIVITY_SECTION), false)
})

test('must_include_regex is case-insensitive and matches loose spacing', () => {
  const assertion = { type: 'must_include_regex', value: 'for\\s*2\\s*weeks' }
  assert.equal(checkAssertion(assertion, 'restrict fluids FOR 2   weeks please'), true)
  assert.equal(checkAssertion(assertion, 'restrict fluids for two weeks please'), false)
})

test('every corpus case assertion type is one checkAssertion actually implements', () => {
  const implemented = new Set([
    'must_include',
    'must_not_include',
    'must_include_regex',
    'must_not_include_regex',
    'section_must_include',
    'section_must_not_include',
  ])
  for (const kase of cases) {
    for (const a of kase.assertions) {
      assert.ok(implemented.has(a.type), `${kase.id}: unknown assertion type "${a.type}"`)
      assert.ok(['must', 'info'].includes(a.severity), `${kase.id}: assertion missing valid severity`)
    }
  }
})

test('every corpus case has a unique id', () => {
  const ids = cases.map((c) => c.id)
  assert.equal(new Set(ids).size, ids.length)
})
