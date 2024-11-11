import { CategoryModel as CategoryAPIModel } from '@/integrations/categories'
import { CategoryID } from '../category-id.primitive'
import { apiSlice } from '@/config/store/slices/api-slice'
import {
  PageBasedPaginationQuery,
  PageBasedPaginationResponse
} from '@/integrations/page-based-pagination'

const endpoint = '/categories'

type ReadonlyAttributes = 'id' | 'created_at' | 'updated_at' | 'deleted_at'

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
    getCategories: query<CategoryAPIModel[], void>({
      query: () => `${endpoint}`,
      providesTags: ['Categories']
    }),
    getPaginatedCategories: query<
      PageBasedPaginationResponse<CategoryAPIModel[]>,
      Partial<PageBasedPaginationQuery>
    >({
      query: (params: PageBasedPaginationQuery) =>
        `${endpoint}?${createPageBasedPaginationQuery(params)}`,
      providesTags: ['Categories']
    }),
    getCategory: query<CategoryAPIModel, CategoryID>({
      query: ({ id }: CategoryID) => `${endpoint}?${id}`,
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
        url: `${endpoint}/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: ['Categories']
    }),
    deleteCategory: mutation<void, CategoryID>({
      query: ({ id }: CategoryID) => ({
        url: `${endpoint}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Categories']
    })
  })
})

export const {
  useGetCategoriesQuery,
  useGetPaginatedCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = categoriesApiSlice
