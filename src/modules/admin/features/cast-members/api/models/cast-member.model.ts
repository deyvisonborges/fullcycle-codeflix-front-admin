export type CastMemberAPIModel = {
  id: string
  name: string
  type: number
  deleted_at: string
  created_at: string
  updated_at: string
}

export function castMemberAPIModelAdapter<T>(props: CastMemberAPIModel) {
  return {
    ...(props.id && { id: props.id }),
    ...(props.name && { name: props.name }),
    ...(props.type && { type: props.type }),
    ...(props.deleted_at && { deletedAt: props.deleted_at }),
    ...(props.created_at && { createdAt: props.created_at }),
    ...(props.updated_at && { updatedAt: props.updated_at })
  } as T
}
