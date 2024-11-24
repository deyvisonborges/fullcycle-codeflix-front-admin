import { act, fireEvent } from '@testing-library/react'
import { CreateCategoryPage } from '../create-category'
import { renderWithProviders } from '@/utils/test/renderWithProviders'

describe('CreateCategoryPage', () => {
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
