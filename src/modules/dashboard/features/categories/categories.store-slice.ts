import {
  CategoryModel as CategoryAPIModel,
  categoryModelAdapter
} from '@/integrations/categories'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CATEGORIES_MOCK } from './mocks/categories.mock-data'
import { RootState } from '@/config/store'
import { CategoryID } from './category-id.primitive'
import { CategoryUIModel } from './category.ui-model'

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
