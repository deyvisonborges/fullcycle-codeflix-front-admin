import { Navigate, RouteObject } from 'react-router-dom'
import { LoginPage } from './login/page'

export const AuthModuleRoutes: RouteObject = {
  path: 'auth',
  children: [
    { index: true, element: <Navigate to="/auth/login" /> },
    { path: 'login', element: <LoginPage /> },
    { path: 'register', element: <p>Register page</p> },
    {
      path: '*',
      element: <Navigate to="/auth" />
    }
  ]
}
