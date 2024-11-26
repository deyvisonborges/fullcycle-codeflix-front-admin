import { useCallback, useEffect, useState } from 'react'
import { useGetVideosQuery } from '../api/videos.api'
import { VideoUIModel } from '../video.ui-model'
import { videoUIModelAdapter } from '../video.ui-model-adapter'
import { HiPencil, HiTrash } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { VideoID } from '../video-id.primitive'

const routeInModuleRouter = '/dashboard/videos'

export function VideoListPage() {
  const navigate = useNavigate()

  const { data, isError, isLoading, status } = useGetVideosQuery()
  const [videos, setVideos] = useState<VideoUIModel[]>([])

  useEffect(() => {
    if (data?.data) {
      setVideos(data.data.map((video) => videoUIModelAdapter(video)))
    }
  }, [data?.data])

  const handleDeleteVideo = useCallback(async (videoId: VideoID) => {
    console.log('deleted', videoId)
  }, [])

  const handleEditVideo = useCallback(
    async (videoId: VideoID) => {
      navigate(`${routeInModuleRouter}/edit/${videoId}`)
    },
    [navigate]
  )

  if (isError || status.includes('reject')) return <p>Erro ao listar videos</p>
  if (isLoading) return <p>Carregando...</p>
  if (!data) return <p>Sem dados.</p>

  return (
    <>
      <h2> Página de vídeos</h2>

      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>ID</th>
            <th>Year Launched</th>
            <th>Others...</th>
          </tr>
        </thead>

        <tbody>
          {videos.map((video) => (
            <tr key={video.id}>
              <td>{video.id}</td>
              <td>{video.title}</td>
              <td>{video.description}</td>
              <td>{video.yearLaunched ? 'Ativo' : 'Inativo'}</td>
              <td>{video.rating}</td>
              <td>{video.duration} min</td>
              <td>
                <HiPencil onClick={() => handleEditVideo({ id: video.id })} />
                &nbsp;
                <HiTrash
                  data-testid="trash-icon"
                  onClick={() =>
                    handleDeleteVideo({
                      id: video.id
                    })
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
