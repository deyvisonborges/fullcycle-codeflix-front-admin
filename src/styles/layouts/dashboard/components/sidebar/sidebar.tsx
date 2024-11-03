import { useLinkClickHandler } from 'react-router-dom'
import * as S from './sidebar.styles'

export function Sidebar() {
  return (
    <S.Container>
      <p
        onClick={useLinkClickHandler({
          pathname: '/dashboard/category/create'
        })}
      >
        Create category
      </p>
    </S.Container>
  )
}
