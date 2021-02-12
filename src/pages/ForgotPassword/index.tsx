import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import logo from 'assets/logo.svg'
import { Button, Input } from 'components'
import { useToast } from 'hooks/toast'
import { useCallback, useRef, useState } from 'react'
import { FiArrowLeft, FiMail } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { api } from 'services'
import { validateErrors } from 'utils/validateErrors'
import * as Yup from 'yup'

import * as S from './styles'

type ForgotPasswordData = {
  email: string
}

export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: ForgotPasswordData) => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Insira um e-mail válido'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await api.post('password/forgot', {
          email: data.email,
        })

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado!',
          description: 'Enviamos um email com link para recuperar de senha.',
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = validateErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha!',
          description:
            'Ocorreu erro ao recuperar a senha, verifique seu email.',
        })
      } finally {
        setLoading(false)
      }
    },
    [addToast],
  )

  return (
    <S.Container>
      <S.Wrapper>
        <S.Animated>
          <img src={logo} alt="GoBarber" />

          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Esqueci minha senha</h1>
            <Input
              name="email"
              icon={FiMail}
              type="email"
              placeholder="E-mail"
            />

            <Button type="submit" loading={loading}>
              Recuperar
            </Button>
          </Form>

          <Link to="/">
            <FiArrowLeft size={24} />
            Voltar ao login
          </Link>
        </S.Animated>
      </S.Wrapper>
      <S.HeroImage />
    </S.Container>
  )
}
