export type PageBasedPaginationResponse<T> = {
  /**
   * @description
   * Array de itens da página atual
   */
  data: T[]
  meta: PageBasedPagination
}

/**
 * Usado pelo front para solicitar os dados
 * @example
 * GET /categories?page=2&perPage=10
 */
export type PageBasedPaginationQuery = {
  /**
   * @description
   *  A página atual que o usuário deseja acessar (ex.: page=2).
   */
  page: number

  /**
   * @description
   * (ou limit): A quantidade de itens por página.
   * É importante definir esse valor para manter a
   * consistência na exibição de dados entre requisições.
   */
  per_page: number
}

export type PageBasedPagination = {
  /**
   * @description
   *  O total de itens disponíveis (por exemplo, todas as categorias
   * ou produtos no banco de dados). Esse dado é retornado pelo backend,
   * pois ele conhece o conjunto completo de dados.
   */
  totalItems: number

  /**
   * @description
   * O número total de páginas, que depende de totalItems e perPage.
   * Como o frontend não tem acesso a totalItems,
   * apenas o backend pode calcular isso corretamente.
   */
  totalPages: number

  /**
   * @description
   * Em geral, o cálculo do offset é uma responsabilidade do backend,
   * que faz esse cálculo com base em page e perPage.
   */
  offset?: number
} & PageBasedPaginationQuery
