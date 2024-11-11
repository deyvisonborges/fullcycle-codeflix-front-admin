import { Navigate, RouteObject } from 'react-router-dom'
import { categoryRoutes } from './features/categories/category.feature-routes'
import { DashboardLayout } from './layout/dashboard'

export const AdminModuleRoutes: RouteObject = {
  path: 'dashboard',
  element: <DashboardLayout />,
  children: [
    categoryRoutes,
    {
      path: '*',
      element: <Navigate to="/dashboard" />
    }
  ]
}
