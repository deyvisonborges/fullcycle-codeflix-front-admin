import * as S from './category-form-fields.styles'
import { Input } from '@/components/input'
import { CategoryUIModel } from '../../category.ui-model'

export type CategoryFormFieldsDataProps = Pick<
  CategoryUIModel,
  'name' | 'description' | 'isActive'
>

type CategoryFormFieldsProps = {
  isDisabled?: boolean
  data: CategoryFormFieldsDataProps
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void
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
        id="isActive"
        type="checkbox"
        name="isActive"
        checked={data.isActive ?? false}
        label="Ativo?"
        disabled={isDisabled}
        onChange={handleToggle}
      />
    </>
  )
}
