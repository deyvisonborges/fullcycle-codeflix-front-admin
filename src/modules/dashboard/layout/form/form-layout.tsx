import { FormHeaderProps, FormHeader } from './components/form-header'
import * as S from './form-layout.styles'
import { FormEvent, PropsWithChildren } from 'react'

type FormLayoutProps = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  headerProps: FormHeaderProps
} & PropsWithChildren

export function FormLayout({
  children,
  headerProps,
  handleSubmit
}: FormLayoutProps) {
  return (
    <S.Container>
      <FormHeader {...headerProps} />

      <S.Form onSubmit={handleSubmit}>
        {children}
        <S.ButtonGroup>
          <S.CancelButton>Cancelar</S.CancelButton>
          <S.SaveButton type="submit">Salvar</S.SaveButton>
        </S.ButtonGroup>
      </S.Form>

      <S.Footer />
    </S.Container>
  )
}
