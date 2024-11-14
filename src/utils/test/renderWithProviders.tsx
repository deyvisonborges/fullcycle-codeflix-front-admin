import { store } from '@/config/store'
import { ThemeProvider } from '@/config/styles/theme/theme.provider'
import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { Provider as ReduxProvider } from 'react-redux'

type CustomRenderProps = Omit<RenderOptions, 'queries'>

export const renderWithProviders = (
  ui: ReactElement,
  { ...renderOptions }: CustomRenderProps
) => {
  return render(
    <ReduxProvider store={store}>
      <ThemeProvider>{ui}</ThemeProvider>
    </ReduxProvider>,
    renderOptions
  )
}
