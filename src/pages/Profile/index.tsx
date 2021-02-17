import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { Button, Input } from 'components'
import { useAuth } from 'hooks/auth'
import { useToast } from 'hooks/toast'
import { ChangeEvent, useCallback, useRef } from 'react'
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import { api } from 'services'
import { validateErrors } from 'utils/validateErrors'
import * as Yup from 'yup'

import * as S from './styles'

type ProfileData = {
  name: string
  email: string
  old_password: string
  password: string
  password_confirmation: string
}

export const Profile = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const history = useHistory()

  const { user, updateUser } = useAuth()

  const handleSubmit = useCallback(
    async (data: ProfileData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val: any) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val: any) => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password')], 'Confirmação incorreta'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        }

        const response = await api.put('/profile', formData)

        updateUser(response.data)

        history.push('/dashboard')

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description:
            'As informações do seu perfil foram atualizadas com sucesso!',
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = validateErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização!',
          description: 'Ocorreu um erro ao atualizar perfil, tente novamente.',
        })
      }
    },
    [addToast, history],
  )

  const handleChangeAvatar = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData()
        data.append('avatar', e.target.files[0])

        api.patch('users/avatar', data).then((response) => {
          updateUser(response.data)

          addToast({
            type: 'success',
            title: 'Avatar atualizado com sucesso!',
          })
        })
      }
    },
    [addToast, updateUser],
  )

  return (
    <S.Container>
      <S.HeaderWrapper>
        <S.Header>
          <Link to="/dashboard">
            <FiArrowLeft size={24} />
          </Link>
        </S.Header>
      </S.HeaderWrapper>

      <S.ContentWrapper>
        <S.Content>
          <Form
            onSubmit={handleSubmit}
            ref={formRef}
            initialData={{
              name: user.name,
              email: user.email,
            }}
          >
            <S.Avatar>
              <img src={user.avatar_url} alt={user.name} />
              <label htmlFor="avatar">
                <FiCamera size={20} />
                <input type="file" id="avatar" onChange={handleChangeAvatar} />
              </label>
            </S.Avatar>

            <h1>Meu perfil</h1>
            <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
            <Input
              name="email"
              icon={FiMail}
              type="email"
              placeholder="E-mail"
            />
            <Input
              name="old_password"
              icon={FiLock}
              type="password"
              placeholder="Senha atual"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmação de senha"
            />

            <Button type="submit">Confirmar mudanças</Button>
          </Form>
        </S.Content>
      </S.ContentWrapper>
    </S.Container>
  )
}
