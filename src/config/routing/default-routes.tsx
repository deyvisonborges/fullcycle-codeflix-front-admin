import { Navigate, RouteObject } from 'react-router-dom'
import ErrorPage from './error-page'
import { Test } from '@/components/test'
import { DashboardLayout } from '@/styles/layouts/dashboard'
import { CreateCategoryPage } from '@/feature/dashboard/category/pages/create-category.page'

export const defaultRoutes: RouteObject[] = [
  {
    path: 'auth',
    children: [
      { index: true, element: <Navigate to="/auth/login" /> },
      { path: 'login', element: <p>Login page</p> },
      { path: 'register', element: <p>Register page</p> },
      {
        path: '*',
        element: <Navigate to="/auth" />,
        errorElement: <ErrorPage />
      }
    ]
  },
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: (
      <>
        <div>
          Hello world! <a href="/test">ir para test</a>
        </div>
        <div>
          Hello world! <a href="/auth">ir para /auth</a>
        </div>
      </>
    )
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: '*',
        element: <Navigate to="/dashboard" />,
        errorElement: <ErrorPage />
      },
      {
        path: 'category/create',
        element: <CreateCategoryPage />,
        errorElement: <Navigate to="/dashboard" />
      }
    ]
  },
  {
    path: '/test',
    element: <Test />
  },
  {
    path: '*',
    element: <Navigate to="/" />,
    errorElement: <ErrorPage />
  }
]
