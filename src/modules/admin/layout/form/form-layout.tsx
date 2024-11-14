import { FormHeaderProps, FormHeader } from './components/form-header'
import * as S from './form-layout.styles'
import { FormEvent, PropsWithChildren } from 'react'

type FormLayoutProps = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  headerProps: FormHeaderProps
  isDisabled?: boolean
  isLoading?: boolean
} & PropsWithChildren

export function FormLayout({
  children,
  headerProps,
  handleSubmit,
  isDisabled,
  isLoading
}: FormLayoutProps) {
  return (
    <S.Container>
      <FormHeader {...headerProps} />

      <S.Form onSubmit={handleSubmit}>
        {children}
        <S.ButtonGroup>
          <S.CancelButton type="button">Cancelar</S.CancelButton>
          <S.SaveButton disabled={isDisabled || isLoading} type="submit">
            {isLoading ? 'Salvando' : 'Salvar'}
          </S.SaveButton>
        </S.ButtonGroup>
      </S.Form>

      <S.Footer />
    </S.Container>
  )
}
