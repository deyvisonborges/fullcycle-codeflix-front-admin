import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ToastState {
  isVisible: boolean
  message?: string
}

const initialState: ToastState = {
  isVisible: false,
  message: undefined
}

const toastSlice = createSlice({
  name: 'Toast',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<string>) => {
      state.isVisible = true
      state.message = action.payload
    },
    hideToast: (state) => {
      state.isVisible = false
      state.message = ''
    }
  }
})

export const { actions: toastActions } = toastSlice
export default toastSlice.reducer
