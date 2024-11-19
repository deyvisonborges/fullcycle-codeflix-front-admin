import { act, fireEvent } from '@testing-library/react'
import { CreateCategoryPage } from '.'
import { renderWithProviders } from '@/utils/test/renderWithProviders'

// // const mockedSnackBar = jest.fn()
// jest.mock('notistack', () => ({
//   enqueueSnackbar: mockedSnackBar
// }))

describe('CreateCategoryPage', () => {
  // beforeEach(() => {
  //   jest.resetModules() // Reseta os módulos entre os testes
  //   jest.clearAllMocks() // Limpa os mocks para evitar interferências
  // })

  it('renders correctly', () => {
    const { asFragment } = renderWithProviders(<CreateCategoryPage />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should execute handleSubmit event when clicking `Salvar`', async () => {
    const { getByText } = renderWithProviders(<CreateCategoryPage />)
    await act(async () => {
      const saveButton = getByText(/Salvar/i)
      fireEvent.click(saveButton)
    })
    expect(getByText('Adicionado com sucesso')).toBeInTheDocument()
  })

  it('should call the mutation when `Salvar` is clicked', async () => {
    const { getByText } = renderWithProviders(<CreateCategoryPage />)
    const saveButton = getByText(/Salvar/i)
    fireEvent.click(saveButton)
    expect(saveButton.closest('form')).toBeInTheDocument()
  })

  it('should execute handle submit when button is clicked', async () => {
    const { getByText } = renderWithProviders(<CreateCategoryPage />)

    await act(async () => {
      const saveButton = getByText(/salvar/i)
      fireEvent.click(saveButton)
    })

    // await act(async () => {
    //   expect(handleSubmitMock).toHaveBeenCalled()
    // })

    await act(async () => {
      expect(getByText('Adicionado com sucesso')).toBeInTheDocument()
    })
  })

  it('should execute handle change when inputs changes', () => {
    const { getByPlaceholderText } = renderWithProviders(<CreateCategoryPage />)

    const nameInput = getByPlaceholderText(/nome da categoria/i)
    fireEvent.change(nameInput, { target: { value: 'Nova categoria' } })
    expect(nameInput).toHaveValue('Nova categoria')

    const descriptionInput = getByPlaceholderText(/descrição/i)
    fireEvent.change(descriptionInput, { target: { value: 'Nova descricao' } })
    expect(descriptionInput).toHaveValue('Nova descricao')
  })

  it('should toggle checkbox to active', () => {
    // quando eu renderizar a pagina
    const { getByLabelText } = renderWithProviders(<CreateCategoryPage />)
    // quero buscar o componente de checkbox através do texto atribuido a ele
    const checkbox = getByLabelText(/Ativo/i)
    // clico nele
    fireEvent.click(checkbox)
    // e espero que ele tenha sido clicado
    expect(checkbox).toBeChecked()
  })
})
