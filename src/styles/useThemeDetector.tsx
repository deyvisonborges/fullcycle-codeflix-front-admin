import { useEffect, useState } from 'react'
import { ThemeMode } from './theme.provider'

export function useThemeSystemDetector() {
  const getCurrentTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches

  const [theme, settheme] = useState<ThemeMode>(
    getCurrentTheme() ? 'dark' : 'light'
  )

  useEffect(() => {
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')

    const themeChangeHandler = (event: MediaQueryListEvent) => {
      settheme(event.matches ? 'dark' : 'light')
    }

    darkThemeMq.addEventListener('change', themeChangeHandler)
    return () => darkThemeMq.removeEventListener('change', themeChangeHandler)
  }, [])

  return theme
}
