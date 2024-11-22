import { ListCategoriesPage } from './list-categories.page'
import { renderWithProviders } from '@/utils/test/renderWithProviders'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// import { handlersFail, mockServer } from '../mocks/handlers'

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
    const categoryName = await screen.findByText(/Item 1/i)
    expect(categoryName).toBeInTheDocument()
  })

  it('you must navigate between pages correctly by activating pagination', async () => {
    // Renderiza a página com o provider necessário
    renderWithProviders(<ListCategoriesPage />)

    // Verifica itens da primeira página
    const firstPageItem = await screen.findByText(/Item 1/i) // Nome de exemplo
    expect(firstPageItem).toBeInTheDocument()

    // Simula o clique no botão "Próxima"
    const nextPageButton = screen.getByText(/Próxima/i)
    // https://cursos.alura.com.br/forum/topico-podemos-usar-o-userevent-ao-inves-do-fireevent-310309
    await userEvent.click(nextPageButton)

    // Verifica itens da segunda página
    const secondPageItem = await screen.findByText('Item 2') // Nome da segunda página
    expect(secondPageItem).toBeInTheDocument()
  })

  it('', () => {})

  // // https://www.ivstudio.com/blog/mock-service-worker
  // it('should render error state', async () => {
  //   mockServer.resetHandlers(...handlersFail)

  //   renderWithProviders(<ListCategoriesPage />)

  //   const errorMessage = await screen.findByText('Erro ao listar as categorias')
  //   expect(errorMessage).toBeInTheDocument()
  // })

  // it('should handle on page change', () => {
  //   renderWithProviders(<ListCategoriesPage />)
  //   await
  // })
})
