import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'

import { store } from './store/store.ts'
import { ThemeProvider } from './styles/theme/theme.provider.tsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './config/route/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
)
