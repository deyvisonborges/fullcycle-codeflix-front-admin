import { FormLayout } from '@/modules/admin/layout/form'
import { VideoCreationForm } from '../components/video-creation-form'
// import { useAppDispatch, useAppSelector } from '@/config/store'
// import { uploadActions, uploadQueries } from '../../uploads/store/upload-slice'
// import { useAppDispatch } from '@/config/store'
// import { uploadActions } from '../../uploads/store/upload-slice'
// import { ChangeEvent, FormEvent } from 'react'
import { ChangeEvent, useState } from 'react'
import { VideoID } from '../video-id.primitive'
import axios from 'axios'
import { VIDEOS_MOCK_ENDPOINT } from '../api/mocks/videos.mock-handler'
// import { VIDEOS_MOCK_ENDPOINT } from '../api/mocks/videos.mock-handler'
// import { useCreateVideoMutation } from '../api/videos.api'

export function VideoCreationPage() {
  // const dispatch = useAppDispatch()
  const [files, setFiles] = useState<
    {
      id: string // id do arquivo
      file: File
      progress: number
      status?: 'idle' | 'failed' | 'success' | 'loading' | 'pending'
    }[]
  >([])
  const [uploadProgress, setUploadProgress] = useState(0)
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
        setFiles((prev) => [
          ...prev,
          {
            file,
            id,
            status: 'idle',
            progress: 0
          }
        ])

        // dispatch(
        //   uploadActions.addUpload({
        //     id,
        //     videoId: id,
        //     file,
        //     previewURL: URL.createObjectURL(file),
        //     field: file.name
        //   })
        // )
      })
    }
  }

  const updateStatus = (
    fileId: string,
    status: 'idle' | 'failed' | 'success' | 'loading' | 'pending'
  ) => {
    const file = files.find((f) => f.id === fileId)
    file.status = status
    if (file) {
      setFiles((prev) => [...prev, file])
    }
  }

  const handleSubmit = async () => {
    setUploadProgress(0)
    files.forEach(async (fileObj) => {
      const formData = new FormData()
      formData.append('file', fileObj.file)

      try {
        updateStatus(fileObj.id, 'loading')
        await axios.post(VIDEOS_MOCK_ENDPOINT, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0
            setUploadProgress(progress)
            changeProgress(fileObj.id, progress)
          }
        })
        changeProgress(fileObj.id, 100)
        setUploadProgress(100)
        updateStatus(fileObj.id, 'success')
      } catch (error) {
        console.error(`Erro ao enviar o arquivo ${fileObj.file.name}`, error)
      }
    })
  }

  const changeProgress = (id: string, progress: number) => {
    const file = files.find((f) => f.id === id)
    if (file) {
      file.progress = progress
      setFiles((prev) => [...prev, file])
    }
  }

  const removeVideo = ({ id }: VideoID) => {
    const index = files.findIndex((f) => f.id === id)
    if (index !== 1) {
      const updatedFiles = files.splice(index, 1)
      setFiles(updatedFiles)
    }
    // dispatch(uploadActions.deleteUpload(id))
    // setVideos((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <FormLayout
      headerProps={{
        title: 'Criacao de videos'
      }}
      handleSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <p>Pagina de criacao de video</p>
      <VideoCreationForm
        handleChange={handleFileChange}
        handleRemove={removeVideo}
      />

      {files.map((f) => (
        <>
          <p>{f.file.name}</p>
          <span>{f.progress}</span>
          <span>{f.status}</span>
        </>
      ))}
      {uploadProgress}
    </FormLayout>
  )
}
