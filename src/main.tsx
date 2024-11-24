import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'

import { store } from './config/store/store.ts'
import { ThemeProvider } from './config/styles/theme/theme.provider.tsx'
import { RouterProvider } from 'react-router-dom'
import { routes } from './config/routing/index.tsx'
import { SnackbarProvider } from 'notistack'

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') return
  const { worker } = await import('./mocks/browser.ts')
  return worker.start()
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ReduxProvider store={store}>
        <ThemeProvider>
          <SnackbarProvider>
            <RouterProvider router={routes} />
          </SnackbarProvider>
        </ThemeProvider>
      </ReduxProvider>
    </StrictMode>
  )
})
