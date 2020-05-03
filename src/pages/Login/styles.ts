import styled from 'styled-components'
import { shade } from 'polished'

import loginBackground from 'assets/login-background.png'

export const Container = styled.section`
  align-items: stretch;
  display: flex;

  height: 100vh;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;

  max-width: 660px;
  width: 100%;

  form {
    margin: 80px 0;
    width: 340px;

    align-self: center;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    input {
      background: #232129;
      border: 2px solid #232129;
      border-radius: 10px;
      color: #f4ede8;

      height: 56px;
      line-height: 56px;
      padding: 0 16px;
      width: 100%;

      &::placeholder {
        color: #666360;
      }

      & + input {
        margin-top: 8px;
      }
    }

    button {
      background: #ff9000;
      color: #312e38;
      border: 0;
      border-radius: 10px;
      font-weight: 500;

      height: 56px;
      line-height: 56px;
      margin-top: 24px;
      padding: 0 16px;
      width: 100%;

      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#ff9000')};
      }
    }

    a {
      color: #f4ede8;
      display: flex;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    align-self: center;
    color: #ff9000;
    display: flex;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }

    svg {
      margin-right: 18px;
    }
  }
`

export const HeroImage = styled.div`
  flex: 1;
  background: url(${loginBackground}) no-repeat center;
  background-size: cover;
`
