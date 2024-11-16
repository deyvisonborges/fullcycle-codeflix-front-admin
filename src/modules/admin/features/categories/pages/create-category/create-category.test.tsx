import { CreateCategoryPage } from '.'
import { renderWithProviders } from '@/utils/test/renderWithProviders'

describe('CreateCategoryPage', () => {
  it('renders correctly', () => {
    const { asFragment } = renderWithProviders(<CreateCategoryPage />)
    expect(asFragment()).toMatchSnapshot()
  })
})
