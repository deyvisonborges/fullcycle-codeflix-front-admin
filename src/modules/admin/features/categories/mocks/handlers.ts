import { delay, http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

const MOCK_API = {
  CATEGORIES: 'http://localhost:4000/categories'
}

export const mocksHandlers = [
  http.get(MOCK_API.CATEGORIES, async () => {
    await delay()
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

export const handlersFail = [
  http.get(MOCK_API.CATEGORIES, () => {
    return Response.error()
  })
]

export const mockServer = setupServer(...mocksHandlers)
