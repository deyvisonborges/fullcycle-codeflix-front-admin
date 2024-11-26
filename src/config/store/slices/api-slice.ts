import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseURL = 'http://localhost:4000'

export const apiSliceTags = {
  categories: 'Categories',
  castMembers: 'CastMembers',
  videos: 'Videos'
}

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: Object.values(apiSliceTags),
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: () => ({})
})
