import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  CategoryFormFields,
  CategoryFormFieldsDataProps
} from '../components/category-form-fields'
import { FormLayout } from '@/modules/admin/layout/form'
import { useGetCategoryQuery, useUpdateCategoryMutation } from '../store/slice'
import { useSnackbar } from 'notistack'
import { convertToApiModel } from '../category.ui-model'

export function EditCategoryPage() {
  const { id } = useParams()

  const { data, isLoading } = useGetCategoryQuery({ id: String(id) })

  const [isdisabled, setIsdisabled] = useState(false)
  const [updateCategoryMutation, status] = useUpdateCategoryMutation()
  const [categoryState, setCategoryState] =
    useState<CategoryFormFieldsDataProps>({
      name: '',
      isActive: false,
      description: ''
    })

  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (id && data) {
      const category = data.data
      setCategoryState({
        name: category.name,
        description: category.description,
        isActive: category.is_active
      })
    }
  }, [data, id])

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar('Category updated successfully', { variant: 'success' })
      setIsdisabled(false)
    }
    if (status.error) {
      enqueueSnackbar('Category not updated', { variant: 'error' })
    }
  }, [enqueueSnackbar, status.error, status.isSuccess])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateCategoryMutation({
      id: String(id),
      payload: convertToApiModel(categoryState)
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

  if (isLoading) return <p>Carregando categoria...</p>

  if (!data) return <p>Sem dados</p>

  return (
    <FormLayout
      headerProps={{ title: 'Editar categoria' }}
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
