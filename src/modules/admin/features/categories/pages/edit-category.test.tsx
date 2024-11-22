import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { EditCategoryPage } from './edit-category.page'
import { renderWithProviders } from '@/utils/test/renderWithProviders'

export const categoriesMocksHandlers = [
  http.get('http://localhost:4000/categories', () => {
    return HttpResponse.json({
      data: [
        {
          id: '1',
          name: 'Item 1',
          description: 'Some description type',
          is_active: true,
          deleted_at: Date.now().toString(),
          created_at: Date.now().toString(),
          updated_at: Date.now().toString()
        }
      ]
    })
  })
]

const server = setupServer(...categoriesMocksHandlers)

describe('EditCategoryPage', () => {
  beforeAll(() => {
    server.listen()
  })
  it('renders correctly', () => {
    const { asFragment } = renderWithProviders(<EditCategoryPage />)
    expect(asFragment()).toMatchSnapshot()
  })
})
