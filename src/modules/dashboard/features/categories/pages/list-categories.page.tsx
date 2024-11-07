import { useNavigate } from 'react-router-dom'
import { useCategories } from '../categories.store-hook'
import { HiPencil, HiTrash } from 'react-icons/hi'

export function ListCategoriesPage() {
  const { categories, deleteCategory } = useCategories()
  const navigate = useNavigate()

  return (
    <div>
      <table border={1}>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>description</th>
          <th>action</th>
        </tr>
        {categories.map((category) => (
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
              <HiTrash onClick={() => deleteCategory({ id: category.id })} />{' '}
              &nbsp;
            </td>
          </tr>
        ))}
      </table>
    </div>
  )
}
