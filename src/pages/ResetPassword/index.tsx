import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import logo from 'assets/logo.svg'
import { Button, Input } from 'components'
import { useToast } from 'hooks/toast'
import { useCallback, useRef } from 'react'
import { FiLock } from 'react-icons/fi'
import { useHistory, useLocation } from 'react-router-dom'
import { api } from 'services'
import { validateErrors } from 'utils/validateErrors'
import * as Yup from 'yup'

import * as S from './styles'

type ResetPasswordData = {
  password: string
  password_confirmation: string
}

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export const ResetPassword = () => {
  const formRef = useRef<FormHandles>(null)

  const history = useHistory()
  const query = useQuery()

  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: ResetPasswordData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha é obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Senha não confere',
          ),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        const { password, password_confirmation } = data
        const token = query.get('token')

        if (!token) {
          throw new Error()
        }

        await api.post('password/reset', {
          password,
          password_confirmation,
          token,
        })

        history.push('/')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = validateErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar a senha!',
          description: 'Ocorreu um erro ao resetar sua senha. Tente novamente.',
        })
      }
    },
    [addToast, history, query],
  )

  return (
    <S.Container>
      <S.Wrapper>
        <S.Animated>
          <img src={logo} alt="GoBarber" />

          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Resetar senha</h1>
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
              placeholder="Confirmação da senha"
            />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </S.Animated>
      </S.Wrapper>
      <S.HeroImage />
    </S.Container>
  )
}
