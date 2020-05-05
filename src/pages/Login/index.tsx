import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import logo from 'assets/logo.svg'
import { Button, Input } from 'components'
import { useAuth } from 'hooks/auth'
import { useToast } from 'hooks/toast'
import React, { FC, useCallback, useRef } from 'react'
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi'
import { validateErrors } from 'utils/validateErrors'
import * as Yup from 'yup'

import { Container, HeroImage, Wrapper } from './styles'

interface LoginCredentials {
  email: string
  password: string
}

export const Login: FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { login } = useAuth()
  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: LoginCredentials) => {
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

        await login({
          email: data.email,
          password: data.password,
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = validateErrors(err)

          formRef.current?.setErrors(errors)
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação!',
          description: 'Ocorreu erro ao fazer login, verifique as credenciais.',
        })
      }
    },
    [login, addToast],
  )

  return (
    <Container>
      <Wrapper>
        <img src={logo} alt="GoBarber" />

        <Form onSubmit={handleSubmit} ref={formRef}>
          <h1>Faça seu login</h1>
          <Input name="email" icon={FiMail} type="email" placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>

          <a href="/forgot">Esqueci minha senha</a>
        </Form>

        <a href="/signup">
          <FiLogIn size={24} />
          Criar conta
        </a>
      </Wrapper>
      <HeroImage />
    </Container>
  )
}
