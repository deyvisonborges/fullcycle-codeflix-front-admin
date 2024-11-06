import { useAppSelector } from '@/config/store'
import { selectCategories } from './category.store-slice'
import { categoryModelAdapter } from '@/integrations/categories'
import { CategoryUIModel } from './category.ui-model'

export function useCategories() {
  const { categories } = useAppSelector(selectCategories)

  return {
    categories: categories.map((c) =>
      categoryModelAdapter(c)
    ) as CategoryUIModel[]
  }
}
