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
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void
  isDisabled?: boolean
}

export function CategoryFormFields({
  isDisabled,
  data,
  handleChange,
  handleToggle
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
          label="Nome"
          disabled={isDisabled}
          onChange={handleChange}
        />
        <Input
          id="description"
          type="text"
          name="description"
          placeholder="Descrição"
          value={data.description || ''}
          label="Descrição"
          disabled={isDisabled}
          onChange={handleChange}
        />
      </S.InputGroup>

      <Input
        id="is_active"
        type="checkbox"
        name="is_active"
        defaultChecked={data.isActive ?? false}
        label="Ativo?"
        disabled={isDisabled}
        onChange={handleToggle}
      />
    </>
  )
}
