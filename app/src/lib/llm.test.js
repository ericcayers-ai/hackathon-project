// Unit tests for the SSE stream parser in app/src/lib/llm.js.
//
// The parser runs entirely in-browser against an LM Studio OpenAI-compatible
// stream. App.jsx component tests exercise the approval-gate state machine by
// typing into the editable rewrite textarea, deliberately sidestepping the
// need to mock a streaming fetch response (see docs/decisions/0004). This
// file covers the stream parser itself, which the component tests do not.
//
// Run with: npm run test:unit (vitest, picked up by vite.config.js test.include)
//
// Test strategy: build a fake ReadableStream<Uint8Array> from a list of
// string chunks, swap it in via the global `fetch` mock, and assert on
// (a) the assembled full text, (b) the sequence of onToken deltas, and
// (c) error/edge behaviour (HTTP error, [DONE], malformed JSON, multi-event
// frames, blank lines, partial-line buffering across reads).

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { generateRewrite } from './llm.js'

// Build a minimal Response-shaped object that matches the bits
// generateRewrite() actually uses: res.ok, res.status, res.text(), res.body
// (a ReadableStream of Uint8Array).
function sseResponse(chunks, { ok = true, status = 200, statusText = 'OK', body = '' } = {}) {
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    start(controller) {
      for (const c of chunks) controller.enqueue(encoder.encode(c))
      controller.close()
    },
  })
  return {
    ok,
    status,
    statusText,
    body: stream,
    text: async () => body,
  }
}

function mockFetch(response) {
  globalThis.fetch = vi.fn().mockResolvedValue(response)
}

