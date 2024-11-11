import { Navigate, RouteObject } from 'react-router-dom'
import { AdminModuleRoutes } from '@/modules/admin/admin.module-routes'
import { AuthModuleRoutes } from '@/modules/auth/module-routes'

export const defaultRoutes: RouteObject[] = [
  AuthModuleRoutes,
  AdminModuleRoutes,
  {
    path: '*',
    element: <Navigate to="/auth/login" />
  }
]
