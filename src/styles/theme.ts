import { DefaultTheme } from 'styled-components'
import { ThemeMode } from './theme.provider'

export const lightTheme: DefaultTheme = {
  background: {
    default: 'yellow'
  },
  primary: {
    main: '#111111'
  },
  secondary: {
    main: '#111111'
  },
  text: {
    primary: '#222222'
  }
}

export const darkTheme: DefaultTheme = {
  background: {
    default: '#222222'
  },
  primary: {
    main: '#E50914'
  },
  secondary: {
    main: '#FFFFFF'
  },
  text: {
    primary: '#FFFFFF'
  }
}

export const theme: Record<ThemeMode, DefaultTheme> = {
  light: lightTheme,
  dark: darkTheme
}
