import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import logo from 'assets/logo.svg'
import { Button, Input } from 'components'
import { useAuth } from 'hooks/auth'
import { useToast } from 'hooks/toast'
import { useCallback, useRef } from 'react'
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import { validateErrors } from 'utils/validateErrors'
import * as Yup from 'yup'

import * as S from './styles'

type SignInData = {
  email: string
  password: string
}

export const SignIn = () => {
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()

  const { signIn } = useAuth()
  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: SignInData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Insira um e-mail válido'),
          password: Yup.string().required('Senha é obrigatória'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await signIn({
          email: data.email,
          password: data.password,
        })

        history.push('/dashboard')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = validateErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação!',
          description: 'Ocorreu erro ao fazer login, verifique as credenciais.',
        })
      }
    },
    [signIn, addToast, history],
  )

  return (
    <S.Container>
      <S.Wrapper>
        <S.Animated>
          <img src={logo} alt="GoBarber" />

          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Faça seu login</h1>
            <Input
              name="email"
              icon={FiMail}
              type="email"
              placeholder="E-mail"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Entrar</Button>

            <Link to="/forgot-password">Esqueci minha senha</Link>
          </Form>

          <Link to="/signup">
            <FiLogIn size={24} />
            Criar conta
          </Link>
        </S.Animated>
      </S.Wrapper>
      <S.HeroImage />
    </S.Container>
  )
}
