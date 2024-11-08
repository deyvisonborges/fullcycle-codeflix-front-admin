import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  categoriesApiSlice,
  categoriesSlice
} from '@/modules/dashboard/features/categories/store/slice'
import { apiSlice } from './slices/api-slice'

export const store = configureStore({
  reducer: {
    categories: categoriesSlice.reducer, // Slice do Redux para `categories`
    [apiSlice.reducerPath]: apiSlice.reducer, // Reducer para a API geral
    categoriesApi: categoriesApiSlice.reducer // Reducer específico de `categories`
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      categoriesApiSlice.middleware
    )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
