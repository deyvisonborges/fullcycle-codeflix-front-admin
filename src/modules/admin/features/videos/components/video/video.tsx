import * as S from './video.styles'

type VideoProps = {
  source: string
  progress: number
  onHandleRemove: () => void
}

export function Video({ source, progress, onHandleRemove }: VideoProps) {
  return (
    <S.VideoRoot>
      <S.Video controls src={source} />
      <S.VideoProgress progress={progress}>{progress}%</S.VideoProgress>
      <S.CloseButton onClick={onHandleRemove}>x</S.CloseButton>
    </S.VideoRoot>
  )
}
