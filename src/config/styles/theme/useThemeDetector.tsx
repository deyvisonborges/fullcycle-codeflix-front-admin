import { useEffect, useState } from 'react'
import { ThemeMode } from './theme.types'

export function useThemeSystemDetector() {
  const isClient = typeof window !== 'undefined'

  const getCurrentTheme = () =>
    isClient && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'

  const [theme, settheme] = useState<ThemeMode>(getCurrentTheme())

  useEffect(() => {
    if (!isClient) return

    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')

    const themeChangeHandler = (event: MediaQueryListEvent) => {
      settheme(event.matches ? 'dark' : 'light')
    }

    darkThemeMq.addEventListener('change', themeChangeHandler)
    return () => darkThemeMq.removeEventListener('change', themeChangeHandler)
  }, [isClient])

  return theme
}
