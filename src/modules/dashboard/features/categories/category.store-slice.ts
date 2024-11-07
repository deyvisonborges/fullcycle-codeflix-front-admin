import { CategoryModel as CategoryAPIModel } from '@/integrations/categories'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CATEGORIES_MOCK } from './mocks/categories.mock-data'
import { RootState } from '@/config/store'

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: CATEGORIES_MOCK,
  reducers: {
    createCategory(state, action) {
      state.push({ ...action.payload, id: state.length + 1 })
    },
    deleteCategory: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id)
    },
    updateCategory: (
      state,
      action: PayloadAction<Partial<CategoryAPIModel>>
    ) => {
      const index = state.findIndex(
        (category) => category.id === action.payload.id
      )
      state[index] = action.payload as CategoryAPIModel
    }
  }
})

export const selectCategories = (state: RootState) => state.categories
// export const selectCategoryById = ({ categories }: RootState, id: string) =>
//   categories.categories.find((c) => c.id === id)

export const { actions: categoriesStoreActions } = categoriesSlice
