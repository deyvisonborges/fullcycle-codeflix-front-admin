import { useState, useEffect } from 'react'

interface PaginationHookParams<T> {
  queryFn: (params: {
    page: number
    per_page: number
  }) => { data: T[]; total: number; total_pages: number } | null
  pageSize?: number
}

export function usePagination<T>({
  queryFn,
  pageSize = 10
}: PaginationHookParams<T>) {
  const [page, setPage] = useState(1)
  const [data, setData] = useState<T[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await queryFn({ page, per_page: pageSize })
        if (response) {
          setData(response.data)
          setTotalPages(response.total_pages)
        }
      } catch (err) {
        setError('Erro ao carregar dados de paginação')
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [page, pageSize, queryFn])

  const nextPage = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1)
  }

  const previousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1)
  }

  const resetPagination = () => setPage(1)

  return {
    data,
    page,
    totalPages,
    isLoading,
    error,
    nextPage,
    previousPage,
    resetPagination
  }
}
