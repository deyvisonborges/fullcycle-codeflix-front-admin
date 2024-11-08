import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseURL = 'http://localhost:4000'

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Categories'],
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: () => ({})
})
