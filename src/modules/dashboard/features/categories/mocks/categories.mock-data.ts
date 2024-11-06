// WIP: todo esse codigo eh temporario

import { CategoryModel as CategoryAPIModel } from '@/integrations/categories'

export const CATEGORY_MOCK: CategoryAPIModel = {
  id: Date.now().toString(),
  name: 'Oliver',
  description: 'Some description type',
  is_active: true,
  deleted_at: Date.now().toString(),
  created_at: Date.now().toString(),
  updated_at: Date.now().toString()
}

export const CATEGORIES_MOCK: CategoryAPIModel[] = [
  CATEGORY_MOCK,
  { ...CATEGORY_MOCK, name: 'Deyvison' },
  { ...CATEGORY_MOCK, name: 'Bruno' }
]
