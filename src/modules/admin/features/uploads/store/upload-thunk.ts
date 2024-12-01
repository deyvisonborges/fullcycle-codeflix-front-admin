/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { uploadActions, UploadState } from './upload-slice'
import axios, { AxiosProgressEvent } from 'axios'
import { VIDEOS_MOCK_ENDPOINT } from '../../videos/api/mocks/videos.mock-handler'

export const uploadVideo = createAsyncThunk(
  'uploads/uploadVideo',
  async ({ videoId, id, file, field }: UploadState, thunkAPI) => {
    const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
      const progress = uplodProgress(progressEvent)
      thunkAPI.dispatch(uploadActions.setProgress({ id, progress }))
    }

    try {
      return await uploadService({ videoId, id, file, field, onUploadProgress })
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const uplodProgress = (progress: AxiosProgressEvent) => {
  if (progress.total) {
    const _progress = (progress.loaded * 100) / progress.total
    return Math.round(_progress * 100) / 100
  }
  return 0
}

const formData = (field: string, file: File) => {
  const data = new FormData()
  data.append(field, file)
  data.append('_method', 'PATCH')
  data.append('Content-Type', 'multipart/form-data')
  return data
}

const uploadService = async (params: any) => {
  axios.post(VIDEOS_MOCK_ENDPOINT, formData(params.field, params.file))
}
