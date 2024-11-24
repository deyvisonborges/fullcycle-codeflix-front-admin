import { server } from '@/mocks/node'
import '@testing-library/jest-dom'
import fetch from 'cross-fetch'

global.fetch = fetch

/**
 * O setupTests.ts é executado automaticamente pelo Jest antes de qualquer teste.
 * Ao configurar o mock diretamente no window.matchMedia,
 * ele estará disponível globalmente para todos os testes.
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: query === '(prefers-color-scheme: dark)',
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

// Establish API mocking before all tests.
beforeAll(() => server.listen())

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())
