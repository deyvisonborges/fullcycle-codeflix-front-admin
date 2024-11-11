import { useCallback, useMemo } from 'react'
import { useParams, useLocation, useNavigate, useMatch } from 'react-router-dom'

export function useRouter<T>() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams<T>()

  // No React Router 6, `useMatch` substitui `useRouteMatch`.
  // Ele permite passar um padrão para ver se a URL atual corresponde.
  const match = useMatch('/:path*')

  const handleGoBack = useCallback((path: string) => navigate(path), [navigate])

  return useMemo(() => {
    return {
      navigate,
      location,
      match,
      params,
      handleGoBack
    }
  }, [navigate, location, match, params, handleGoBack])
}
