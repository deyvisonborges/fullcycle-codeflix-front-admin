import { PropsWithChildren } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeProvider } from './config/styles/theme/theme.provider'
import { SnackbarProvider } from 'notistack'
import { store } from './config/store'

export function Providers({ children }: PropsWithChildren) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <SnackbarProvider>{children}</SnackbarProvider>
      </ThemeProvider>
    </ReduxProvider>
  )
}
