import { CreateCategoryPage } from '.'
import { BrowserRouter } from 'react-router-dom'
import { renderWithProviders } from '@/utils/test/renderWithProviders'
import { mockMatchMedia } from '@/utils/test/mock-matchmedia'

beforeAll(() => mockMatchMedia)

describe('CreateCategoryPage', () => {
  it('renders correctly', () => {
    const { asFragment } = renderWithProviders(<CreateCategoryPage />, {
      wrapper: BrowserRouter
    })
    expect(asFragment()).toMatchSnapshot()
  })
})
