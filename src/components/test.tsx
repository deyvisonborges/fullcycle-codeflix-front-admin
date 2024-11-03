import * as S from './test.styles'
import { toastActions, useAppDispatch, useAppSelector } from '@/store'

export function Test() {
  const dispatch = useAppDispatch()
  const { isVisible, message } = useAppSelector((state) => state.toast)
  return (
    <div>
      <p>Habilitado: {isVisible}</p>
      {isVisible && <p>Message: {message}</p>}
      <button
        onClick={() =>
          isVisible
            ? dispatch(toastActions.hideToast())
            : dispatch(toastActions.showToast(`Messagem para o toast`))
        }
      >
        {isVisible ? 'Desabilitar' : 'Habilitar'}
      </button>
      <S.Button as="a" href="/dashboard">
        Button
      </S.Button>
      <a href="/not-fount">Not found</a>
    </div>
  )
}
