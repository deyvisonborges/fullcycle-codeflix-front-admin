import * as S from './cast-member-form.styles'
import { ReadonlyUIAttributes } from '@/modules/admin/utils/types'
import { CastMemberUIModel } from '../../cast-member.ui-model'
import { Input } from '@/components/input'

export type CastMemberFormFieldsProps = Omit<
  CastMemberUIModel,
  ReadonlyUIAttributes
>

type CastMemberFormProps = {
  isDisabled?: boolean
  data: CastMemberFormFieldsProps
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function CastMemberForm({
  data,
  handleChange,
  isDisabled
}: CastMemberFormProps) {
  return (
    <S.InputGroup>
      <Input
        id="name"
        type="text"
        name="name"
        placeholder="Nome do membro"
        value={data.name || ''}
        label="Nome"
        disabled={isDisabled}
        onChange={handleChange}
      />
      <Input
        id="type"
        type="text"
        name="type"
        placeholder="Tipo"
        value={data.type || ''}
        label="Tipo"
        disabled={isDisabled}
        onChange={handleChange}
      />
    </S.InputGroup>
  )
}
