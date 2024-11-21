import { ListCategoriesPage } from './list-categories.page'
import { renderWithProviders } from '@/utils/test/renderWithProviders'
import { screen, waitFor } from '@testing-library/react'
import { handlersFail, mockServer } from '../mocks/handlers'

describe('ListCategoriesPage', () => {
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

  it('should render error state', async () => {
    mockServer.resetHandlers(...handlersFail)

    renderWithProviders(<ListCategoriesPage />)

    const errorMessage = await screen.findByText('Erro ao listar as categorias')
    expect(errorMessage).toBeInTheDocument()
  })
})
