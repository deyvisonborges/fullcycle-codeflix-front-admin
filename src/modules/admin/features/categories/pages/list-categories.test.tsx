import { ListCategoriesPage } from './list-categories.page'
import { renderWithProviders } from '@/utils/test/renderWithProviders'
import { fireEvent, screen, waitFor } from '@testing-library/react'
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
    const secondPageItem = await screen.findByText('Item 3') // Nome da segunda página
    expect(secondPageItem).toBeInTheDocument()
  })

  it('should handle filter change', async () => {
    /**
     * A api mock retorna 2 items por paginas
     * Logo, ele so vai encontrar o Item 1 e o Item 2
     * Ao aplicar o busca por nome para Item 1, ele deve retornar somente ele no DOM
     */
    const { getByText, getByPlaceholderText } = renderWithProviders(
      <ListCategoriesPage />
    )

    // Certifica-se de que o Item 1 e o Item 2 estão presentes inicialmente
    // const firstPageItem = await screen.findByText(/Item 1/i)
    // const secondPageItem = await screen.findAllByText(/Item 2/i)
    // expect(firstPageItem).toBeInTheDocument()
    // expect(secondPageItem.length).toBeGreaterThan(0)

    // logica simplicada
    await waitFor(() => {
      expect(getByText(/Item 1/)).toBeInTheDocument()
      expect(getByText(/Item 2/)).toBeInTheDocument()
    })

    // Realiza a busca pelo nome "Item 1"
    const searchInput = getByPlaceholderText(/Buscar por nome/i)
    fireEvent.change(searchInput, { target: { value: 'Item 1' } })

    // Garante que as alterações esperadas no DOM sejam verificadas de forma assíncrona.
    await waitFor(() => {
      expect(screen.getByText(/Item 1/i)).toBeInTheDocument()
      // queryByText retorna null se o elemento não for encontrado, permitindo verificar sua ausência sem lançar um erro.
      expect(screen.queryByText(/Item 2/i)).not.toBeInTheDocument()
    })
  })

  it('should handle delete category with success state', async () => {
    renderWithProviders(<ListCategoriesPage />)

    // Espera até que os ícones de lixeira apareçam
    const trashIcons = await screen.findAllByTestId('trash-icon')

    // Verifica se pelo menos um ícone de lixeira está no documento
    expect(trashIcons.length).toBeGreaterThan(0)

    // Clica no primeiro ícone de lixeira
    fireEvent.click(trashIcons[0])

    // Espera até que a função mockada seja chamada
    await waitFor(() => {
      expect(
        screen.getByText(/Categoria deletada com sucesso/i)
      ).toBeInTheDocument()
    })
  })

  // https://www.ivstudio.com/blog/mock-service-worker
  // it('should render error state', async () => {
  //   mockServer.resetHandlers(...handlersFail)

  //   renderWithProviders(<ListCategoriesPage />)

  //   const errorMessage = await screen.findByText('Erro ao listar as categorias')
  //   expect(errorMessage).toBeInTheDocument()
  // })
})
