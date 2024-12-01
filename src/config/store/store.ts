import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction
} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { categoriesApiSlice } from '@/modules/admin/features/categories/store/slice'
import { apiSlice } from './slices/api-slice'
import { videosApiSlice } from '@/modules/admin/features/videos/api/videos.api'
import { uploadReducer } from '@/modules/admin/features/uploads/store/upload-slice'
import { uploadQueue } from '@/modules/admin/features/uploads/store/upload-queue'

const rootReducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer, // Reducer para a API geral
  categoriesApi: categoriesApiSlice.reducer, // Reducer específico de `categories`
  videosApi: videosApiSlice.reducer, // Reducer específico de `videos`
  uploadSlice: uploadReducer
})

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .prepend(uploadQueue.middleware)
      .concat(apiSlice.middleware)
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
