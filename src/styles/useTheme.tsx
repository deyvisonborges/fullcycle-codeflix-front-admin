import { useContext } from 'react'
import { ThemeContextData, ThemeContextDataProps } from './theme.provider'

export const useTheme = (): ThemeContextDataProps => {
  const context = useContext(ThemeContextData)
  if (!context)
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider')
  return context
}
