import { ResponseData } from '@/modules/admin/utils/types'
import { delay, http, HttpResponse } from 'msw'

type StubItem = { id: string; [key: string]: unknown }
type HandlersConfig<T extends StubItem> = {
  endpoint: string
  stubData: T[]
}

export const createMockHandlers = <T extends StubItem>({
  endpoint,
  stubData
}: HandlersConfig<T>) => [
  http.get(endpoint, async ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page'))
    const perPage = Number(url.searchParams.get('per_page'))

    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage

    const paginatedData = stubData.slice(startIndex, endIndex)
    const totalPages = Math.ceil(stubData.length / perPage)

    const notPagination = !page || !perPage

    const response = {
      data: notPagination ? stubData : paginatedData,
      ...(!notPagination && {
        meta: {
          totalPages,
          currentPage: page
        }
      })
    } as unknown as ResponseData<T[]>

    await delay()
    return HttpResponse.json(response)
  }),

  http.get(`${endpoint}/:id`, async ({ params }) => {
    const { id } = params
    const item = stubData.find((data) => data.id === id)

    if (!item)
      return HttpResponse.json({ errors: ['Item not found'] }, { status: 404 })

    await delay()
    return HttpResponse.json({ data: item })
  }),

  http.delete(`${endpoint}/:id`, async ({ params }) => {
    const { id } = params
    const itemIndex = stubData.findIndex((data) => data.id === id)

    if (itemIndex === -1)
      return HttpResponse.json({ errors: ['Item not found'] }, { status: 404 })

    const [deletedItem] = stubData.splice(itemIndex, 1)

    await delay()
    return HttpResponse.json({ data: deletedItem })
  }),

  http.put(`${endpoint}/:id`, async ({ request, params }) => {
    const { id } = params
    const nextData = await request.json()
    const itemIndex = stubData.findIndex((data) => data.id === id)

    if (itemIndex === -1)
      return HttpResponse.json({ errors: ['Item not found'] }, { status: 404 })

    const updatedItem = {
      ...stubData[itemIndex],
      ...nextData?.toString,
      updated_at: new Date().toISOString()
    }
    stubData[itemIndex] = updatedItem

    await delay()
    return HttpResponse.json({ data: updatedItem })
  })
]
