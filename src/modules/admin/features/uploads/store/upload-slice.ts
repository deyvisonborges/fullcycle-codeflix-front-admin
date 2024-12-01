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
    },
    deleteUpload(state, action: PayloadAction<string>) {
      const index = state.findIndex((u) => u.id === action.payload)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }
  }
})

export const uploadActions = uploadSlice.actions
export const uploadReducer = uploadSlice.reducer
