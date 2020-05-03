import React, { FC } from 'react'
import { FiLogIn } from 'react-icons/fi'

import logo from 'assets/logo.svg'

import { Container, Wrapper, HeroImage } from './styles'

export const Login: FC = () => (
  <Container>
    <Wrapper>
      <img src={logo} alt="GoBarber" />

      <form>
        <h1>Faça seu login</h1>
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />

        <button type="submit">Entrar</button>

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
