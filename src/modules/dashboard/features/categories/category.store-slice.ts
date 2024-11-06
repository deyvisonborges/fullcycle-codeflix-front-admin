import { CategoryModel as CategoryAPIModel } from '@/integrations/categories'
import { createSlice } from '@reduxjs/toolkit'

const CATEGORY_MOCK: CategoryAPIModel = {
  id: Date.now().toString(),
  name: 'Oliver',
  description: 'Some description type',
  is_active: true,
  deleted_at: Date.now().toString(),
  created_at: Date.now().toString(),
  updated_at: Date.now().toString()
}

const CATEGORIES_MOCK: CategoryAPIModel[] = [
  CATEGORY_MOCK,
  { ...CATEGORY_MOCK, name: 'Deyvison' },
  { ...CATEGORY_MOCK, name: 'Bruno' }
]

type CategorySliceState = {
  categories: CategoryAPIModel[]
}

const initialState: CategorySliceState = {
  categories: CATEGORIES_MOCK
}

export const categoryStoreSlice = createSlice({
  name: 'categorySlice',
  initialState: [],
  reducers: {}
})
