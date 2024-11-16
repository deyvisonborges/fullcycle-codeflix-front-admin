import { apiSlice } from '@/config/store/slices/api-slice'
import { categoriesApiSlice } from '@/modules/admin/features/categories/store/slice'
import { Provider as ReduxProvider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { ThemeProvider } from '@/config/styles/theme/theme.provider'
import { SnackbarProvider } from 'notistack'

type CustomRenderProps = Omit<RenderOptions, 'queries'> & {
  store?: ReturnType<typeof configureStore>
}

export const renderWithProviders = (
  ui: ReactElement,
  {
    store = configureStore({
      reducer: {
        [categoriesApiSlice.reducerPath]: apiSlice.reducer
      }
    }),
    ...renderOptions
  }: CustomRenderProps
) => {
  return render(
    <ReduxProvider store={store}>
      <ThemeProvider>
        <SnackbarProvider>{ui}</SnackbarProvider>
      </ThemeProvider>
    </ReduxProvider>,
    renderOptions
  )
}
