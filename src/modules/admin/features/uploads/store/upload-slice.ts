import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { uploadVideo } from './upload-thunk'
import { RootState } from '@/config/store'

export type UploadState = {
  id: string
  videoId: string
  field: string
  file: File
  previewURL: string
  progress?: number
  status?: 'idle' | 'failed' | 'success' | 'loading' | 'pending'
}

type UploadProgress = {
  id: string
  progress: number
}

const initialState: UploadState[] = []

export const uploadSlice = createSlice({
  name: 'uploads',
  initialState,
  reducers: {
    addUpload(state, action: PayloadAction<UploadState>) {
      state.push({
        ...action.payload,
        status: 'idle',
        progress: 0
      })
    },
    deleteUpload(state, action: PayloadAction<string>) {
      return state.filter((u) => u.id !== action.payload)
    },
    setProgress(state, action: PayloadAction<UploadProgress>) {
      const { id, progress } = action.payload
      const upload = state.find((upload) => upload.id === id)

      if (upload) {
        upload.progress = progress
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(uploadVideo.pending, (state, action) => {
      const upload = state.find((upload) => upload.id === action.meta.arg.id)
      if (upload) upload.status = 'loading'
    })
    builder.addCase(uploadVideo.fulfilled, (state, action) => {
      const upload = state.find((upload) => upload.id === action.meta.arg.id)
      if (upload) upload.status = 'success'
    })
    builder.addCase(uploadVideo.rejected, (state, action) => {
      const upload = state.find((upload) => upload.id === action.meta.arg.id)
      if (upload) upload.status = 'failed'
    })
  }
})

export const uploadQueries = {
  selectUploads: (state: RootState) => state.uploadSlice
}
export const uploadActions = uploadSlice.actions
export const uploadReducer = uploadSlice.reducer
