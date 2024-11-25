import { useParams } from 'react-router-dom'
import { EditCategoryPage } from '../edit-category.page'
import { renderWithProviders } from '@/utils/test/renderWithProviders'
import { screen, waitFor } from '@testing-library/react'

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

  // it('it should not include the category id via the route parameter', async () => {})
})
