import { PropsWithChildren } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import ResetStyles from './reset'
import { theme } from './theme'

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <StyledThemeProvider theme={theme}>
      <ResetStyles />
      {children}
    </StyledThemeProvider>
  )
}
