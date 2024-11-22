// WIP: todo esse codigo eh temporario

import { CategoryModel as CategoryAPIModel } from '@/integrations/categories'

export const CATEGORY_MOCK: CategoryAPIModel = {
  id: '1',
  name: 'Item 1',
  description: 'Some description type',
  is_active: true,
  deleted_at: Date.now().toString(),
  created_at: Date.now().toString(),
  updated_at: Date.now().toString()
}

export const CATEGORIES_MOCK: CategoryAPIModel[] = [
  CATEGORY_MOCK,
  { ...CATEGORY_MOCK, id: '2', name: 'Deyvison' },
  { ...CATEGORY_MOCK, id: '3', name: 'Bruno' }
]
