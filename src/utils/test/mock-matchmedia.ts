export const mockMatchMedia = Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: query === '(prefers-color-scheme: dark)', // define o valor padrão que você preferir
    media: query,
    onchange: null,
    addListener: jest.fn(), // métodos legacy para compatibilidade
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})
