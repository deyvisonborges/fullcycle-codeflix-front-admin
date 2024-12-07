import { useAppDispatch } from '@/config/store'
import { PropsWithChildren, useEffect } from 'react'
import { client } from '../hooks/useAuth'
import { authSliceActions } from '../store/auth-slice'

export function KeycloakProvider({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const authenticated = await client.init({
          onLoad: 'login-required'
        })

        if (authenticated) {
          dispatch(authSliceActions.setAuthenticated(true))
          dispatch(authSliceActions.setToken(client.token))
          dispatch(authSliceActions.setUserDetails(client.idTokenParsed))
        } else {
          dispatch(authSliceActions.setAuthenticated(false))
        }
      } catch (err) {
        console.error(err)
      }
    }

    client.onTokenExpired = () => {
      return null
    }

    initKeycloak()
  }, [dispatch])

  return <>{children}</>
}
