import { useParams } from 'react-router-dom'
import { EditCategoryPage } from '../edit-category.page'
import { renderWithProviders } from '@/utils/test/renderWithProviders'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { server } from '@/mocks/node'
import { http, HttpResponse } from 'msw'

// https://stackoverflow.com/questions/58117890/how-to-test-components-using-new-react-router-hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  // useParams: () => ({
  //   id: '1'
  // })
  useParams: jest.fn()
}))

describe('EditCategoryPage', () => {
  const mockUseParams = useParams as jest.Mock

  it('should renders correctly', () => {
    mockUseParams.mockReturnValue({ id: '1' })
    const { asFragment } = renderWithProviders(<EditCategoryPage />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('must include the category id in the route parameter', async () => {
    mockUseParams.mockReturnValue({ id: '1' })
    renderWithProviders(<EditCategoryPage />)
    await waitFor(() => {
      expect(screen.getByLabelText(/Nome/i)).toHaveValue('Item 1')
    })
  })

  it('should not found category with passed id', async () => {
    mockUseParams.mockReturnValue({ id: '8' })
    renderWithProviders(<EditCategoryPage />)
    await waitFor(() => {
      expect(screen.getByText(/Sem dados/i))
    })
  })

  it('should return valid values on change inputs', async () => {
    mockUseParams.mockReturnValue({ id: '1' })
    const { getByLabelText } = renderWithProviders(<EditCategoryPage />)

    const nameInput = getByLabelText(/Nome/i)
    const descriptionInput = getByLabelText(/Descrição/i)
    const submitButton = screen.getByText(/salvar/i)

    fireEvent.change(nameInput, { target: { value: 'Update name' } })
    fireEvent.change(descriptionInput, { target: { value: 'Update desc' } })
    fireEvent.click(submitButton)

    expect(nameInput).toHaveValue('Update name')
    expect(descriptionInput).toHaveValue('Update desc')

    await waitFor(() => {
      const text = screen.getByText(/Category updated successfully/i)
      expect(text).toBeInTheDocument()
    })
  })

  it('it should not include the category id via the route parameter', async () => {
    mockUseParams.mockReturnValue({ id: '1' })
    server.use(
      http.put('http://localhost:4000/categories/:id', async () => {
        return HttpResponse.error()
      })
    )
    const { getByLabelText } = renderWithProviders(<EditCategoryPage />)

    const nameInput = getByLabelText(/Nome/i)
    const descriptionInput = getByLabelText(/Descrição/i)
    const checkbox = getByLabelText(/Ativo/i)
    const submitButton = screen.getByText(/salvar/i)

    fireEvent.change(nameInput, { target: { value: 'Update name' } })
    fireEvent.change(descriptionInput, { target: { value: 'Update desc' } })
    fireEvent.click(checkbox)
    fireEvent.click(submitButton)

    expect(nameInput).toHaveValue('Update name')
    expect(descriptionInput).toHaveValue('Update desc')

    await waitFor(() => {
      const text = screen.getByText(/Category not updated/i)
      expect(text).toBeInTheDocument()
    })
  })
})
