// Utilitário para converter uma chave `snake_case` para `camelCase`
type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S

// Utilitário para converter todas as chaves de um objeto para `camelCase`
export type CamelCase<T> = {
  [K in keyof T as SnakeToCamelCase<string & K>]: T[K]
}

export type CategoryModel = {
  id: string
  name: string
  deleted_at: string
  is_active: boolean
  created_at: string
  updated_at: string
  description: null | string
}

export function categoryModelAdapter<T>(props: CategoryModel) {
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
