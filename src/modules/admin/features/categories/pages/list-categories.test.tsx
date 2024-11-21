import { setupServer } from 'msw/node'
import { delay, http, HttpResponse } from 'msw'
import { ListCategoriesPage } from './list-categories.page'
import { renderWithProviders } from '@/utils/test/renderWithProviders'
import { screen, waitFor } from '@testing-library/react'

export const handlers = [
  http.get('http://localhost:4000/categories', async () => {
    await delay()
    return HttpResponse.json({
      data: [
        {
          id: '1',
          name: 'Oliver',
          description: 'Some description type',
          is_active: true,
          deleted_at: Date.now().toString(),
          created_at: Date.now().toString(),
          updated_at: Date.now().toString()
        }
      ]
    })
  })
]

const server = setupServer(...handlers)

describe('ListCategoriesPage', () => {
  // Establish API mocking before all tests.
  beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))

  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
  afterEach(() => server.resetHandlers())

  // Clean up after the tests are finished.
  afterAll(() => server.close())

  it('renders correctly', () => {
    const { asFragment } = renderWithProviders(<ListCategoriesPage />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render loading state', async () => {
    // renderiza a pagina
    renderWithProviders(<ListCategoriesPage />)

    // mostra que os dados estao carregando
    const loading = await screen.findByText(/carregando.../i)
    expect(loading).toBeInTheDocument()

    // aguarda que o estado de carregamento desapareça
    await waitFor(() => {
      expect(screen.queryByText(/carregando.../i)).not.toBeInTheDocument()
    })

    // verifica que a tabela foi renderizada
    const categoryName = await screen.findByText(/Oliver/i)
    expect(categoryName).toBeInTheDocument()
  })

  // Pesquisar na internet como sobrescrevero handler
  // Nao funciona de jeito nenhum
  // it('should render error state', async () => {
  //   server.use(
  //     http.get('http://localhost:4000/categories', () => {
  //       return HttpResponse.error()
  //     })
  //   )

  //   renderWithProviders(<ListCategoriesPage />)

  //   const error = screen.getByText((content) =>
  //     content.includes('Erro ao listar as categorias')
  //   )
  //   await waitFor(() => {
  //     expect(error).toBeInTheDocument()
  //   })
  // })
})
