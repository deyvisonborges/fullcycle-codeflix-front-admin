import { useAppDispatch, useAppSelector } from '@/config/store'
import {
  categoriesStoreActions,
  selectCategories
} from './category.store-slice'
import { categoryModelAdapter } from '@/integrations/categories'
import { CategoryUIModel } from './category.ui-model'
import { useCallback, useMemo } from 'react'

export function useCategories() {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectCategories)

  const adaptedCategories = useMemo(
    () => categories.map((c) => categoryModelAdapter(c)) as CategoryUIModel[],
    [categories]
  )

  const findCategoryById = useCallback(
    (id: string) => {
      const category = categories.find((c) => c.id === id)
      return category
        ? (categoryModelAdapter(category) as CategoryUIModel)
        : undefined
    },
    [categories]
  )

  const createCategory = useCallback(
    (category: CategoryUIModel) => {
      dispatch(categoriesStoreActions.createCategory(category))
    },
    [dispatch]
  )

  return {
    categories: adaptedCategories,
    findCategoryById,
    createCategory
  }
}
