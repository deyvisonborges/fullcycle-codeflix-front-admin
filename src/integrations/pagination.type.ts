export type PaginationResponse<T> = {
  page: number // current page
  per_page: number // items quantity per page
  total: number // items total
  total_pages: number
  data: T[]
}
