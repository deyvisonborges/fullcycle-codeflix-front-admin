import { delay, http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

const MOCK_API = {
  CATEGORIES: 'http://localhost:4000/categories'
}

const mockData = [
  {
    id: '1',
    name: 'Item 1',
    description: 'Some description type',
    is_active: true,
    deleted_at: Date.now().toString(),
    created_at: Date.now().toString(),
    updated_at: Date.now().toString()
  },
  {
    id: '2',
    name: 'Item 2',
    description: 'Some description to item 2',
    is_active: true,
    deleted_at: Date.now().toString(),
    created_at: Date.now().toString(),
    updated_at: Date.now().toString()
  },
  {
    id: '3',
    name: 'Item 3',
    description: 'Some description to item 3',
    is_active: true,
    deleted_at: Date.now().toString(),
    created_at: Date.now().toString(),
    updated_at: Date.now().toString()
  },
  {
    id: '4',
    name: 'Item 4',
    description: 'Some description to item 4',
    is_active: true,
    deleted_at: Date.now().toString(),
    created_at: Date.now().toString(),
    updated_at: Date.now().toString()
  }
]

export const mocksHandlers = [
  http.get(MOCK_API.CATEGORIES, async ({ request }) => {
    const searchParams = new URL(request.url).searchParams
    const page = parseInt(searchParams.get('page') || '1', 10)
    const perPage = parseInt(
      searchParams.get('per_page') || '1',
      mockData.length
    )

    // Calcular o índice inicial e final para a paginação
    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage

    // Paginar os dados
    const paginatedData = mockData.slice(startIndex, endIndex)

    await delay()
    return HttpResponse.json({
      data: paginatedData,
      meta: {
        total: mockData.length,
        page,
        perPage,
        totalPages: Math.ceil(mockData.length / perPage)
      }
    })
  })
]

export const handlersFail = [
  http.get(MOCK_API.CATEGORIES, () => {
    return Response.error()
  })
]

export const mockServer = setupServer(...mocksHandlers)
