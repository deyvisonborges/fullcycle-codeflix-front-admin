import { HiArrowLeft } from 'react-icons/hi'
import * as S from './form-header.styles'

export type FormHeaderProps = {
  title: string
}

export function FormHeader({ title }: FormHeaderProps) {
  return (
    <S.Container id="form__header">
      <S.LeftCorner>
        <S.IconContainer>
          <HiArrowLeft />
        </S.IconContainer>
        <S.LeftCornerHeading>{title}</S.LeftCornerHeading>
      </S.LeftCorner>
    </S.Container>
  )
}
