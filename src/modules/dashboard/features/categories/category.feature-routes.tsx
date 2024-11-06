import { RouteObject } from 'react-router-dom'
import { CreateCategoryPage } from './pages/create-category'
import { EditCategoryPage } from './pages/edit-category.page'
import { ListCategoriesPage } from './pages/list-categories.page'

export const categoryRoutes: RouteObject = {
  path: 'categories',
  children: [
    { index: true, element: <ListCategoriesPage /> },
    { path: 'create', element: <CreateCategoryPage /> },
    { path: 'edit/:id', element: <EditCategoryPage /> }
  ]
}
