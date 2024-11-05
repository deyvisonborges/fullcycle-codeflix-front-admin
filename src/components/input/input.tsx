import * as S from './input.styles'
import { ComponentPropsWithRef } from 'react'

type InputProps = {} & ComponentPropsWithRef<'input'>

export const Input = (props: InputProps) => {
  return <S.Input {...props} />
}
