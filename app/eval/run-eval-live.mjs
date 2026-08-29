#!/usr/bin/env node
// Live-eval wrapper. Defaults to Ollama at localhost:11434/v1 with
// qwen3:8b (the only model + endpoint pair this script has been
// validated against — see app/eval/live-results-qwen3-8b.md and
// docs/decisions/0005-live-model-eval-qwen3-8b.md). Fail loudly if the
// endpoint is not reachable so a CI/local run never silently produces
// "all must passed" against no model.
//
// Usage:
//   node eval/run-eval-live.mjs
//   node eval/run-eval-live.mjs --case activity-limits-present-reported-accurately
//   node eval/run-eval-live.mjs --base-url http://localhost:1234/v1 --model google/gemma-3n-e4b
//   node eval/run-eval-live.mjs --json
//
// Exit codes:
//   0  — every 'must' assertion in every case passed.
//   1  — at least one 'must' assertion failed (the eval still ran).
//   2  — the endpoint is not reachable, or some other environment
//        failure prevented a real eval from happening. This is the
//        "don't lie" exit code: a script that pretends to have run
//        the eval but couldn't is worse than a script that says
//        "I couldn't run it."

import { parseArgs } from 'node:util'

const DEFAULTS = {
  baseUrl: 'http://localhost:11434/v1',
  model: 'qwen3:8b',
  temperature: 0.25,
  timeoutMs: 120_000,
}

function parseCli() {
  const { values } = parseArgs({
    options: {
      'base-url': { type: 'string', default: DEFAULTS.baseUrl },
      'model': { type: 'string', default: DEFAULTS.model },
      'temperature': { type: 'string', default: String(DEFAULTS.temperature) },
      'case': { type: 'string', default: '' },
      'json': { type: 'boolean', default: false },
      'quiet': { type: 'boolean', default: false },
    },
    allowPositionals: false,
  })
  return {
    baseUrl: values['base-url'],
    model: values['model'],
    temperature: Number(values['temperature']),
    case: values['case'] || null,
    json: values['json'],
    quiet: values['quiet'],
  }
}

async function probe(baseUrl) {
  // Most OpenAI-compatible servers expose /v1/models. If not, /v1/ itself
  // often returns 401/405 (still a sign the server is up).
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), 5000)
  try {
    const res = await fetch(`${baseUrl.replace(/\/$/, '')}/models`, { signal: ctrl.signal })
    return res.status < 500
  } catch {
    return false
  } finally {
    clearTimeout(t)
  }
}

async function runCase(kase, baseUrl, model, temperature) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), 120_000)
  const res = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: ctrl.signal,
    body: JSON.stringify({
      model,
      temperature,
      stream: false,
      messages: [
        { role: 'system', content: await loadSystemPrompt() },
        { role: 'user', content: kase.input },
      ],
    }),
  })
  clearTimeout(t)
  if (!res.ok) {
    throw new Error(`endpoint returned ${res.status}: ${await res.text().catch(() => '')}`)
  }
  const data = await res.json()
  return data.choices?.[0]?.message?.content || ''
}

async function loadSystemPrompt() {
  const fs = await import('node:fs/promises')
  const path = await import('node:path')
  const url = await import('node:url')
  const here = path.dirname(url.fileURLToPath(import.meta.url))
  return fs.readFile(path.join(here, '..', 'prompts', 'system-prompt.txt'), 'utf8')
}

async function loadCorpus() {
  const mod = await import('./corpus/cases.mjs')
  return mod.cases
}

async function main() {
  const opts = parseCli()

  if (!opts.quiet) {
    console.log(`[run-eval-live] endpoint: ${opts.baseUrl}  model: ${opts.model}`)
  }

  const reachable = await probe(opts.baseUrl)
  if (!reachable) {
    console.error(
      `[run-eval-live] FAIL: endpoint ${opts.baseUrl} is not reachable. ` +
        'Start your model server (Ollama: `ollama serve`; LM Studio: Developer tab -> Start Server) ' +
        'and re-run, or pass --base-url/--model to point at a different one. ' +
        'For a no-model self-test of the harness, run `npm run eval:mock` instead.',
    )
    process.exit(2)
  }

  const cases = await loadCorpus()
  const casesToRun = opts.case ? cases.filter((c) => c.id === opts.case) : cases
  if (opts.case && casesToRun.length === 0) {
    console.error(
      `[run-eval-live] No case with id "${opts.case}". Known:\n` +
        cases.map((c) => `  - ${c.id}`).join('\n'),
    )
    process.exit(2)
  }

  // Use the same assertion logic as the canonical run-eval.mjs to keep the
  // pass/fail rules in one place. (extractSection is used inside
  // checkAssertion for the section_must_* types, so we import it
  // transitively through checkAssertion — no need to re-import here.)
  const { checkAssertion } = await import('./run-eval.mjs')

  const results = []
  for (const kase of casesToRun) {
    const r = { id: kase.id, description: kase.description, status: 'pass', assertions: [], error: null }
    let output
    try {
      output = await runCase(kase, opts.baseUrl, opts.model, opts.temperature)
    } catch (err) {
      r.status = 'error'
      r.error = err.message
      results.push(r)
      continue
    }
    r.output = output
    for (const a of kase.assertions) {
      let passed
      try {
        passed = checkAssertion(a, output)
      } catch (err) {
        passed = false
        a.note = `${a.note} (assertion error: ${err.message})`
      }
      r.assertions.push({ ...a, passed })
      if (!passed && a.severity === 'must') r.status = 'fail'
    }
    results.push(r)
  }

  if (opts.json) {
    console.log(
      JSON.stringify(
        { mock: false, baseUrl: opts.baseUrl, model: opts.model, results },
        null,
        2,
      ),
    )
  } else {
    for (const r of results) {
      const badge = { pass: 'PASS', fail: 'FAIL', error: 'ERROR', skip: 'SKIP' }[r.status]
      console.log(`\n[${badge}] ${r.id}`)
      console.log(`  ${r.description}`)
      if (r.status === 'error') {
        console.log(`  -> ${r.error}`)
        continue
      }
      for (const a of r.assertions) {
        const mark = a.passed ? 'ok  ' : a.severity === 'must' ? 'FAIL' : 'info'
        console.log(
          `  [${mark}] (${a.type}${a.heading ? `:${a.heading}` : ''}) ${a.note}`,
        )
        if (!a.passed) console.log(`         expected: ${a.value}`)
      }
    }
    const musts = results.flatMap((r) => r.assertions.filter((a) => a.severity === 'must'))
    const mustFails = musts.filter((a) => !a.passed)
    console.log('\n' + '-'.repeat(60))
    console.log(
      `${results.length} case(s) run · ${musts.length - mustFails.length}/${musts.length} required assertions passed` +
        (results.some((r) => r.status === 'error') ? ` · ${results.filter((r) => r.status === 'error').length} case(s) errored` : ''),
    )
  }

  if (results.some((r) => r.status === 'error')) {
    // An errored case means the endpoint went away mid-run. Exit 2 so a
    // CI/local invocation doesn't confuse this with "1 must failed".
    process.exit(2)
  }
  process.exit(results.some((r) => r.status === 'fail') ? 1 : 0)
}

main().catch((err) => {
  console.error('[run-eval-live] crashed:', err)
  process.exit(2)
})
