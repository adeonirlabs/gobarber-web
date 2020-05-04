import React, { FC, useCallback, useRef } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'

import { getValidationErrors } from 'utils/getValidationErrors'

import logo from 'assets/logo.svg'
import { Input, Button } from 'components'
import { Container, Wrapper, HeroImage } from './styles'

export const Login: FC = () => {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(async (data: object) => {
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
    } catch (err) {
      console.log(err)
      const errors = getValidationErrors(err)

      formRef.current?.setErrors(errors)
    }
  }, [])

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
