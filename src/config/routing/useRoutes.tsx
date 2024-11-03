import { useState } from 'react'
import { RouteObject } from 'react-router-dom'

export type RouteProps = RouteObject[]

const defaultRoutes: RouteProps = []
export function useRoutes() {
  const [routes, setRoutes] = useState<RouteProps>(defaultRoutes)
}
