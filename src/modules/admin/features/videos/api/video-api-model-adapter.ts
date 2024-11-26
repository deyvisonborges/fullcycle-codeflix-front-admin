import { VideoAPIModel } from './video.api-model'

// export function videoAPIModelAdapter<T>(props: VideoAPIModel) {
//   return {
//     id: props.id,
//     title: props.title,
//     description: props.description,
//     yearLaunched: props.year_launched,
//     opened: props.opened,
//     rating: props.rating,
//     duration: props.duration,
//     createdAt: props.created_at,
//     updatedAt: props.updated_at,
//     deletedAt: props.deleted_at,
//     thumbFileUrl: props.thumb_file_url,
//     bannerFileUrl: props.banner_file_url,
//     trailerFileUrl: props.trailer_file_url,
//     videoFileUrl: props.video_file_url,
//     genres: props.genres.map((genre) => ({
//       id: genre.id,
//       name: genre.name,
//       isActive: genre.is_active,
//       deletedAt: genre.deleted_at,
//       createdAt: genre.created_at,
//       updatedAt: genre.updated_at,
//       pivot: {
//         videoId: genre.privot.video_id,
//         genreId: genre.privot.genre_id
//       }
//     })),
//     categories: props.categories.map((category) => ({
//       id: category.id,
//       name: category.name,
//       description: category.description,
//       isActive: category.is_active,
//       createdAt: category.created_at,
//       updatedAt: category.updated_at,
//       deletedAt: category.deleted_at
//     })),
//     castMembers: props.cast_members.map((castMember) => ({
//       id: castMember.id,
//       name: castMember.name,
//       type: castMember.type,
//       createdAt: castMember.created_at,
//       updatedAt: castMember.updated_at,
//       deletedAt: castMember.deleted_at
//     }))
//   } as T
// }
