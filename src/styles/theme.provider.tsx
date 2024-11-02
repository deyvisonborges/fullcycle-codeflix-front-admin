import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from 'react'
import { theme } from './theme'
import {
  DefaultTheme,
  ThemeProvider as StyledThemeProvider
} from 'styled-components'
import { useThemeSystemDetector } from './useThemeDetector'
import ResetStyles from './reset'

export type ThemeMode = 'light' | 'dark'

export type ThemeContextDataProps = {
  theme: DefaultTheme | undefined
  changeTheme: (mode: ThemeMode) => void
}

export const ThemeContextData = createContext({} as ThemeContextDataProps)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemTheme = useThemeSystemDetector()
  const [mode, setMode] = useState<'light' | 'dark'>(systemTheme)
  const [currentTheme, setCurrentTheme] = useState<DefaultTheme>(theme[mode])

  const changeTheme = useCallback((mode: ThemeMode) => {
    setMode(mode)
  }, [])

  useEffect(() => {
    setCurrentTheme(theme[mode])
  }, [mode])

  useEffect(() => {
    setMode(systemTheme)
  }, [systemTheme])

  return (
    <ThemeContextData.Provider value={{ theme: currentTheme, changeTheme }}>
      <StyledThemeProvider theme={currentTheme}>
        <ResetStyles />
        {children}
      </StyledThemeProvider>
    </ThemeContextData.Provider>
  )
}
