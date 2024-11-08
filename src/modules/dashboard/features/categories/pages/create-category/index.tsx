import {
  CategoryFormFields,
  CategoryFormFieldsDataProps
} from '../../components/category-form-fields/category-form-fields'
import { FormLayout } from '@/modules/dashboard/layout/form'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useCategoriesStore } from '../../store/hook'
import { Link } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'

export function CreateCategoryPage() {
  const { createCategory } = useCategoriesStore()
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
    setTimeout(() => setIsdisabled(false))
    createCategory({
      ...categoryState,
      id: '',
      deletedAt: '',
      createdAt: '',
      updatedAt: ''
    })
    enqueueSnackbar('Adicionado com sucesso', { variant: 'success' })
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
      <Link to="/dashboard/categories">Voltar</Link>
    </FormLayout>
  )
}
