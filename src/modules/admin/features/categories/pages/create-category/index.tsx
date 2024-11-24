import {
  CategoryFormFields,
  CategoryFormFieldsDataProps
} from '../../components/category-form-fields/category-form-fields'
import { FormLayout } from '@/modules/admin/layout/form'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import { useCreateCategoryMutation } from '../../store/slice'
import { convertToApiModel } from '../../category.ui-model'

export function CreateCategoryPage() {
  const [createCategoryMutation, status] = useCreateCategoryMutation()
  const [isdisabled, setIsdisabled] = useState(false)
  const [categoryState, setCategoryState] =
    useState<CategoryFormFieldsDataProps>({
      name: '',
      isActive: false,
      description: ''
    })

  useEffect(() => {
    if (status.error) {
      enqueueSnackbar('Erro ao criar categoria', { variant: 'error' })
    }
  }, [status.error])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsdisabled(true)
    e.preventDefault()
    await createCategoryMutation(convertToApiModel(categoryState))
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
