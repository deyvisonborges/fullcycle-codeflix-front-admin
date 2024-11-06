import { CategoryModel, categoryModelAdapter } from '@/integrations/categories'
import { CategoryFormFields } from '../../components/category-form-fields/category-form-fields'
import { FormLayout } from '@/modules/dashboard/layout/form'
import { ChangeEvent, useState } from 'react'

export function CreateCategoryPage() {
  // const category: CategoryModel = {
  //   id: '1',
  //   name: 'category',
  //   created_at: Date.now().toString(),
  //   deleted_at: '',
  //   is_active: false,
  //   updated_at: '',
  //   description: 'some description'
  // }

  const [categoryState, setCategoryState] = useState<CategoryModel>({
    id: '',
    name: '',
    is_active: false,
    created_at: '',
    updated_at: '',
    deleted_at: '',
    description: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as never
    setCategoryState({ ...categoryState, [name]: value })
  }

  return (
    <FormLayout
      headerProps={{ title: 'Criar uma nova categoria' }}
      handleSubmit={(e) => console.log('Funcionando...', e)}
    >
      <CategoryFormFields
        data={categoryModelAdapter(categoryState)}
        handleChange={handleChange}
      />
    </FormLayout>
  )
}
