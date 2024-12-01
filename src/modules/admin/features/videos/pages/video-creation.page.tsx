import { useAppDispatch } from '@/config/store'
import { VideoCreationForm } from '../components/video-creation-form'
import { uploadActions } from '../../uploads/store/upload-slice'

export function VideoCreationPage() {
  const dispatch = useAppDispatch()

  // mock add video
  dispatch(
    uploadActions.addUpload({
      id: '1',
      field: 'test',
      file: new File([], 'test'),
      videoId: '1'
    })
  )

  return (
    <>
      <p>Pagina de criacao de video</p>
      <VideoCreationForm />
    </>
  )
}
