import { CategoryModel, categoryModelAdapter } from '@/integrations/categories'
import { CategoryForm } from '../components/category-form/category-form'

export function CreateCategoryPage() {
  const category: CategoryModel = {
    id: '1',
    name: 'category',
    created_at: Date.now().toString(),
    deleted_at: '',
    is_active: false,
    updated_at: '',
    description: null
  }

  return (
    <CategoryForm
      data={categoryModelAdapter(category)}
      handleSubmit={() => null}
    />
  )
}
