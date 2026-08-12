// Vitest setup: extends `expect` with DOM matchers (toBeInTheDocument, etc.)
// and cleans up the jsdom tree between tests.
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})
