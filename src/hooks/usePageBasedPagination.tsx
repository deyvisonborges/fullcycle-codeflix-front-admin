import { useCallback, useMemo, useState } from 'react'

type UsePageBasedPaginationOptions<T> = {
  data?: T[]
  itemsPerPage: number
}

export function usePageBasedPagination<T>({
  data = [],
  itemsPerPage
}: UsePageBasedPaginationOptions<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  // const totalPages = useMemo(() => {
  //   return Math.ceil(data.length / itemsPerPage)
  // }, [data.length, itemsPerPage])

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
  }, [data, currentPage, itemsPerPage])

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page)
      }
    },
    [totalPages]
  )

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }, [totalPages])

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }, [])

  const resetPagination = useCallback(() => {
    setCurrentPage(1)
  }, [])

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    resetPagination,
    setTotalPages
  }
}
