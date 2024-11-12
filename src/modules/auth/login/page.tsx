import { usePageBasedPagination } from '@/hooks/usePageBasedPagination'
import { CategoryModel } from '@/integrations/categories'
import { useGetPaginatedCategoriesQuery } from '@/modules/admin/features/categories/store/slice'
import { Suspense, useDeferredValue, useEffect, useState } from 'react'

export const LoginPage = () => {
  const [search, setSearch] = useState('')
  const deferredSearch = useDeferredValue(search)
  const [statusFilter, setStatusFilter] = useState('') // status: '' (todos), 'active', 'inactive'

  const [categories, setCategories] = useState<CategoryModel[]>([])
  const itemsPerPage = 2

  const {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    goToNextPage,
    goToPreviousPage
  } = usePageBasedPagination<CategoryModel>({
    data: categories, // Passe o array direto `categories` (não um array de arrays)
    itemsPerPage // Configure para 2 itens por página
  })

  //WIP: criar um set data o use page based pagination pois quando eu faco os filtros, a paginacao fica certa, porem algunas paginas ficam vazias
  const { data } = useGetPaginatedCategoriesQuery({
    page: currentPage,
    per_page: itemsPerPage
  })

  const filteredData = currentItems.filter((category) => {
    const matchesName = category.name
      .toLowerCase()
      .includes(deferredSearch.toLowerCase())

    const matchesStatus =
      statusFilter === '' ||
      (statusFilter === 'active' && category.is_active) ||
      (statusFilter === 'inactive' && !category.is_active)

    return matchesName && matchesStatus
  })

  useEffect(() => {
    if (data) setCategories(data?.data.flat()) // `data.data` contém o array direto de `CategoryModel`
  }, [data])

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Buscar por nome"
          value={search}
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
      <h1>Exemplo de Paginação</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <ul>
          {filteredData.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </Suspense>

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
