import { FormLayout } from '@/modules/admin/layout/form'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import {
  CastMemberForm,
  CastMemberFormFieldsProps
} from '../components/cast-member-form'
import { useCreateCastMemberMutation } from '../api/cast-member.service'
import { convertToApiModel } from '../cast-member.ui-model'

export function CreateCastMemberPage() {
  const [createCastMemberMutation] = useCreateCastMemberMutation()
  const [isdisabled, setIsdisabled] = useState(false)
  const [castMemberState, setCastMemberState] =
    useState<CastMemberFormFieldsProps>({
      name: '',
      type: 0
    })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsdisabled(true)
    e.preventDefault()
    await createCastMemberMutation(convertToApiModel(castMemberState))
    enqueueSnackbar('Adicionado com sucesso', { variant: 'success' })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as never
    setCastMemberState({ ...castMemberState, [name]: value })
  }

  return (
    <FormLayout
      headerProps={{ title: 'Criar uma nova categoria' }}
      handleSubmit={handleSubmit}
    >
      <CastMemberForm
        data={castMemberState}
        isDisabled={isdisabled}
        handleChange={handleChange}
      />
      <Link to="/dashboard/categories">Voltar</Link>
    </FormLayout>
  )
}
