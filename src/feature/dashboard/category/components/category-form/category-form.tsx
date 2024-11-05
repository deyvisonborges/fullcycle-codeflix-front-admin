import { Input } from '@/components/input'
import { CamelCase, CategoryModel } from '@/integrations/categories'
import { FormEvent, useState } from 'react'

type CategoryFormDataProps = Partial<CamelCase<CategoryModel>>

type CategoryFormProps = {
  // Essa data, geralmente representa os atributos do modelo da API
  // Para nao misturar, modelo de api, com modelo de dados a nivel de componente, eu
  // Extendo os atributos do modelo de api, e converto para o modelo que o componente aceita.
  // Posso incluir Pick e Omit para omitir ou exigir somente as propriedades que eu precisar.
  // O componente fica mais enxuto, e evita que o componente tenha uma dependencia direta com o modelo
  // de dados que vem da API.
  data: CategoryFormDataProps
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export function CategoryForm({ data, handleSubmit }: CategoryFormProps) {
  const [category, setCategory] = useState<CategoryFormDataProps>(data)

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="name"
        id="name"
        placeholder="Nome da categoria"
        {...(category.name && { value: category.name })}
      />
    </form>
  )
}
