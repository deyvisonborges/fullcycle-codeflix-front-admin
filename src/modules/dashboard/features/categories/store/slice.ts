import {
  CategoryModel as CategoryAPIModel,
  categoryModelAdapter
} from '@/integrations/categories'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CATEGORIES_MOCK } from '../mocks/categories.mock-data'
import { RootState } from '@/config/store'
import { CategoryID } from '../category-id.primitive'
import { CategoryUIModel } from '../category.ui-model'
import { apiSlice } from '@/config/store/slices/api-slice'

const endpoint = '/categories'

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<CategoryAPIModel[], void>({
      query: () => `${endpoint}`,
      providesTags: ['Categories']
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

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: CATEGORIES_MOCK.map((mock) =>
    categoryModelAdapter<CategoryUIModel>(mock)
  ),
  reducers: {
    createCategory(state, action) {
      state.push({ ...action.payload, id: state.length + 1 })
    },
    updateCategory: (
      state,
      action: PayloadAction<Partial<CategoryAPIModel>>
    ) => {
      const { id } = action.payload
      const index = state.findIndex((category) => category.id === id)
      state[index] = action.payload as CategoryUIModel
    },
    deleteCategory: (state, action: PayloadAction<CategoryID>) => {
      const { id } = action.payload
      const index = state.findIndex((category) => category.id === id)
      state.splice(index, 1)
    }
  }
})

export const categoriesStoreSelectors = {
  selectCategories: (state: RootState) => state.categories
}

export const { actions: categoriesStoreActions } = categoriesSlice

export const { useGetCategoriesQuery, useDeleteCategoryMutation } =
  categoriesApiSlice

// export const fetchAndUpdateCategories = createAsyncThunk(
//   'categories/fetchAndUpdate',
//   async (_, { dispatch, getState }) => {
//     const currentData = getState().categories // dados do estado atual
//     const apiData = await dispatch(
//       categoriesApiSlice.endpoints.getCategories.initiate()
//     )

//     if (apiData.data) {
//       dispatch(categoriesSlice.actions.updateCategory(apiData.data))
//     }
//   }
// )
