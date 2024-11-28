import { ResponseData } from '@/modules/admin/utils/types'
import categoriesStub from './categories-stub.json'

import { delay, http, HttpResponse } from 'msw'
import { CategoryAPIModel } from '../models/category.model'

const ENDPOINT = 'http://localhost:4000/categories'

// https://mswjs.io/docs/api/http/
export const categoriesMockHandlers = [
  // Get all
  http.get(ENDPOINT, async ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page'))
    const perPage = Number(url.searchParams.get('per_page')) // pageSize

    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage

    const paginatedCategories = categoriesStub.slice(startIndex, endIndex)
    const totalPages = Math.ceil(categoriesStub.length / perPage)

    await delay()

    const response = {
      data: paginatedCategories,
      meta: {
        totalPages: totalPages, // Total real de páginas
        currentPage: page // Opcional: informa a página atual para controle no frontend
      }
    } as unknown as ResponseData<CategoryAPIModel[]>
    return HttpResponse.json(response)
  }),

  // Get by id
  http.get(`${ENDPOINT}/:id`, async ({ params }) => {
    await delay()
    const { id } = params
    const findedCategory = categoriesStub.find((category) => category.id === id)

    if (!findedCategory)
      return HttpResponse.json({ errors: ['Item not found'] }, { status: 404 })

    return HttpResponse.json({ data: findedCategory })
  }),

  // Delete by id
  http.delete(`${ENDPOINT}/:id`, async ({ params }) => {
    await delay()

    const { id } = params
    const itemIndex = categoriesStub.findIndex((mock) => mock.id === id)

    if (itemIndex === -1)
      return HttpResponse.json({ errors: ['Item not found'] }, { status: 404 })

    const [deletedItem] = categoriesStub.splice(itemIndex, 1)

    return HttpResponse.json({ data: deletedItem })
  }),

  // Update by id
  http.put(`${ENDPOINT}/:id`, async ({ request, params }) => {
    await delay()

    const { id } = params
    const nextData = await request.json()

    const itemIndex = categoriesStub.findIndex((mock) => mock.id === id)

    if (itemIndex === -1)
      return HttpResponse.json({ errors: ['Item not found'] }, { status: 404 })

    const updatedItem = {
      ...categoriesStub[itemIndex],
      ...nextData?.toString,
      updated_at: Date.now().toString()
    }
    categoriesStub[itemIndex] = updatedItem
    return HttpResponse.json({ data: updatedItem })
  })
]
