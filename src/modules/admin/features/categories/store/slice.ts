import { CategoryModel as CategoryAPIModel } from '@/integrations/categories'
import { CategoryID } from '../category-id.primitive'
import { apiSlice } from '@/config/store/slices/api-slice'
import { PageBasedPaginationQuery } from '@/integrations/page-based-pagination'
import { ReadonlyAttributes, ResponseData } from '@/modules/admin/utils/types'

const endpoint = '/categories'

type Result = ResponseData<CategoryAPIModel>
type UpInsertCategoryCommand = Partial<
  Omit<CategoryAPIModel, ReadonlyAttributes>
>

type UpdateCategoryCommand = { payload: UpInsertCategoryCommand } & CategoryID

const createPageBasedPaginationQuery = (params: PageBasedPaginationQuery) => {
  const query = new URLSearchParams()
  if (params.page) query.append('page', params.page.toString())
  if (params.per_page) query.append('per_page', params.per_page.toString())
  return query.toString()
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    // getCategories: query<CategoryAPIModel[], void>({
    //   query: () => `${endpoint}`,
    //   providesTags: ['Categories']
    // }),
    getPaginatedCategories: query<Result, Partial<PageBasedPaginationQuery>>({
      query: (params: PageBasedPaginationQuery) =>
        `${endpoint}?${createPageBasedPaginationQuery(params)}`,
      providesTags: ['Categories']
    }),
    // Como os dados veem no data: [], nao eh possivel buscar pelo ID diretamente
    // Iss no mock, pra resolver, faço o transforme dos dados, pra trazer somente
    // a categoria que eu preciso
    getCategory: query<CategoryAPIModel, CategoryID>({
      query: ({ id }: CategoryID) => ({
        method: 'GET',
        url: `/categories?data.id=${id}`
      }),
      transformResponse: (response: Result, _, arg) => {
        const category = response.data.find((item) => item.id === arg.id)
        if (!category) throw new Error(`Category with ID ${arg.id} not found`)
        return category
      },
      providesTags: ['Categories']
    }),
    createCategory: mutation<void, UpInsertCategoryCommand>({
      query: (data) => ({
        url: `${endpoint}`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Categories']
    }),
    updateCategory: mutation<void, UpdateCategoryCommand>({
      query: ({ id, payload }) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: ['Categories']
    }),
    deleteCategory: mutation<void, CategoryID>({
      query: ({ id }: CategoryID) => ({
        url: `/categories/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Categories']
    })
  })
})

export const {
  // useGetCategoriesQuery,
  useGetPaginatedCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = categoriesApiSlice
