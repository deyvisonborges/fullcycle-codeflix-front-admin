import { CategoryModel as CategoryAPIModel } from '@/integrations/categories'
import { CategoryID } from '../category-id.primitive'
import { apiSlice } from '@/config/store/slices/api-slice'
import { PageBasedPaginationQuery } from '@/integrations/page-based-pagination'
import { ReadonlyAttributes, ResponseData } from '@/modules/admin/utils/types'

const endpoint = '/categories'

type Results = ResponseData<CategoryAPIModel[]>
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
    getPaginatedCategories: query<Results, Partial<PageBasedPaginationQuery>>({
      query: (params: PageBasedPaginationQuery) =>
        `${endpoint}?${createPageBasedPaginationQuery(params)}`,
      providesTags: ['Categories']
    }),
    getCategory: query<Result, CategoryID>({
      query: ({ id }: CategoryID) => ({
        method: 'GET',
        url: `/categories/${id}`
      }),
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
