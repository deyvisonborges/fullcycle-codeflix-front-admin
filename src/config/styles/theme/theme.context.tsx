import { DefaultTheme } from 'styled-components'
import { createContext } from 'react'
import { ThemeMode } from './theme.types'

export type ThemeContextDataProps = {
  theme: DefaultTheme | undefined
  changeTheme: (mode: ThemeMode) => void
}

export const ThemeContextData = createContext({} as ThemeContextDataProps)
