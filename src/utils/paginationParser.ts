export function paginationParser(props: { page: number; perPage: number }) {
  const query = new URLSearchParams()
  if (props.page) query.append('page', props.page.toString())
  if (props.perPage) query.append('per_page', props.perPage.toString())
  return query.toString()
}
