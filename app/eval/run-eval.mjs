#!/usr/bin/env node
// Eval harness for `app/prompts/system-prompt.txt`.
//
// Runs each case in `corpus/cases.mjs` against a running LM Studio (or any
// OpenAI-chat-compatible) server, checks the rewrite against that case's
// assertions, and prints a pass/fail report.
//
// This is the "next concrete step" from
// docs/decisions/0003-prompt-stabilization.md — until this has been run
// against a live model with a passing result, the Activity Limits
// fabrication fix and the 6/52 date-arithmetic decision both stay
// "unverified", per that doc. Running it does not require editing this
// file — see `--help`.
//
// Usage:
//   node app/eval/run-eval.mjs                    # hit LM Studio at the app default
//   node app/eval/run-eval.mjs --base-url <url>    # e.g. http://localhost:1234/v1
//   node app/eval/run-eval.mjs --model <name>      # default: google/gemma-3n-e4b
//   node app/eval/run-eval.mjs --case <id>         # run one case by id
//   node app/eval/run-eval.mjs --json              # machine-readable summary
//   node app/eval/run-eval.mjs --mock              # self-test the harness with
//                                                   # canned responses, no server
//                                                   # needed — proves the pass/fail
//                                                   # logic works while LM Studio
//                                                   # is unavailable
//
// Exit code: 0 if every 'must' assertion in every run case passed (or all
// cases were skipped because the endpoint was unreachable and --mock wasn't
// used — see the summary's `status`); 1 if any 'must' assertion failed.

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { cases as allCases } from './corpus/cases.mjs'
import { mockChat } from './mock-backend.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SYSTEM_PROMPT = readFileSync(
  path.join(__dirname, '..', 'prompts', 'system-prompt.txt'),
  'utf8',
)

const HEADINGS = [
  'Why you were seen',
  'Your medicines and what changed',
  'Looking after yourself at home',
  'Warning signs — call someone now',
  'Follow-up appointments',
  'Activity limits',
  'Who to call',
]

function parseArgs(argv) {
  const opts = {
    baseUrl: 'http://localhost:1234/v1',
    model: 'google/gemma-3n-e4b',
    temperature: 0.25,
    caseId: null,
    json: false,
    mock: false,
    help: false,
  }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--base-url') opts.baseUrl = argv[++i]
    else if (a === '--model') opts.model = argv[++i]
    else if (a === '--temperature') opts.temperature = Number(argv[++i])
    else if (a === '--case') opts.caseId = argv[++i]
    else if (a === '--json') opts.json = true
    else if (a === '--mock') opts.mock = true
    else if (a === '--help' || a === '-h') opts.help = true
  }
  return opts
}

// Extracts the text under `heading` up to the next known heading (or end of
// text). Matches headings loosely: optional leading '#'/'*' markdown, any
// amount of whitespace, case-insensitive.
export function extractSection(text, heading) {
  if (!text) return ''
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const otherHeadings = HEADINGS.filter((h) => h !== heading)
    .map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')
  const re = new RegExp(
    `[#*\\s]*${escaped}[#*\\s]*\\n([\\s\\S]*?)(?=[#*\\s]*(?:${otherHeadings})[#*\\s]*\\n|$)`,
    'i',
  )
  const m = text.match(re)
  return m ? m[1].trim() : ''
}

export function checkAssertion(assertion, fullText) {
  const { type, value, heading } = assertion
  switch (type) {
    case 'must_include':
      return fullText.toLowerCase().includes(value.toLowerCase())
    case 'must_not_include':
      return !fullText.toLowerCase().includes(value.toLowerCase())
    case 'must_include_regex':
      return new RegExp(value, 'i').test(fullText)
    case 'must_not_include_regex':
      return !new RegExp(value, 'i').test(fullText)
    case 'section_must_include': {
      const section = extractSection(fullText, heading)
      return section.toLowerCase().includes(value.toLowerCase())
    }
    case 'section_must_not_include': {
      const section = extractSection(fullText, heading)
      return !section.toLowerCase().includes(value.toLowerCase())
    }
    default:
      throw new Error(`Unknown assertion type: ${type}`)
  }
}

