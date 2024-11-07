import { useCallback, useMemo } from 'react'
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch
} from 'react-router-dom'

export function useRouter<T>() {
  const history = useHistory()
  const location = useLocation<T>()
  const match = useRouteMatch()
  const params = useParams()

  const handleGoBack = useCallback(() => history.goBack(), [history])

  return useMemo(() => {
    return {
      history,
      location,
      match,
      params,
      handleGoBack
    }
  }, [history, location, match, params, handleGoBack])
}
