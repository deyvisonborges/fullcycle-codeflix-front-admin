import { Navigate, RouteObject } from 'react-router-dom'
import { AdminModuleRoutes } from '@/modules/admin/admin.module-routes'
import { AuthModuleRoutes } from '@/modules/auth/module-routes'

const mode = process.env.NODE_ENV

export const defaultRoutes: RouteObject[] = [
  AuthModuleRoutes,
  AdminModuleRoutes,
  {
    path: '*',
    element: (
      // Remover no futuro, e deixar somente o /auth/login
      <Navigate to={mode === 'development' ? '/dashboard' : '/auth/login'} />
    )
  }
]
