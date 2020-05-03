import React, { FC } from 'react'
import { Form } from '@unform/web'
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi'

import logo from 'assets/logo.svg'

import { Input, Button } from 'components'

import { Container, Wrapper, HeroImage } from './styles'

export const Signup: FC = () => {
  const handleSubmit = (data: object): void => {
    console.log(data)
  }

  return (
    <Container>
      <HeroImage />
      <Wrapper>
        <img src={logo} alt="GoBarber" />

        <Form onSubmit={handleSubmit}>
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
