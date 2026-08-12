// Component tests for the approval-gate state machine in App.jsx — the
// actual safety mechanism the whole product is built around (see
// app/CLAUDE.md §1: "Model output is NEVER shipped straight to a patient").
// These exercise the gate through the DOM as a nurse would use it: type a
// rewrite, try to approve too early, approve once both fields are filled,
// confirm the gate locks the textarea and shows who approved it, then
// confirm "Unlock & edit" actually reopens the gate rather than just
// hiding the banner.
//
// The network path (Generate -> generateRewrite -> LM Studio) is NOT
// exercised here — that needs a live/mocked SSE stream and is a separate,
// lower-value test relative to the gate logic itself. Typing directly into
// the editable rewrite textarea (which App.jsx allows regardless of
// generation status) reaches the same state the gate cares about without
// needing a fetch mock.
import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App.jsx'

function getOriginalTextarea() {
  return screen.getByPlaceholderText(/paste the clinical discharge text here/i)
}
function getRewriteTextarea() {
  return screen.getByPlaceholderText(/plain-language rewrite will appear here/i)
}
function getNurseNameInput() {
  return screen.getByLabelText(/reviewing nurse/i)
}
function getApproveButton() {
  return screen.getByRole('button', { name: /approve for release/i })
}

test('shows the "review required" banner and a disabled Approve button before any rewrite exists', () => {
  render(<App />)
  expect(screen.getByText(/nurse review required before release/i)).toBeInTheDocument()
  expect(getApproveButton()).toBeDisabled()
})

test('Approve stays disabled until both the rewrite text and nurse name are filled in', async () => {
  const user = userEvent.setup()
  render(<App />)

  expect(getApproveButton()).toBeDisabled()

  await user.type(getRewriteTextarea(), 'Why you were seen\nYou had a chest infection.')
  expect(getApproveButton()).toBeDisabled() // rewrite present, but no nurse name yet

  await user.type(getNurseNameInput(), 'J. Smith')
  expect(getApproveButton()).toBeEnabled()
})

test('clicking Approve locks the gate: banner flips, rewrite becomes read-only, approver is shown', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.type(getRewriteTextarea(), 'Take your medicine as prescribed.')
  await user.type(getNurseNameInput(), 'J. Smith')
  await user.click(getApproveButton())

  expect(screen.getByText(/^approved for release$/i)).toBeInTheDocument()
  expect(screen.getByText(/approved by j\. smith/i)).toBeInTheDocument()
  expect(getRewriteTextarea()).toHaveAttribute('readonly')
  expect(getNurseNameInput()).toBeDisabled()
  // The pre-approval warning banner must be gone, not just covered up.
  expect(screen.queryByText(/nurse review required before release/i)).not.toBeInTheDocument()
})

test('"Unlock & edit" actually reopens the gate — rewrite is editable again and the warning banner returns', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.type(getRewriteTextarea(), 'Take your medicine as prescribed.')
  await user.type(getNurseNameInput(), 'J. Smith')
  await user.click(getApproveButton())
  expect(getRewriteTextarea()).toHaveAttribute('readonly')

  await user.click(screen.getByRole('button', { name: /unlock & edit/i }))

  expect(screen.getByText(/nurse review required before release/i)).toBeInTheDocument()
  expect(getRewriteTextarea()).not.toHaveAttribute('readonly')
  // Unlocking clears the approval, not the text already typed — the nurse
  // can immediately re-approve without retyping, or edit first and then
  // re-approve. Either way the Approve button reflects current field state,
  // not "always disabled right after unlock".
  expect(screen.getByRole('button', { name: /approve for release/i })).toBeEnabled()
})

test('loading the sample fills the Original pane and does not touch the approval gate', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.click(screen.getByRole('button', { name: /load sample/i }))

  expect(getOriginalTextarea().value.length).toBeGreaterThan(0)
  expect(screen.getByText(/nurse review required before release/i)).toBeInTheDocument()
})

test('Generate is disabled with no Original text, enabled once there is some', async () => {
  const user = userEvent.setup()
  render(<App />)

  const generateBtn = screen.getByRole('button', { name: /^generate$/i })
  expect(generateBtn).toBeDisabled()

  await user.type(getOriginalTextarea(), 'Some discharge text.')
  expect(screen.getByRole('button', { name: /^generate$/i })).toBeEnabled()
})
