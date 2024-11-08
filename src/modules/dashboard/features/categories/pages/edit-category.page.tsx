import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  CategoryFormFields,
  CategoryFormFieldsDataProps
} from '../components/category-form-fields'
import { FormLayout } from '@/modules/dashboard/layout/form'
import { useCategoriesStore } from '../store/hook'

export function EditCategoryPage() {
  const id = useParams().id as string

  const { findCategoryById, updateCategory } = useCategoriesStore()
  const [isdisabled, setIsdisabled] = useState(false)
  const [categoryState, setCategoryState] =
    useState<CategoryFormFieldsDataProps>({
      name: '',
      isActive: false,
      description: ''
    })

  useEffect(() => {
    if (id) {
      const c = findCategoryById(id)!
      setCategoryState(c)
    }
  }, [findCategoryById, id])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setIsdisabled(true)
    e.preventDefault()
    const formData = new FormData(e.target as never)
    setCategoryState({ ...categoryState, ...formData })
    setTimeout(() => setIsdisabled(false), 3000)
    updateCategory({ ...categoryState })
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
