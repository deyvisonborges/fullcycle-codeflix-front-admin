import { useCallback, useEffect, useState } from 'react'
import { useDeleteVideoMutation, useGetVideosQuery } from '../api/videos.api'
import { VideoUIModel } from '../video.ui-model'
import { videoUIModelAdapter } from '../video.ui-model-adapter'
import { HiPencil, HiTrash } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { VideoID } from '../video-id.primitive'
import { enqueueSnackbar } from 'notistack'

const routeInModuleRouter = '/dashboard/videos'

export function VideoListPage() {
  const navigate = useNavigate()

  const [
    deleteVideoMutation,
    { error: deleteError, isSuccess: deleteSuccess }
  ] = useDeleteVideoMutation()

  const { data, isError, isLoading, status } = useGetVideosQuery()
  const [videos, setVideos] = useState<VideoUIModel[]>([])

  useEffect(() => {
    if (data?.data) {
      setVideos(data.data.map((video) => videoUIModelAdapter(video)))
    }
  }, [data?.data])

  useEffect(() => {
    if (deleteError)
      enqueueSnackbar('Erro ao deletar video', { variant: 'error' })
    if (deleteSuccess)
      enqueueSnackbar('Video deletado com sucesso', { variant: 'success' })
  }, [deleteError, deleteSuccess])

  const handleDeleteVideo = useCallback(
    async ({ id }: VideoID) => {
      await deleteVideoMutation({ id })
    },
    [deleteVideoMutation]
  )

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

// import { ChangeEvent, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { Video } from "../video/video";
// import { uploadActions, uploadQueries } from "../../store/upload-slice";

// export function VideoCreationForm() {
//   const dispatch = useDispatch();
//   const uploads = useSelector(uploadQueries.selectUploads);

//   const inputRef = useRef<HTMLInputElement>(null);

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;

//     if (files) {
//       Array.from(files).forEach((file) => {
//         const id = crypto.randomUUID();
//         dispatch(
//           uploadActions.addUpload({
//             id,
//             videoId: id, // Pode ser modificado dependendo da lógica
//             field: "video",
//             file,
//           })
//         );
//       });
//     }
//   };

//   const handleUpload = async (upload: typeof uploads[number]) => {
//     const formData = new FormData();
//     formData.append(upload.field, upload.file);

//     try {
//       dispatch(uploadActions.setProgress({ id: upload.id, progress: 0 }));

//       await axios.post("/api/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         onUploadProgress: (progressEvent) => {
//           const progress = Math.round(
//             (progressEvent.loaded * 100) / (progressEvent.total || 1)
//           );
//           dispatch(uploadActions.setProgress({ id: upload.id, progress }));
//         },
//       });

//       // Atualiza o status para sucesso após o envio
//       dispatch(
//         uploadActions.addUpload({
//           ...upload,
//           status: "success",
//         })
//       );
//     } catch (error) {
//       console.error(`Erro ao enviar o vídeo ${upload.videoId}:`, error);
//       dispatch(
//         uploadActions.addUpload({
//           ...upload,
//           status: "failed",
//         })
//       );
//     }
//   };

//   const handleUploadAll = () => {
//     uploads.forEach((upload) => {
//       if (upload.status !== "loading" && upload.status !== "success") {
//         handleUpload(upload);
//       }
//     });
//   };

//   const handleChoose = () => {
//     inputRef.current?.click();
//   };

//   const removeVideo = (id: string) => {
//     dispatch(uploadActions.deleteUpload(id));
//   };

//   const handleClear = () => {
//     uploads.forEach((upload) => {
//       removeVideo(upload.id);
//     });
//   };

//   return (
//     <div className="VideoInput">
//       <input
//         ref={inputRef}
//         className="VideoInput_input"
//         type="file"
//         onChange={handleFileChange}
//         accept=".mov,.mp4"
//         multiple
//       />
//       <button onClick={handleChoose}>Escolher arquivos</button>
//       <button onClick={handleUploadAll} disabled={uploads.length === 0}>
//         Enviar todos
//       </button>

//       <div className="video-list">
//         <h3>Video Sources</h3>
//         {uploads.length > 0 && <p onClick={handleClear}>Remover vídeos</p>}

//         {uploads.map((upload) => (
//           <div key={upload.id} className="video-item">
//             <div className="video-footer">Vídeo {upload.videoId}</div>
//             <Video
//               source={URL.createObjectURL(upload.file)}
//               progress={upload.progress || 0}
//               onHandleRemove={() => removeVideo(upload.id)}
//             />
//             <span>Progresso: {upload.progress}%</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
