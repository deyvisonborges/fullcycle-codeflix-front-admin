import { apiSlice } from '@/config/store/slices/api-slice'
import { ReadonlyAttributes, ResponseData } from '@/modules/admin/utils/types'
import { CastMemberAPIModel } from './models/cast-member.model'

const endpoint = '/cast-members'

type CastMemberID = { id: string }
type Result = ResponseData<CastMemberAPIModel>
type UpInsertCastMemberCommand = Partial<
  Omit<CastMemberAPIModel, ReadonlyAttributes>
>
type UpdateCastMemberCommand = {
  payload: UpInsertCastMemberCommand
} & CastMemberID

export const castMembersApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCastMembers: query<Result, void>({
      query: () => `${endpoint}`,
      providesTags: ['CastMembers']
    }),
    getCastMember: query<Result, CastMemberID>({
      query: ({ id }) => ({
        url: `${endpoint}/${id}`,
        method: 'GET'
      }),
      providesTags: ['CastMembers']
    }),
    createCastMember: mutation<void, UpInsertCastMemberCommand>({
      query: (data) => ({
        url: `${endpoint}`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['CastMembers']
    }),
    updateCastMember: mutation<void, UpdateCastMemberCommand>({
      query: ({ id, payload }) => ({
        url: `${endpoint}/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: ['CastMembers']
    }),
    deleteCastMember: mutation<void, CastMemberID>({
      query: ({ id }) => ({
        url: `${endpoint}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['CastMembers']
    })
  })
})

export const {
  useGetCastMembersQuery,
  useGetCastMemberQuery,
  useCreateCastMemberMutation,
  useUpdateCastMemberMutation,
  useDeleteCastMemberMutation
} = castMembersApiSlice
