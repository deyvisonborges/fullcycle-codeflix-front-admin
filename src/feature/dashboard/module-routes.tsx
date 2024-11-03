import { DashboardLayout } from '@/styles/layouts/dashboard'
import { Navigate, RouteObject } from 'react-router-dom'
import { CreateCategoryPage } from './category/pages/create-category.page'

export const DashboardModuleRoutes: RouteObject = {
  path: 'dashboard',
  element: <DashboardLayout />,
  children: [
    {
      path: 'categories',
      element: <div>Categories list</div>,
      children: [{ path: 'create', element: <CreateCategoryPage /> }]
    },
    {
      path: '*',
      element: <Navigate to="/dashboard" />
    }
  ]
}
