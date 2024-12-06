import { Outlet } from 'react-router-dom'
import * as S from './dashboard-layout.styles'
import { Sidebar } from './components/sidebar/sidebar'
import { useAuth } from '@/modules/auth/hooks/useAuth'

export function DashboardLayout() {
  const hasAuth = useAuth()

  console.log(hasAuth)

  return (
    <S.Container>
      <Sidebar />
      <S.Content>
        <a href="/dashboard/not-found">Nout foud dashboard nested</a>
        <Outlet />
      </S.Content>
    </S.Container>
  )
}
