import { CategoryModel as CategoryAPIModel } from '@/integrations/categories'
import { createSlice } from '@reduxjs/toolkit'
import { CATEGORIES_MOCK } from './mocks/categories.mock-data'
import { RootState } from '@/config/store'

type CategoriesSliceState = {
  categories: CategoryAPIModel[]
}

const initialState: CategoriesSliceState = {
  categories: CATEGORIES_MOCK
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    // createCategory: (state, action) => null,
    // findAllCategories: (state, action) => null
    clear: (state) => {
      state.categories = []
    }
  }
})

export const selectCategories = (state: RootState) => state.categories
export const { actions: categoriesStoreActions } = categoriesSlice
