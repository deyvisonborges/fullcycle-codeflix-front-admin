// Utilitário para converter uma chave `snake_case` para `camelCase`
type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S

// Utilitário para converter todas as chaves de um objeto para `camelCase`
export type CamelCase<T> = {
  [K in keyof T as SnakeToCamelCase<string & K>]: T[K]
}

export type ReadonlyUIAttributes =
  | 'id'
  | 'updatedAt'
  | 'createdAt'
  | 'deletedAt'

export type ReadonlyAttributes =
  | 'id'
  | 'created_at'
  | 'updated_at'
  | 'deleted_at'

export type ResponseData<T> = {
  data: T[]
  errors?: []
  meta?: null
}
