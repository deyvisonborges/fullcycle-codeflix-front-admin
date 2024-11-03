import { useEffect } from 'react'
import { redirect } from 'react-router-dom'

export function NotFoundRedirect() {
  useEffect(() => {
    redirect('/dashboard')
  }, [])
  return null
}
