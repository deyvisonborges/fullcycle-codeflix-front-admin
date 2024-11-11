import { useNavigate } from 'react-router-dom'
import { HiPencil, HiTrash } from 'react-icons/hi'
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery
} from '../store/slice'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'

export function ListCategoriesPage() {
  const { data, isError, status } = useGetCategoriesQuery()
  const [deleteCategory, { error: deleteError, isSuccess: deleteSuccess }] =
    useDeleteCategoryMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (deleteError) {
      enqueueSnackbar('Erro ao deletar categoria', {
        variant: 'error'
      })
    }
    if (deleteSuccess) {
      enqueueSnackbar('Categoria deletada com sucesso', {
        variant: 'success'
      })
    }
  }, [deleteError, deleteSuccess])

  // Exibe mensagem de erro ao listar categorias caso o serviço esteja indisponível
  if (isError || status === 'rejected') {
    return <p>Erro ao listar as categorias. Tente novamente mais tarde.</p>
  }

  if (!data) return <p>Carregando...</p>

  return (
    <div>
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <HiPencil
                  onClick={() =>
                    navigate(`/dashboard/categories/edit/${category.id}`)
                  }
                />
                &nbsp;
                <HiTrash onClick={() => deleteCategory({ id: category.id })} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
