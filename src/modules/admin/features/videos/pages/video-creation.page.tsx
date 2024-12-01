import { FormLayout } from '@/modules/admin/layout/form'
import { VideoCreationForm } from '../components/video-creation-form'
// import { useAppDispatch, useAppSelector } from '@/config/store'
// import { uploadActions, uploadQueries } from '../../uploads/store/upload-slice'
import { useAppDispatch } from '@/config/store'
import { uploadActions } from '../../uploads/store/upload-slice'
// import { ChangeEvent, FormEvent } from 'react'
import { ChangeEvent } from 'react'
import { VideoID } from '../video-id.primitive'
// import { useCreateVideoMutation } from '../api/videos.api'

export function VideoCreationPage() {
  const dispatch = useAppDispatch()
  // const uploads = useAppSelector(uploadQueries.selectUploads)
  // const [createVideoMutation, status] = useCreateVideoMutation()

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()

  //   const test = uploads[0]
  //   const { data } = await createVideoMutation({
  //     ...test,
  //     title: '',
  //     description: '',
  //     year_launched: 0,
  //     opened: false,
  //     rating: '',
  //     duration: 0
  //   }).unwrap()
  // }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files) {
      Array.from(files).map((file) => {
        const id = crypto.randomUUID()
        dispatch(
          uploadActions.addUpload({
            id,
            videoId: id,
            file,
            previewURL: URL.createObjectURL(file),
            field: file.name
          })
        )
      })
    }
  }

  // const handleSubmitUploads = (videoID: string) => {
  //   uploads.forEach((upload, index) => {
  //     dispatch(
  //       uploadActions.addUpload({
  //         ...upload
  //       })
  //     )
  //   })
  // }

  const removeVideo = ({ id }: VideoID) => {
    dispatch(uploadActions.deleteUpload(id))
    // setVideos((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <FormLayout
      headerProps={{
        title: 'Criacao de videos'
      }}
      handleSubmit={(e) => {
        e.preventDefault()
        console.log(e.target)
      }}
    >
      <p>Pagina de criacao de video</p>
      <VideoCreationForm
        handleChange={handleFileChange}
        handleRemove={removeVideo}
      />
    </FormLayout>
  )
}
