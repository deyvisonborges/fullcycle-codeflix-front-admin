import { CategoryModel, categoryModelAdapter } from '@/integrations/categories'
import { CategoryFormFields } from '../../components/category-form-fields/category-form-fields'
import { FormLayout } from '@/modules/dashboard/layout/form'
import { ChangeEvent, FormEvent, useState } from 'react'

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

  const [isdisabled, setIsdisabled] = useState(false)
  const [categoryState, setCategoryState] = useState<CategoryModel>({
    id: '',
    name: '',
    is_active: false,
    created_at: '',
    updated_at: '',
    deleted_at: '',
    description: ''
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setIsdisabled(true)
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    setCategoryState({ ...categoryState, ...formData })
    setTimeout(() => setIsdisabled(false), 3000)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as never
    setCategoryState({ ...categoryState, [name]: value })
  }

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target as never
    setCategoryState({ ...categoryState, [name]: checked })
  }

  return (
    <FormLayout
      headerProps={{ title: 'Criar uma nova categoria' }}
      handleSubmit={handleSubmit}
    >
      <CategoryFormFields
        data={categoryModelAdapter(categoryState)}
        handleChange={handleChange}
        handleToggle={handleToggle}
        isDisabled={isdisabled}
      />
    </FormLayout>
  )
}
