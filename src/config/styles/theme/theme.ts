import { DefaultTheme } from 'styled-components'
import { ThemeMode } from './theme.types'

export const lightTheme: DefaultTheme = {
  informative: { danger: '#d72c0d' },
  background: {
    default: 'yellow'
  },
  primary: {
    main: '#008060'
  },
  secondary: {
    main: '#111111'
  },
  text: {
    primary: '#222222'
  }
}

export const darkTheme: DefaultTheme = {
  informative: { danger: '#d72c0d' },
  background: {
    default: '#222222'
  },
  primary: {
    main: '#008060'
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
