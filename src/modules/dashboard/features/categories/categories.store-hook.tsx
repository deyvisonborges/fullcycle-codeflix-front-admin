import { useAppDispatch, useAppSelector } from '@/config/store'
import {
  categoriesStoreActions,
  categoriesStoreSelectors
} from './categories.store-slice'
import { CategoryUIModel } from './category.ui-model'
import { useCallback } from 'react'
import { CategoryID } from './category-id.primitive'

export function useCategories() {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(categoriesStoreSelectors.selectCategories)

  const findCategoryById = useCallback(
    (id: string) => {
      const category = categories.find((c) => c.id === id)
      return category ? category : undefined
    },
    [categories]
  )

  const createCategory = useCallback(
    (category: CategoryUIModel) => {
      dispatch(categoriesStoreActions.createCategory(category))
    },
    [dispatch]
  )

  const updateCategory = useCallback(
    (category: Partial<CategoryUIModel>) => {
      dispatch(categoriesStoreActions.updateCategory(category))
    },
    [dispatch]
  )

  const deleteCategory = useCallback(
    ({ id }: CategoryID) => {
      dispatch(categoriesStoreActions.deleteCategory({ id }))
    },
    [dispatch]
  )

  return {
    categories,
    findCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
  }
}
