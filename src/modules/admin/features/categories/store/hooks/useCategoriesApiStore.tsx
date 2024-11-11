// WIP: refatorar
// import { useLayoutEffect, useState } from 'react'
// import { CategoryUIModel } from '../../category.ui-model'
// import { useGetPaginatedCategoriesQuery } from '../slice'
// import { categoryModelAdapter } from '@/integrations/categories'

// export function useCategoriesApiStore() {
//   const { data, isError, status } = useGetPaginatedCategoriesQuery({})

//   const [categories, setCategories] = useState<CategoryUIModel[]>([])

//   useLayoutEffect(() => {
//     if (data)
//       setCategories(
//         data.data.flat().map((category) => categoryModelAdapter(category))
//       )
//   }, [data])

//   return { categories, isError, status }
// }
