import { useNavigate } from 'react-router-dom'
import { HiPencil, HiTrash } from 'react-icons/hi'
import {
  useDeleteCategoryMutation,
  useGetPaginatedCategoriesQuery
} from '../store/slice'
import { enqueueSnackbar } from 'notistack'
import { useDeferredValue, useEffect, useState } from 'react'
import { usePageBasedPagination } from '@/hooks/usePageBasedPagination'
import { CategoryUIModel } from '../category.ui-model'
import { categoryModelAdapter } from '@/integrations/categories'

export function ListCategoriesPage() {
  // ====> inicio search
  const [search, setSearch] = useState<string>('')
  const deferredSearch = useDeferredValue(search)
  const [statusFilter, setStatusFilter] = useState('') // status: '' (todos), 'active', 'inactive'
  // ====> fim search

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
    if (data?.data) {
      const adaptedData = data.data.map((d) =>
        categoryModelAdapter<CategoryUIModel>(d)
      )

      const filtered = adaptedData.filter((category) => {
        const matchesName = category.name
          .toLowerCase()
          .includes(search.toLowerCase())
        const matchesStatus =
          statusFilter === '' ||
          (statusFilter === 'active' && category.isActive) ||
          (statusFilter === 'inactive' && !category.isActive)

        return matchesName && matchesStatus
      })

      setCategories(filtered)
    }
  }, [data, goToPage, search, statusFilter])

  useEffect(() => {
    goToPage(1)
  }, [goToPage, statusFilter])

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
                <HiTrash
                  data-testid="trash-icon"
                  onClick={() => deleteCategory({ id: category.id })}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Buscar por nome"
          value={deferredSearch}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ marginLeft: '8px' }}
        >
          <option value="">Todos</option>
          <option value="active">Ativo</option>
          <option value="inactive">Inativo</option>
        </select>
      </div>

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
