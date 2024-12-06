import { RootState } from '@/config/store'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  token: '',
  userDetails: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload
    },
    setLoading(state, action) {
      state.isLoading = action.payload
    },
    setToken(state, action) {
      state.token = action.payload
    }
  }
})

export const authSliceActions = authSlice.actions
export const authSliceQueries = {
  selectIsAuthenticated: ({ authSlice }: RootState) =>
    authSlice.isAuthenticated,
  selectIsLoading: ({ authSlice }: RootState) => authSlice.isAuthenticated
}
