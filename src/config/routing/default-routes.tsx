import { Navigate, RouteObject } from 'react-router-dom'
import { Test } from '@/components/test'
import { DashboardModuleRoutes } from '@/feature/dashboard/module-routes'
import { AuthModuleRoutes } from '@/feature/auth/module-routes'

export const defaultRoutes: RouteObject[] = [
  AuthModuleRoutes,
  DashboardModuleRoutes,
  {
    path: '/test',
    element: <Test />
  },
  {
    path: '*',
    element: <Navigate to="/auth/login" />
  }
]
