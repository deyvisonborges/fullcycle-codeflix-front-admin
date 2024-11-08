import { CategoryModel as CategoryAPIModel } from '@/integrations/categories'
import { CategoryID } from '../category-id.primitive'
import { apiSlice } from '@/config/store/slices/api-slice'

const endpoint = '/categories'

type ReadonlyAttributes = 'id' | 'created_at' | 'updated_at' | 'deleted_at'

type UpInsertCategoryCommand = Partial<
  Omit<CategoryAPIModel, ReadonlyAttributes>
>

type UpdateCategoryCommand = { payload: UpInsertCategoryCommand } & CategoryID

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<CategoryAPIModel[], void>({
      query: () => `${endpoint}`,
      providesTags: ['Categories']
    }),
    getCategory: query<CategoryAPIModel, CategoryID>({
      query: ({ id }: CategoryID) => `${endpoint}/${id}`,
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
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = categoriesApiSlice
