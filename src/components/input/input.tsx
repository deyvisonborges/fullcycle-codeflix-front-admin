import * as S from './input.styles'
import { ComponentPropsWithRef } from 'react'

type InputProps = { label?: string } & ComponentPropsWithRef<'input'>

export const Input = ({ label, ...restProps }: InputProps) => {
  return (
    <S.InputContainer>
      {label && <S.Label htmlFor={restProps.name}>{label}</S.Label>}
      <S.Input {...restProps} />
    </S.InputContainer>
  )
}
