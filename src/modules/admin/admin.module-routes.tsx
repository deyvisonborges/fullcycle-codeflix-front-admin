import { Navigate, RouteObject } from 'react-router-dom'
import { categoryRoutes } from './features/categories/categories.routes'
import { DashboardLayout } from './layout/dashboard'
import { castMembersRoutes } from './features/cast-members/routes'

export const AdminModuleRoutes: RouteObject = {
  path: 'dashboard',
  element: <DashboardLayout />,
  children: [
    categoryRoutes,
    castMembersRoutes,
    {
      path: '*',
      element: <Navigate to="/dashboard" />
    }
  ]
}
