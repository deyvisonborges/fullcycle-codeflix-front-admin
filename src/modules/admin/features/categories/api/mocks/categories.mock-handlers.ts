import categoriesStub from './categories-stub.json'
import { CategoryAPIModel } from '../models/category.model'
import { createMockHandlers } from '@/mocks/generic-mock-handlers'

const CATEGORIES_MOCK_ENDPOINT = 'http://localhost:4000/categories'

export const categoriesMockHandlers = createMockHandlers<CategoryAPIModel>({
  endpoint: CATEGORIES_MOCK_ENDPOINT,
  stubData: categoriesStub
})