async function liveChat({ baseUrl, model, temperature, userText }) {
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      temperature,
      stream: false,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userText },
      ],
    }),
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`endpoint returned ${res.status}: ${detail}`.trim())
  }
  const data = await res.json()
  return data.choices?.[0]?.message?.content || ''
}

async function runCase(kase, chatFn) {
  const result = {
    id: kase.id,
    description: kase.description,
    status: 'pass', // 'pass' | 'fail' | 'error' | 'skip'
    assertions: [],
    error: null,
  }

  let output
  try {
    output = await chatFn(kase.input)
  } catch (err) {
    result.status = 'error'
    result.error = err.message
    return result
  }

  result.output = output

  for (const assertion of kase.assertions) {
    let passed
    try {
      passed = checkAssertion(assertion, output)
    } catch (err) {
      passed = false
      assertion = { ...assertion, note: `${assertion.note} (assertion error: ${err.message})` }
    }
    const record = { ...assertion, passed }
    result.assertions.push(record)
    if (!passed && assertion.severity === 'must') {
      result.status = 'fail'
    }
  }

  return result
}

function printHuman(results, opts) {
  let anyUnreachable = false
  for (const r of results) {
    const badge = { pass: 'PASS', fail: 'FAIL', error: 'ERROR', skip: 'SKIP' }[r.status]
    console.log(`\n[${badge}] ${r.id}`)
    console.log(`  ${r.description}`)
    if (r.status === 'error') {
      console.log(`  -> ${r.error}`)
      anyUnreachable = true
      continue
    }
    for (const a of r.assertions) {
      const mark = a.passed ? 'ok  ' : a.severity === 'must' ? 'FAIL' : 'info'
      console.log(`  [${mark}] (${a.type}${a.heading ? `:${a.heading}` : ''}) ${a.note}`)
      if (!a.passed) console.log(`         expected: ${a.value}`)
    }
  }

  const musts = results.flatMap((r) => r.assertions.filter((a) => a.severity === 'must'))
  const mustFails = musts.filter((a) => !a.passed)
  const errors = results.filter((r) => r.status === 'error')

  console.log('\n' + '-'.repeat(60))
  console.log(
    `${results.length} case(s) run · ${musts.length - mustFails.length}/${musts.length} required assertions passed` +
      (errors.length ? ` · ${errors.length} case(s) errored` : ''),
  )
  if (errors.length && !opts.mock) {
    console.log(
      `\nCould not reach the model endpoint (${opts.baseUrl}). Start LM Studio's\n` +
        `server (Developer tab -> Start Server) and re-run, or pass --mock to\n` +
        `self-test the harness without a live model.`,
    )
  }
}

async function main() {
  const opts = parseArgs(process.argv.slice(2))

  if (opts.help) {
    console.log(readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').slice(1, 26).join('\n'))
    return
  }

  const casesToRun = opts.caseId ? allCases.filter((c) => c.id === opts.caseId) : allCases
  if (opts.caseId && casesToRun.length === 0) {
    console.error(`No case with id "${opts.caseId}". Known ids:\n` + allCases.map((c) => `  - ${c.id}`).join('\n'))
    process.exitCode = 1
    return
  }

  const chatFn = opts.mock
    ? (userText) => mockChat(userText)
    : (userText) =>
        liveChat({ baseUrl: opts.baseUrl, model: opts.model, temperature: opts.temperature, userText })

  const results = []
  for (const kase of casesToRun) {
    results.push(await runCase(kase, chatFn))
  }

  if (opts.json) {
    console.log(JSON.stringify({ mock: opts.mock, baseUrl: opts.mock ? null : opts.baseUrl, results }, null, 2))
  } else {
    printHuman(results, opts)
  }

  const hardFail = results.some((r) => r.status === 'fail')
  process.exitCode = hardFail ? 1 : 0
}

main().catch((err) => {
  console.error('Eval harness crashed:', err)
  process.exitCode = 1
})
