export type CategoryAPIModel = {
  id: string
  name: string
  deleted_at: string
  is_active: boolean
  created_at: string
  updated_at: string
  description: null | string
}

export function categoryAPIModelAdapter<T>(props: CategoryAPIModel) {
  return {
    ...(props.id && { id: props.id }),
    ...(props.name && { name: props.name }),
    ...(props.deleted_at && { deletedAt: props.deleted_at }),
    ...(props.is_active && { isActive: props.is_active }),
    ...(props.created_at && { createdAt: props.created_at }),
    ...(props.updated_at && { updatedAt: props.updated_at }),
    ...(props.description !== undefined && { description: props.description })
  } as T
}
