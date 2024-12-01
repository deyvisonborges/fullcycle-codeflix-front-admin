import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UploadState = {
  id: string
  videoId: string
  field: string
  file: File
  progress?: number
  status?: 'idle' | 'failed' | 'success' | 'loading' | 'pending'
}

const initalState: UploadState[] = []

export const uploadSlice = createSlice({
  name: 'uploads',
  initialState: initalState,
  reducers: {
    addUpload(state, action: PayloadAction<UploadState>) {
      state.push({
        ...action.payload,
        status: 'idle',
        progress: 0
      })
    }
  }
})

export const uploadActions = uploadSlice.actions
export const uploadReducer = uploadSlice.reducer
