import { CastMemberAPIModel } from '../../cast-members/api/models/cast-member.model'
import { CategoryAPIModel } from '../../categories/api/models/category.model'

export type VideoAPIModel = {
  id: string
  title: string
  description: string
  year_launched: number
  opened: boolean
  rating: string
  duration: number
  deleted_at: string
  created_at: string
  updated_at: string
  genres: {
    id: string
    name: string
    is_active: boolean
    deleted_at: string
    created_at: string
    updated_at: string
    privot: {
      video_id: string
      genre_id: string
    }
  }[]
  categories: CategoryAPIModel[]
  cast_members: CastMemberAPIModel[]
  thumb_file_url: string
  banner_file_url: string
  trailer_file_url: string
  video_file_url: string
}

// export function videoAPIModelAdapter<T>(props: VideoAPIModel) {
//   return {
//     ...(props.id && { id: props.id }),
//     ...(props.name && { name: props.name }),
//     ...(props.type && { type: props.type }),
//     ...(props.deleted_at && { deletedAt: props.deleted_at }),
//     ...(props.created_at && { createdAt: props.created_at }),
//     ...(props.updated_at && { updatedAt: props.updated_at })
//   } as T
// }
