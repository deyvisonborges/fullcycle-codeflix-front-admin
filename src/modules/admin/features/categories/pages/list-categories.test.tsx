import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { ListCategoriesPage } from './list-categories.page'
import { renderWithProviders } from '@/utils/test/renderWithProviders'
import { act, screen } from '@testing-library/react'

export const categoriesMocksHandlers = [
  http.get('http://localhost:4000/categories', () => {
    return HttpResponse.json({
      data: [
        {
          id: '1',
          name: 'Oliver',
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

describe('ListCategoriesPage', () => {
  afterAll(() => server.close())
  // executa o servidor antes de cada teste
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())

  it('renders correctly', () => {
    const { asFragment } = renderWithProviders(<ListCategoriesPage />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render loading state', async () => {
    renderWithProviders(<ListCategoriesPage />)
    await act(async () => {
      const loading = screen.findByText(/adicionado com sucesso/i)
      expect(loading).toBeTruthy()
    })
  })
})
