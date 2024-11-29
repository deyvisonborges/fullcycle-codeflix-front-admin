import { apiSlice, apiSliceTags } from '@/config/store/slices/api-slice'
import { ResponseData } from '@/modules/admin/utils/types'
import { VideoAPIModel } from './video.api-model'
import { VideoID } from '../video-id.primitive'
import { VIDEOS_ENDPOINT } from '../videos.routes'

type Results = ResponseData<VideoAPIModel[]>
type Result = ResponseData<VideoAPIModel>

type UpInsertVideoCommand = {
  id: string
  title: string
  description: string
  year_launched: number
  opened: boolean
  rating: string
  duration: number
}
type UpdateVideoCommand = { payload: UpInsertVideoCommand } & VideoID

export const videosApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getVideos: query<Results, void>({
      query: () => `${VIDEOS_ENDPOINT}`,
      providesTags: [apiSliceTags.videos]
    }),
    getVideo: query<Result, VideoID>({
      query: ({ id }) => ({
        url: `${VIDEOS_ENDPOINT}/${id}`,
        method: 'GET'
      }),
      providesTags: [apiSliceTags.videos]
    }),
    createVideo: mutation<void, UpInsertVideoCommand>({
      query: (data) => ({
        url: `${VIDEOS_ENDPOINT}`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: [apiSliceTags.videos]
    }),
    updateVideo: mutation<void, UpdateVideoCommand>({
      query: ({ id, payload }) => ({
        url: `${VIDEOS_ENDPOINT}/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: [apiSliceTags.videos]
    }),
    deleteVideo: mutation<void, VideoID>({
      query: ({ id }) => ({
        url: `${VIDEOS_ENDPOINT}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [apiSliceTags.videos]
    })
  })
})

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useCreateVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation
} = videosApiSlice
