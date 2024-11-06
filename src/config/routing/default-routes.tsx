import { Navigate, RouteObject } from 'react-router-dom'
import { DashboardModuleRoutes } from '@/modules/dashboard/dashboard.module-routes'
import { AuthModuleRoutes } from '@/modules/auth/module-routes'

export const defaultRoutes: RouteObject[] = [
  AuthModuleRoutes,
  DashboardModuleRoutes,
  {
    path: '*',
    element: <Navigate to="/auth/login" />
  }
]
