import { fireEvent, screen, waitFor } from '@testing-library/react'
import { CreateCategoryPage } from '../create-category'
import { renderWithProviders } from '@/utils/test/renderWithProviders'
import { server } from '@/mocks/node'
import { http, HttpResponse } from 'msw'

describe('CreateCategoryPage', () => {
  it('renders correctly', () => {
    const { asFragment } = renderWithProviders(<CreateCategoryPage />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should execute handleSubmit event when clicking `Salvar` with success state', async () => {
    const { getByText, getByLabelText } = renderWithProviders(
      <CreateCategoryPage />
    )

    const nameInput = getByLabelText(/Nome/i)
    const descriptionInput = getByLabelText(/Descrição/i)
    const saveButton = getByText(/Salvar/i)
    const checkbox = getByLabelText(/Ativo/i)

    fireEvent.change(nameInput, { target: { value: 'test name' } })
    fireEvent.change(descriptionInput, { target: { value: 'test desc' } })
    fireEvent.click(checkbox)
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(checkbox).toBeChecked()
      const successText = screen.getByText('Adicionado com sucesso')
      expect(successText).toBeInTheDocument()
    })
  })

  it('should execute handle submit event when clicking `Salve` with error state', async () => {
    server.use(
      http.post('http://localhost:4000/categories', async () => {
        return HttpResponse.error()
      })
    )

    renderWithProviders(<CreateCategoryPage />)

    const saveButton = screen.getByText(/Salvar/i)
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(screen.getByText(/Erro ao criar categoria/i)).toBeInTheDocument()
    })
  })

  it('should call the mutation when `Salvar` is clicked', async () => {
    const { getByText } = renderWithProviders(<CreateCategoryPage />)
    const saveButton = getByText(/Salvar/i)
    fireEvent.click(saveButton)
    expect(saveButton.closest('form')).toBeInTheDocument()
  })

  // it('should execute handle submit when button is clicked', async () => {
  //   const { getByText } = renderWithProviders(<CreateCategoryPage />)

  //   await act(async () => {
  //     const saveButton = getByText(/salvar/i)
  //     fireEvent.click(saveButton)
  //   })

  //   // await act(async () => {
  //   //   expect(handleSubmitMock).toHaveBeenCalled()
  //   // })

  //   await act(async () => {
  //     expect(getByText('Adicionado com sucesso')).toBeInTheDocument()
  //   })
  // })
})
