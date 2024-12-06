import Keycloak from 'keycloak-js'
import { useEffect, useRef, useState } from 'react'

const client = new Keycloak({
  url: 'http://127.0.0.1:7080/auth',
  realm: 'codeflix-admin',
  clientId: 'codeflix-admin-auth'
})

export const useAuth = () => {
  const isRun = useRef(false)
  const [hasLogin, setLogin] = useState(false)

  useEffect(() => {
    if (isRun.current) return

    isRun.current = true
    client
      .init({
        onLoad: 'login-required'
      })
      .then((res) => {
        setLogin(res)
      })
  }, [])

  return hasLogin
}