describe('generateRewrite — SSE stream parser', () => {
  beforeEach(() => {
    // jsdom (set up in test-setup.js) provides TextDecoder/TextEncoder.
    // The fetch mock is installed per test.
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('assembles full text from a single-event stream and calls onToken with each delta', async () => {
    mockFetch(
      sseResponse([
        'data: {"choices":[{"delta":{"content":"Hello "}}]}\n\n',
        'data: {"choices":[{"delta":{"content":"world"}}]}\n\n',
        'data: [DONE]\n\n',
      ]),
    )
    const onToken = vi.fn()
    const out = await generateRewrite({
      originalText: 'x',
      onToken,
      baseUrl: 'http://x/v1',
    })
    expect(out).toBe('Hello world')
    expect(onToken).toHaveBeenCalledTimes(2)
    expect(onToken.mock.calls[0][0]).toBe('Hello ')
    expect(onToken.mock.calls[1][0]).toBe('world')
  })

  it('handles multiple SSE events in a single chunk (no blank-line split across reads)', async () => {
    // Critical: the parser must NOT lose data if the server sends several
    // events at once. The buffer-and-split-on-newline path is what makes
    // that work; if the parser used a naive split('\n\n') it would
    // misframe the boundary and the last event would corrupt the buffer.
    mockFetch(
      sseResponse([
        'data: {"choices":[{"delta":{"content":"A"}}]}\n\n' +
          'data: {"choices":[{"delta":{"content":"B"}}]}\n\n' +
          'data: {"choices":[{"delta":{"content":"C"}}]}\n\n' +
          'data: [DONE]\n\n',
      ]),
    )
    const onToken = vi.fn()
    const out = await generateRewrite({ originalText: 'x', onToken, baseUrl: 'http://x/v1' })
    expect(out).toBe('ABC')
    expect(onToken).toHaveBeenCalledTimes(3)
  })

  it('handles partial frames split across two reads (the buffering path)', async () => {
    // LM Studio (and any OpenAI-compatible stream) does not guarantee
    // event boundaries align with TCP chunks. The parser must keep a
    // partial line in the buffer between reads and only consume complete
    // lines. This is the case the old single-line .split('\n') code path
    // would silently corrupt.
    mockFetch(
      sseResponse([
        'data: {"choices":[{"delta":{"content":"Hel',
        'lo"}}]}\n\ndata: [DONE]\n\n',
      ]),
    )
    const onToken = vi.fn()
    const out = await generateRewrite({ originalText: 'x', onToken, baseUrl: 'http://x/v1' })
    expect(out).toBe('Hello')
    expect(onToken).toHaveBeenCalledTimes(1)
  })

  it('skips [DONE] sentinels and does not emit them as tokens', async () => {
    mockFetch(
      sseResponse([
        'data: {"choices":[{"delta":{"content":"x"}}]}\n\n',
        'data: [DONE]\n\n',
      ]),
    )
    const onToken = vi.fn()
    const out = await generateRewrite({ originalText: 'x', onToken, baseUrl: 'http://x/v1' })
    expect(out).toBe('x')
    expect(onToken).toHaveBeenCalledTimes(1)
    expect(onToken.mock.calls[0][0]).toBe('x')
  })

  it('ignores malformed JSON lines (keep-alive / unknown event types) and continues', async () => {
    mockFetch(
      sseResponse([
        ': keep-alive comment\n\n',
        'data: not-json\n\n',
        'data: {"choices":[{"delta":{"content":"ok"}}]}\n\n',
        'data: [DONE]\n\n',
      ]),
    )
    const onToken = vi.fn()
    const out = await generateRewrite({ originalText: 'x', onToken, baseUrl: 'http://x/v1' })
    expect(out).toBe('ok')
    expect(onToken).toHaveBeenCalledTimes(1)
  })

  it('skips deltas with no content (role-only chunks, e.g. the first frame)', async () => {
    // OpenAI streams start with a frame that has role: "assistant" but no
    // content. The parser must not crash on a missing `content` field and
    // must not call onToken with an empty string.
    mockFetch(
      sseResponse([
        'data: {"choices":[{"delta":{"role":"assistant"}}]}\n\n',
        'data: {"choices":[{"delta":{"content":"hi"}}]}\n\n',
        'data: [DONE]\n\n',
      ]),
    )
    const onToken = vi.fn()
    const out = await generateRewrite({ originalText: 'x', onToken, baseUrl: 'http://x/v1' })
    expect(out).toBe('hi')
    expect(onToken).toHaveBeenCalledTimes(1)
    expect(onToken.mock.calls[0][0]).toBe('hi')
  })

  it('handles empty delta content (delta.content === "") without calling onToken', async () => {
    mockFetch(
      sseResponse([
        'data: {"choices":[{"delta":{"content":""}}]}\n\n',
        'data: {"choices":[{"delta":{"content":"x"}}]}\n\n',
        'data: [DONE]\n\n',
      ]),
    )
    const onToken = vi.fn()
    const out = await generateRewrite({ originalText: 'x', onToken, baseUrl: 'http://x/v1' })
    expect(out).toBe('x')
    expect(onToken).toHaveBeenCalledTimes(1)
  })

  it('throws on non-2xx response, including the response body in the error message', async () => {
    mockFetch(sseResponse([], { ok: false, status: 503, statusText: 'Service Unavailable', body: 'LM Studio offline' }))
    await expect(
      generateRewrite({ originalText: 'x', baseUrl: 'http://x/v1' }),
    ).rejects.toThrow(/503.*LM Studio offline/)
  })

  it('throws on non-2xx response with empty body without crashing on the .text() catch', async () => {
    mockFetch(sseResponse([], { ok: false, status: 500, statusText: 'Internal Server Error', body: '' }))
    await expect(
      generateRewrite({ originalText: 'x', baseUrl: 'http://x/v1' }),
    ).rejects.toThrow(/500/)
  })

  it('returns the empty string when the stream has only [DONE] (degenerate but must not throw)', async () => {
    mockFetch(sseResponse(['data: [DONE]\n\n']))
    const out = await generateRewrite({ originalText: 'x', baseUrl: 'http://x/v1' })
    expect(out).toBe('')
  })

  it('passes through model, temperature, and the system+user messages in the request body', async () => {
    // The parser does not need this; but the wrapper does. Lock the wire
    // shape so a future "I swapped the system message in" refactor can't
    // silently break the prompt contract.
    const fetchSpy = vi.fn().mockResolvedValue(sseResponse(['data: [DONE]\n\n']))
    globalThis.fetch = fetchSpy
    await generateRewrite({
      originalText: 'discharge text',
      baseUrl: 'http://x/v1',
      model: 'some/model',
      temperature: 0.42,
    })
    const [url, init] = fetchSpy.mock.calls[0]
    expect(url).toBe('http://x/v1/chat/completions')
    const body = JSON.parse(init.body)
    expect(body.model).toBe('some/model')
    expect(body.temperature).toBe(0.42)
    expect(body.stream).toBe(true)
    expect(body.messages).toHaveLength(2)
    expect(body.messages[0].role).toBe('system')
    expect(typeof body.messages[0].content).toBe('string')
    expect(body.messages[0].content.length).toBeGreaterThan(0) // prompt is non-empty
    expect(body.messages[1]).toEqual({ role: 'user', content: 'discharge text' })
  })

  it('forwards an AbortSignal to fetch (so the UI Cancel button can actually cancel)', async () => {
    // Cancellability is part of the public contract; if a future refactor
    // drops the `signal` arg the UI's Cancel button becomes a lie.
    const ac = new AbortController()
    const fetchSpy = vi.fn().mockResolvedValue(sseResponse(['data: [DONE]\n\n']))
    globalThis.fetch = fetchSpy
    await generateRewrite({ originalText: 'x', baseUrl: 'http://x/v1', signal: ac.signal })
    expect(fetchSpy.mock.calls[0][1].signal).toBe(ac.signal)
  })

  it('tolerates a leading blank line before the first data: frame', async () => {
    // Some proxies prepend a blank line. The parser must not treat it as
    // a malformed JSON line and crash.
    mockFetch(
      sseResponse([
        '\n',
        'data: {"choices":[{"delta":{"content":"ok"}}]}\n\n',
        'data: [DONE]\n\n',
      ]),
    )
    const out = await generateRewrite({ originalText: 'x', baseUrl: 'http://x/v1' })
    expect(out).toBe('ok')
  })
})
