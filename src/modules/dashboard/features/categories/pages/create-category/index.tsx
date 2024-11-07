import {
  CategoryFormFields,
  CategoryFormFieldsDataProps
} from '../../components/category-form-fields/category-form-fields'
import { FormLayout } from '@/modules/dashboard/layout/form'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useCategories } from '../../useCategoriesStore'

export function CreateCategoryPage() {
  const { createCategory } = useCategories()
  const [isdisabled, setIsdisabled] = useState(false)
  const [categoryState, setCategoryState] =
    useState<CategoryFormFieldsDataProps>({
      name: '',
      isActive: false,
      description: ''
    })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setIsdisabled(true)
    e.preventDefault()
    setTimeout(() => setIsdisabled(false), 3000)
    createCategory({
      ...categoryState,
      id: '',
      deletedAt: '',
      createdAt: '',
      updatedAt: ''
    })
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
        data={categoryState}
        isDisabled={isdisabled}
        handleChange={handleChange}
        handleToggle={handleToggle}
      />
    </FormLayout>
  )
}
