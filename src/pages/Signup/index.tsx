import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import logo from 'assets/logo.svg'
import { Button, Input } from 'components'
import React, { FC, useCallback, useRef } from 'react'
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi'
import { validateErrors } from 'utils/validateErrors'
import * as Yup from 'yup'

import { Container, HeroImage, Wrapper } from './styles'

export const Signup: FC = () => {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string()
          .required('E-mail é obrigatório')
          .email('Insira um e-mail válido'),
        password: Yup.string().min(6, 'Mínimo de 6 dígitos'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = validateErrors(err)

        formRef.current?.setErrors(errors)
      }

      // Toast
    }
  }, [])

  return (
    <Container>
      <HeroImage />
      <Wrapper>
        <img src={logo} alt="GoBarber" />

        <Form onSubmit={handleSubmit} ref={formRef}>
          <h1>Faça seu cadastro</h1>
          <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
          <Input name="email" icon={FiMail} type="email" placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="/signup">
          <FiArrowLeft size={24} />
          Voltar para login
        </a>
      </Wrapper>
    </Container>
  )
}
