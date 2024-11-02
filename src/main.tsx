import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'

import App from './App.tsx'
import { store } from './store/store.ts'
import { ThemeProvider } from './styles/theme/theme.provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
)
