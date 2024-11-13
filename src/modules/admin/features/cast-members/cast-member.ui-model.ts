import { CamelCase } from '../../utils/types'
import { CastMemberAPIModel } from './api/models/cast-member.model'

export type CastMemberUIModel = CamelCase<CastMemberAPIModel>

export function convertToApiModel<T>(props: Partial<CastMemberUIModel>) {
  return {
    ...(props.id && { id: props.id }),
    ...(props.name && { name: props.name }),
    ...(props.type && { type: props.type }),
    ...(props.deletedAt && { deleted_at: props.deletedAt }),
    ...(props.createdAt && { created_at: props.createdAt }),
    ...(props.updatedAt && { updated_at: props.updatedAt })
  } as T
}
