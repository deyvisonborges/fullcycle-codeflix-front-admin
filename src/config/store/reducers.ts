import { combineReducers } from '@reduxjs/toolkit'
import { toastReducer } from './slices'
import { categoriesSlice } from '@/modules/dashboard/features/categories/category.store-slice'

export const reducers = combineReducers({
  toast: toastReducer,
  categories: categoriesSlice.reducer
})
