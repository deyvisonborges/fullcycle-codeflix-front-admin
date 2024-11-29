import { ChangeEvent, useRef, useState } from 'react'
import { Video } from '../video/video'

type VideoFile = {
  file: File
  previewUrl: string
  progress: number
}

export function VideoCreationForm() {
  const [videos, setVideos] = useState<VideoFile[]>([])

  const inputRef = useRef<HTMLInputElement>(null)

  // const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files) {
      const newVideos = Array.from(files).map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
        progress: 0
      }))

      setVideos((prev) => [...prev, ...newVideos])
      simulateProgress(newVideos)
    }
  }

  const simulateProgress = (videos: VideoFile[]) => {
    videos.forEach((_, index) => {
      const inverval = setInterval(() => {
        setVideos((prev) => {
          const updated = [...prev]
          const currentProgress = updated[index].progress

          if (currentProgress < 100) {
            updated[index].progress = currentProgress + 10
          } else {
            clearInterval(inverval)
          }

          return updated
        })
      }, 500)
    })
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

        {videos.map((video, index) => (
          <div key={index} className="video-item">
            <div className="video-footer">Video {index + 1}</div>
            <Video
              source={video.previewUrl}
              progress={100}
              onHandleRemove={() => removeVideo(index)}
            />
            <span>Enviar video {index}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
