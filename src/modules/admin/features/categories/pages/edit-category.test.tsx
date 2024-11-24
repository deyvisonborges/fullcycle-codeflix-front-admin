import { EditCategoryPage } from './edit-category.page'
import { renderWithProviders } from '@/utils/test/renderWithProviders'

describe('EditCategoryPage', () => {
  it('renders correctly', () => {
    const { asFragment } = renderWithProviders(<EditCategoryPage />)
    expect(asFragment()).toMatchSnapshot()
  })
})
