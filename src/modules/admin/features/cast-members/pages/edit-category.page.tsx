import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  CastMemberForm,
  CastMemberFormFieldsProps
} from '../components/cast-member-form'
import { FormLayout } from '@/modules/admin/layout/form'
import { categoryModelAdapter } from '@/integrations/categories'
import { useSnackbar } from 'notistack'
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation
} from '../../categories/store/slice'
import { convertToApiModel } from '../cast-member.ui-model'
import { useUpdateCastMemberMutation } from '../api/cast-member.service'

export function EditCategoryPage() {
  const id = useParams().id as string
  const { data } = useGetCategoryQuery({ id })

  const [isdisabled, setIsdisabled] = useState(false)
  const [updateCategoryMutation, status] = useUpdateCastMemberMutation()
  const [categoryState, setCategoryState] = useState<CastMemberFormFieldsProps>(
    {
      name: '',
      type: ''
    }
  )

  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (id && data) {
      setCategoryState(categoryModelAdapter(data))
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
      id: id,
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

  if (!categoryState) {
    return <p>Not found category with id {id}</p>
  }

  if (!data) return null

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
