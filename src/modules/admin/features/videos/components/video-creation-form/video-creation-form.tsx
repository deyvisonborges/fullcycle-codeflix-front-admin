import { ChangeEvent, useRef } from 'react'
import { Video } from '../video/video'
import { useAppSelector } from '@/config/store'
import { uploadQueries } from '../../../uploads/store/upload-slice'
import { VideoID } from '../../video-id.primitive'

// type VideoFile = {
//   file: File
//   previewUrl: string
//   progress: number
// }

type VideoCreationFormProps = {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleRemove: (id: VideoID) => void
}

export function VideoCreationForm({
  handleChange,
  handleRemove
}: VideoCreationFormProps) {
  // const uploadList = useAppSelector(uploadQueries.selectUploads)

  // const dispatch = useAppDispatch()
  const uploads = useAppSelector(uploadQueries.selectUploads)

  // const [videos, setVideos] = useState<VideoFile[]>([])

  const inputRef = useRef<HTMLInputElement>(null)

  // const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)

  const handleChoose = () => {
    inputRef.current?.click()
  }

  const handleClear = () => {
    // uploadActions
    // setVideos([])
    // setSelectedFiles(null)
  }

  return (
    <div className="VideoInput">
      <input
        ref={inputRef}
        className="VideoInput_input"
        type="file"
        onChange={handleChange}
        accept=".mov,.mp4"
        multiple // Permite selecionar vários arquivos de uma vez
      />
      <button onClick={handleChoose}>Choose</button>

      <div className="video-list">
        <h3>Video Sources</h3>
        {uploads.length > 0 && <p onClick={handleClear}>Remover videos</p>}

        {uploads.map((video, index) => (
          <div key={index} className="video-item">
            <div className="video-footer">Video {index + 1}</div>
            <Video
              source={video.previewURL}
              progress={100}
              onHandleRemove={() => handleRemove({ id: video.id })}
            />
            <span>Enviar video {index}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
