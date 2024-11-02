import { ReactNode, useCallback, useEffect, useState } from 'react'
import { theme } from './theme'
import {
  DefaultTheme,
  ThemeProvider as StyledThemeProvider
} from 'styled-components'
import { useThemeSystemDetector } from './useThemeDetector'
import ResetStyles from './reset'
import { ThemeContextData } from './theme.context'
import { ThemeMode } from './theme.types'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemTheme = useThemeSystemDetector()
  const [mode, setMode] = useState<ThemeMode>(systemTheme)
  const [currentTheme, setCurrentTheme] = useState<DefaultTheme>(theme[mode])

  const changeTheme = useCallback((mode: ThemeMode) => {
    setMode(mode)
    setCurrentTheme(theme[mode])
  }, [])

  useEffect(() => {
    changeTheme(systemTheme)
  }, [systemTheme, changeTheme])

  return (
    <ThemeContextData.Provider value={{ theme: currentTheme, changeTheme }}>
      <StyledThemeProvider theme={currentTheme}>
        <ResetStyles />
        {children}
      </StyledThemeProvider>
    </ThemeContextData.Provider>
  )
}
