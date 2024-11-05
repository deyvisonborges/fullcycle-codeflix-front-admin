import { DashboardLayout } from '@/config/styles/layouts/dashboard'
import { Navigate, RouteObject } from 'react-router-dom'
import { CreateCategoryPage } from './category/pages/create-category.page'

export const DashboardModuleRoutes: RouteObject = {
  path: 'dashboard',
  element: <DashboardLayout />,
  children: [
    {
      path: 'categories',
      children: [
        {
          index: true,
          element: (
            <div>
              Categories list <a href="/dashboard/categories/edit/12">opds</a>
            </div>
          )
        },
        { path: 'create', element: <CreateCategoryPage /> },
        {
          path: 'edit/:id',
          element: <p>Edit page</p>
        }
      ]
    },
    {
      path: '*',
      element: <Navigate to="/dashboard" />
    }
  ]
}
