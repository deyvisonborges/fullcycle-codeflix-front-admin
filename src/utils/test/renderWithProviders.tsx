import { ReactElement, PropsWithChildren } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeProvider } from '@/config/styles/theme/theme.provider'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter } from 'react-router-dom'
import { store } from '@/config/store'

type ProvidersProps = {
  store?: ReturnType<typeof configureStore>
} & PropsWithChildren

const rootTmpStore = store

// eslint-disable-next-line react-refresh/only-export-components
const Providers = ({ children, store }: ProvidersProps) => {
  return (
    <ReduxProvider store={rootTmpStore || store}>
      <BrowserRouter>
        <ThemeProvider>
          <SnackbarProvider>{children}</SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ReduxProvider>
  )
}

type CustomRenderProps = Omit<RenderOptions, 'queries'> & {
  store?: ReturnType<typeof configureStore>
}

const customRender = (ui: ReactElement, options?: CustomRenderProps) => {
  return render(ui, {
    wrapper: (props) => <Providers store={options?.store} {...props} />,
    ...options
  })
}

export { customRender as renderWithProviders }
