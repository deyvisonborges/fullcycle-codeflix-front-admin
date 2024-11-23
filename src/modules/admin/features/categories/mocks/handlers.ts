import { delay, http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
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
    is_active: false,
    deleted_at: Date.now().toString(),
    created_at: Date.now().toString(),
    updated_at: Date.now().toString()
  },
  {
    id: '4',
    name: 'Item 4',
    description: 'Some description to item 4',
    is_active: false,
    deleted_at: Date.now().toString(),
    created_at: Date.now().toString(),
    updated_at: Date.now().toString()
  }
]

export const mocksHandlers = [
  http.get(MOCK_API.CATEGORIES, async () => {
    await delay()

    return HttpResponse.json({ data: mockData })
  }),
  http.delete(MOCK_API.CATEGORIES + '/:id', async ({ params }) => {
    await delay()

    const { id } = params
    const itemIndex = mockData.findIndex((mock) => mock.id === id)

    if (itemIndex === -1) {
      return HttpResponse.json({ message: 'Item not found' }, { status: 404 })
    }

    const [deletedItem] = mockData.splice(itemIndex, 1)

    return HttpResponse.json({
      data: deletedItem
    })
  })
]

export const handlersFail = [
  http.get(MOCK_API.CATEGORIES, () => {
    return Response.error()
  })
]

export const mockServer = setupServer(...mocksHandlers)
