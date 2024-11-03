import { Navigate, RouteObject } from 'react-router-dom'

export const AuthModuleRoutes: RouteObject = {
  path: 'auth',
  children: [
    { index: true, element: <Navigate to="/auth/login" /> },
    { path: 'login', element: <p>Login page</p> },
    { path: 'register', element: <p>Register page</p> },
    {
      path: '*',
      element: <Navigate to="/auth" />
    }
  ]
}
