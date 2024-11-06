import * as S from './category-form-fields.styles'
import { Input } from '@/components/input'
import { CategoryUIModel } from '../../category.ui-model'

type CategoryFormFieldsDataProps = Omit<
  CategoryUIModel,
  'id ' | 'deletedAt' | 'createdAt' | 'updatedAt'
>

type CategoryFormFieldsProps = {
  data: CategoryFormFieldsDataProps
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function CategoryFormFields({
  data,
  handleChange
}: CategoryFormFieldsProps) {
  return (
    <>
      <S.InputGroup>
        <Input
          id="name"
          type="text"
          name="name"
          placeholder="Nome da categoria"
          value={data.name || ''}
          onChange={handleChange}
        />
        <Input
          id="description"
          type="text"
          name="description"
          placeholder="Descrição"
          value={data.description || ''}
          onChange={handleChange}
        />
      </S.InputGroup>

      <Input
        id="is_active"
        type="checkbox"
        name="is_active"
        defaultChecked={data.isActive ?? false}
      />
    </>
  )
}
