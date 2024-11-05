import { combineReducers } from '@reduxjs/toolkit'
import { toastReducer } from './slices'

export const reducers = combineReducers({
  toast: toastReducer
})
