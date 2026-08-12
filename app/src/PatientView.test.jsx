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
