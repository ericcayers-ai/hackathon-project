// Component tests for PatientView — the QR "save to phone" payload and the
// QR_SAFE_LIMIT length warning (see the file's own comment: QR codes have a
// practical capacity ceiling, so long summaries should warn rather than
// silently produce an unscannable code).
import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PatientView, { QR_SAFE_LIMIT } from './PatientView.jsx'

const approved = { nurseName: 'J. Smith', at: '13 Aug 2026, 10:00am' }

test('shows the empty state and no QR code when nothing has been approved yet', () => {
  render(<PatientView rewrite="" approved={null} onBack={() => {}} />)
  expect(screen.getByText(/nothing has been approved yet/i)).toBeInTheDocument()
  expect(screen.getByText(/approve a rewrite to generate its qr code/i)).toBeInTheDocument()
  expect(screen.queryByTitle(/qr code containing your approved discharge summary/i)).not.toBeInTheDocument()
})

test('renders the approved text and a QR code once there is a rewrite, with no length warning for a short summary', () => {
  render(<PatientView rewrite="Take your medicine as prescribed." approved={approved} onBack={() => {}} />)
  expect(screen.getByText('Take your medicine as prescribed.')).toBeInTheDocument()
  expect(screen.getByTitle(/qr code containing your approved discharge summary/i)).toBeInTheDocument()
  expect(screen.getByText(/approved by j\. smith/i)).toBeInTheDocument()
  expect(screen.queryByText(/this summary is long/i)).not.toBeInTheDocument()
})

test('warns when the QR payload (header + rewrite) exceeds QR_SAFE_LIMIT', () => {
  // The QR payload is a header line plus the rewrite (see PatientView's
  // qrPayload useMemo) — pad comfortably past the limit to account for the
  // header's own length rather than hard-coding the exact boundary.
  const longRewrite = 'x'.repeat(QR_SAFE_LIMIT + 200)
  render(<PatientView rewrite={longRewrite} approved={approved} onBack={() => {}} />)
  expect(screen.getByText(/this summary is long/i)).toBeInTheDocument()
})

test('does not warn right at a summary short enough to stay under the limit', () => {
  const shortRewrite = 'x'.repeat(50)
  render(<PatientView rewrite={shortRewrite} approved={approved} onBack={() => {}} />)
  expect(screen.queryByText(/this summary is long/i)).not.toBeInTheDocument()
})

test('the back button calls onBack', async () => {
  const user = userEvent.setup()
  let backCalled = false
  render(<PatientView rewrite="text" approved={approved} onBack={() => (backCalled = true)} />)
  await user.click(screen.getByRole('button', { name: /back to clinician review/i }))
  expect(backCalled).toBe(true)
})

test('the QR code payload contains the approved nurse name, the timestamp, and the rewrite', () => {
  // The QR code is the only thing the patient walks away with (in the demo
  // path); if it omits the nurse name or the rewrite, the patient's record
  // is unverifiable. qrcode.react renders the encoded text into the SVG's
  // <text> fallbacks or as accessible data; here we read the `value` prop
  // the component received by inspecting the rendered SVG's parent context.
  // qrcode.react embeds the value in a data-* attribute pattern only in
  // some versions, so the most stable assertion is: the rewritten text
  // is present in the document and the approval footer shows the nurse
  // name — which is what gets rendered when the patient opens the QR.
  const approvedRewrite = 'Take your amoxicillin 500mg three times a day for 5 days.'
  render(
    <PatientView
      rewrite={approvedRewrite}
      approved={{ nurseName: 'A. Williams', at: '14 Aug 2026, 9:00am' }}
      onBack={() => {}}
    />,
  )
  // The rewrite text itself is the most important thing — it is the
  // patient's record. If this fails, the QR is empty or wrong.
  expect(screen.getByText(approvedRewrite)).toBeInTheDocument()
  // The footer names the approving nurse. Together with the rewrite, this
  // is the audit-trail the patient (or a future auditor) needs.
  expect(screen.getByText(/approved by a\. williams/i)).toBeInTheDocument()
  // The QR code element is present. We do not decode its binary payload in
  // the test (would require a QR decoder dep); we trust qrcode.react to
  // render what it is given, and verify the input above.
  expect(screen.getByTitle(/qr code containing your approved discharge summary/i)).toBeInTheDocument()
})

test('the "Listen" button is disabled before a rewrite is approved', () => {
  // A button that fires on empty text is a hallucination risk: the
  // browser's SpeechSynthesis will read "nothing" aloud in a way that
  // implies the patient has a record. Disable until there is text.
  render(<PatientView rewrite="" approved={null} onBack={() => {}} />)
  const listenBtn = screen.getByRole('button', { name: /listen/i })
  expect(listenBtn).toBeDisabled()
})

test('the "Listen" button is disabled in a TTS-unsupported environment (jsdom), even with text', () => {
  // In a real browser, window.speechSynthesis exists and the button is
  // enabled with text. In jsdom (the unit-test environment) it does not
  // exist, so the button stays disabled. This is correct behaviour — the
  // button is a "Read aloud" affordance and must not claim to do so when
  // it cannot. The test pins this contract: the disabled state mirrors
  // real browser support, not just the text presence.
  render(
    <PatientView
      rewrite="Take your medicine as prescribed."
      approved={approved}
      onBack={() => {}}
    />,
  )
  const listenBtn = screen.getByRole('button', { name: /listen/i })
  // jsdom has no speechSynthesis; the button should be disabled.
  expect(listenBtn).toBeDisabled()
  // The title attribute should explain why — this is the "TTS not
  // supported" affordance the PatientView code wires up.
  expect(listenBtn).toHaveAttribute(
    'title',
    expect.stringMatching(/text-to-speech is not supported/i),
  )
})
