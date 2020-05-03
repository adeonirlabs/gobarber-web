import React, { FC } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'

import logo from 'assets/logo.svg'

import { Input, Button } from 'components'

import { Container, Wrapper, HeroImage } from './styles'

export const Login: FC = () => (
  <Container>
    <Wrapper>
      <img src={logo} alt="GoBarber" />

      <form>
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
      </form>

      <a href="/signup">
        <FiLogIn size={24} />
        Criar conta
      </a>
    </Wrapper>
    <HeroImage />
  </Container>
)
