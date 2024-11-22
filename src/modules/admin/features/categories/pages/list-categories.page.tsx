import { useNavigate } from 'react-router-dom'
import { HiPencil, HiTrash } from 'react-icons/hi'
import {
  useDeleteCategoryMutation,
  useGetPaginatedCategoriesQuery
} from '../store/slice'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { usePageBasedPagination } from '@/hooks/usePageBasedPagination'
import { CategoryUIModel } from '../category.ui-model'
import { categoryModelAdapter } from '@/integrations/categories'

export function ListCategoriesPage() {
  const navigate = useNavigate()

  const [categories, setCategories] = useState<CategoryUIModel[]>([])

  const ITEMS_PER_PAGE = 2

  const {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    goToNextPage,
    goToPreviousPage
  } = usePageBasedPagination({ data: categories, itemsPerPage: ITEMS_PER_PAGE })

  const { data, isError, status } = useGetPaginatedCategoriesQuery({
    page: currentPage,
    per_page: ITEMS_PER_PAGE
  })

  const [deleteCategory, { error: deleteError, isSuccess: deleteSuccess }] =
    useDeleteCategoryMutation()

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

  useEffect(() => {
    if (data) setCategories(data.data.map((d) => categoryModelAdapter(d)))
  }, [data])

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
          {currentItems.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>{category.isActive ? 'ativo' : 'inativo'}</td>
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

      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <button onClick={() => goToPage(1)} disabled={currentPage === 1}>
          Primeira
        </button>
        <button onClick={() => goToPreviousPage()} disabled={currentPage === 1}>
          Anterior
        </button>

        <span>
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={() => goToNextPage()}
          disabled={currentPage === totalPages}
        >
          Próxima
        </button>
        <button
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          Última
        </button>
      </div>
    </div>
  )
}
