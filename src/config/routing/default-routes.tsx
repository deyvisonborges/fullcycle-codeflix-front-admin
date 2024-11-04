import { Navigate, RouteObject } from 'react-router-dom'
import { DashboardModuleRoutes } from '@/feature/dashboard/module-routes'
import { AuthModuleRoutes } from '@/feature/auth/module-routes'

export const defaultRoutes: RouteObject[] = [
  AuthModuleRoutes,
  DashboardModuleRoutes,
  {
    path: '*',
    element: <Navigate to="/auth/login" />
  }
]
