import { ChangeEvent, useRef, useState } from 'react'
import { Video } from '../video/video'
import { useAppDispatch, useAppSelector } from '@/config/store'
import {
  uploadActions,
  uploadQueries
} from '../../../uploads/store/upload-slice'

type VideoFile = {
  file: File
  previewUrl: string
  progress: number
}

export function VideoCreationForm() {
  // const uploadList = useAppSelector(uploadQueries.selectUploads)

  const dispatch = useAppDispatch()
  const uploads = useAppSelector(uploadQueries.selectUploads)

  console.log(uploads)

  const [videos, setVideos] = useState<VideoFile[]>([])

  const inputRef = useRef<HTMLInputElement>(null)

  // const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)

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

  const handleChoose = () => {
    inputRef.current?.click()
  }

  const removeVideo = (index: number) => {
    setVideos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleClear = () => {
    setVideos([])
    // setSelectedFiles(null)
  }

  return (
    <div className="VideoInput">
      <input
        ref={inputRef}
        className="VideoInput_input"
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4"
        multiple // Permite selecionar vários arquivos de uma vez
      />
      <button onClick={handleChoose}>Choose</button>

      <div className="video-list">
        <h3>Video Sources</h3>
        {videos.length > 0 && <p onClick={handleClear}>Remover videos</p>}

        {uploads.map((video, index) => (
          <div key={index} className="video-item">
            <div className="video-footer">Video {index + 1}</div>
            <Video
              source={video.previewURL}
              progress={100}
              onHandleRemove={() =>
                dispatch(uploadActions.deleteUpload(video.videoId))
              }
            />
            <span>Enviar video {index}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
