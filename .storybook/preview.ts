import type { Preview } from '@storybook/react'

import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { withThemeFromJSXProvider } from '@storybook/addon-themes'

import { theme } from '../src/styles/theme'

/* TODO: replace with your own global styles, or remove */
const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  `

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },

  decorators: [
    withThemeFromJSXProvider({
      themes: {
        light: theme.light,
        dark: theme.dark
      },
      defaultTheme: 'light',
      Provider: ThemeProvider,
      GlobalStyles
    })
  ]
}

export default preview
