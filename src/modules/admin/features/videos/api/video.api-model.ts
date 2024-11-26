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

// type AdapterConfig = Record<string, string | ((value: any) => any)>

// export function createAdapter<T>(data: T, config: AdapterConfig): T {
//   return Object.keys(config).reduce((acc, key) => {
//     const transform = config[key]
//     if (typeof transform === 'function') {
//       acc[key] = transform(data[key])
//     } else if (data[transform]) {
//       acc[key] = data[transform]
//     }
//     return acc
//   }, {} as T)
// }
