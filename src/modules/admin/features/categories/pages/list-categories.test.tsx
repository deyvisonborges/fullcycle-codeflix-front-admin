import { setupServer } from 'msw/node'
import { delay, http, HttpResponse } from 'msw'
import { ListCategoriesPage } from './list-categories.page'
import { renderWithProviders } from '@/utils/test/renderWithProviders'
import { screen, waitFor } from '@testing-library/react'

const MOCK_API = {
  CATEGORIES: 'http://localhost:4000/categories'
}

export const handlers = [
  http.get(MOCK_API.CATEGORIES, async () => {
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

export const handlersFail = [
  http.get(MOCK_API.CATEGORIES, () => {
    // Return a mock response with a 400 status and error message
    console.log('passei no handler de erro')
    return new Response(null, {
      status: 400,
      statusText: 'Something went wrong!'
    })
  })
]

describe('ListCategoriesPage', () => {
  const server = setupServer(...handlers)
  // Establish API mocking before all tests.
  beforeAll(() => server.listen())

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

  // it('should render error state', async () => {
  //   server.use(...handlersFail)

  //   const { findByText } = renderWithProviders(<ListCategoriesPage />)

  //   expect(
  //     await findByText(/Erro ao listar as categorias/i)
  //   ).toBeInTheDocument()
  // })
})
