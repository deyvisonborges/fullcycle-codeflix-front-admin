export type OffsetLimitPaginationResponse<T> = {
  data: T
  meta: {
    //GET /api/posts?offset=0&limit=10
    offset: number
    limit: number
  }
}
