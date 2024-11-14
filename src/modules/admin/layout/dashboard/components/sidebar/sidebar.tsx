import { Link, useLinkClickHandler } from 'react-router-dom'
import * as S from './sidebar.styles'

export function Sidebar() {
  return (
    <S.Container>
      <p
        onClick={useLinkClickHandler({
          pathname: '/dashboard/categories/create'
        })}
      >
        Create category
      </p>
      <Link to="/dashboard/cast-members">cast members</Link>
    </S.Container>
  )
}
