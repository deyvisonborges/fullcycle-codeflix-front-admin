import { createBrowserRouter, Navigate } from 'react-router-dom'
import ErrorPage from './error-page'
import { Test } from '@/components/test'
import { DashboardLayout } from '@/styles/layouts/dashboard'
import { CreateCategoryPage } from '@/feature/dashboard/category/pages/create-category.page'

async function getDashboardLoader() {
  const data = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then((response) => response.json())
    .then((json) => console.log(json))

  console.log(data)
  return null
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        Hello world! <a href="/test">ir para test</a>
      </div>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/test',
    element: <Test />
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    errorElement: <Navigate to="/dashboard" />,
    children: [
      {
        path: 'category/create',
        element: <CreateCategoryPage />,
        errorElement: <Navigate to="/dashboard" />
      }
    ]
  }
])
