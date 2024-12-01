import { createAsyncThunk } from '@reduxjs/toolkit'
import { uploadActions, UploadState } from './upload-slice'

export const uploadVideo = createAsyncThunk(
  'uploads/uploadVideo',
  async ({ videoId, id, file, field }: UploadState, thunkAPI) => {
    const onUploadProgress = (progressEvent: ProgressEvent) => {
      thunkAPI.dispatch(uploadActions.setProgress({ id, progress: 0 }))
    }

    try {
      return await uploadService(params)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
