import { useNavigate } from 'react-router-dom'
import { HiPencil, HiTrash } from 'react-icons/hi'
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery
} from '../store/slice'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
// import { apiSlice } from '@/config/store/slices/api-slice'

export function ListCategoriesPage() {
  // const { categories, deleteCategory } = useCategoriesStore()
  const { data } = useGetCategoriesQuery()
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (deleteCategoryStatus.error) {
      enqueueSnackbar('categoria deleta com sucesso', {
        variant: 'error'
      })
    }
    if (deleteCategoryStatus.isSuccess) {
      enqueueSnackbar('categoria deleta com sucesso', {
        variant: 'warning'
      })
    }
  }, [deleteCategoryStatus.error, deleteCategoryStatus.isSuccess])

  if (!data) return null

  return (
    <div>
      <table border={1}>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>description</th>
          <th>action</th>
        </tr>
        {data.map((category) => (
          <tr>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>{category.description}</td>
            <td>
              &nbsp;{' '}
              <HiPencil
                onClick={() =>
                  navigate('/dashboard/categories/edit/' + category.id)
                }
              />{' '}
              &nbsp;{' '}
              <HiTrash onClick={() => deleteCategory({ id: category.id })} />
              &nbsp;
            </td>
          </tr>
        ))}
      </table>
    </div>
  )
}
