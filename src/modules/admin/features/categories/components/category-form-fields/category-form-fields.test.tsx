import { ThemeProvider } from '@/config/styles/theme/theme.provider'
import { CategoryFormFields } from './category-form-fields'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { mockMatchMedia } from '@/utils/test/mock-matchmedia'

const mockProps = {
  isDisabled: true,
  handleChange: jest.fn(),
  handleToggle: jest.fn()
}

// é um hook de configuração que executa um bloco de código antes de todos os testes dentro de um arquivo de teste serem executados.
beforeAll(() => mockMatchMedia)

describe('CategoryFormFields', () => {
  it('should render category form fields correctly', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <CategoryFormFields
          data={{
            name: 'mock name',
            description: 'some mock description',
            isActive: true
          }}
          {...mockProps}
        />
      </ThemeProvider>,
      { wrapper: BrowserRouter }
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render category from with disabled state', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <CategoryFormFields
          data={{
            name: 'mock name',
            description: 'some mock description',
            isActive: true
          }}
          {...mockProps}
          isDisabled
        />
      </ThemeProvider>,
      { wrapper: BrowserRouter }
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
