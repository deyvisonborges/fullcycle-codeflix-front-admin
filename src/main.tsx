import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'

import { store } from './config/store/store.ts'
import { ThemeProvider } from './config/styles/theme/theme.provider.tsx'
import { RouterProvider } from 'react-router-dom'
import { routes } from './config/routing/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider>
        <RouterProvider router={routes} />
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
)
