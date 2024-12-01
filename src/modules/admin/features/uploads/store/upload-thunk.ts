import { createAsyncThunk } from '@reduxjs/toolkit'
import { uploadActions, UploadState } from './upload-slice'
import axios, { AxiosProgressEvent } from 'axios'

export const uploadVideo = createAsyncThunk(
  'uploads/uploadVideo',
  async ({ id, file, field }: UploadState, thunkAPI) => {
    const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
      const progress = uploadProgress(progressEvent)
      thunkAPI.dispatch(uploadActions.setProgress({ id, progress }))
    }

    try {
      return await uploadService({ file, field, onUploadProgress })
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const uploadProgress = (progress: AxiosProgressEvent) => {
  if (progress.total) {
    return Math.round((progress.loaded * 100) / progress.total)
  }
  return 0
}

const uploadService = async (params: {
  field: string
  file: File
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void
}) => {
  const formData = new FormData()
  formData.append(params.field, params.file)
  formData.append('_method', 'PATCH')
  return axios.post('/upload-endpoint', formData, {
    onUploadProgress: params.onUploadProgress
  })
}
