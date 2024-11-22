import { FormLayout } from '@/modules/admin/layout/form'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import {
  CastMemberForm,
  CastMemberFormFieldsProps
} from '../components/cast-member-form'
import { useCreateCastMemberMutation } from '../api/cast-member.service'
import { convertToApiModel } from '../cast-member.ui-model'

export function CreateCastMemberPage() {
  const [createCastMemberMutation, status] = useCreateCastMemberMutation()
  const [isdisabled, setIsdisabled] = useState(false)
  const [castMemberState, setCastMemberState] =
    useState<CastMemberFormFieldsProps>({
      name: '',
      type: 0
    })

  useEffect(() => {
    if (status.isError) {
      enqueueSnackbar('Erro ao criar membro', { variant: 'error' })
    }
  }, [status.error, status.isError])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsdisabled(true)
    e.preventDefault()
    await createCastMemberMutation(convertToApiModel(castMemberState))
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as never
    setCastMemberState({ ...castMemberState, [name]: value })
  }

  return (
    <FormLayout
      headerProps={{ title: 'Criar um membro do elenco' }}
      handleSubmit={handleSubmit}
    >
      <CastMemberForm
        data={castMemberState}
        isDisabled={isdisabled}
        handleChange={handleChange}
      />
      <Link to="/dashboard/cast-members">Voltar</Link>
    </FormLayout>
  )
}
