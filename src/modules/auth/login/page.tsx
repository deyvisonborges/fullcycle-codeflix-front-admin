import { usePageBasedPagination } from '@/hooks/usePageBasedPagination'
import { CategoryModel } from '@/integrations/categories'
import { useGetPaginatedCategoriesQuery } from '@/modules/admin/features/categories/store/slice'
import { useEffect, useState } from 'react'

export const LoginPage = () => {
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

  const { data } = useGetPaginatedCategoriesQuery({
    page: currentPage,
    per_page: itemsPerPage
  })

  useEffect(() => {
    if (data) setCategories(data?.data.flat()) // `data.data` contém o array direto de `CategoryModel`
  }, [data])

  return (
    <div>
      <h1>Exemplo de Paginação</h1>
      <ul>
        {currentItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

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
