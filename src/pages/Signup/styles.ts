import styled from 'styled-components'
import { shade } from 'polished'

import signupBackground from 'assets/signup-background.png'

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

    a {
      color: #f4ede8;
      display: inline-flex;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    align-items: center;
    align-self: center;
    color: #f4ede8;
    display: flex;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }

    svg {
      margin-right: 18px;
    }
  }
`

export const HeroImage = styled.div`
  flex: 1;
  background: url(${signupBackground}) no-repeat center;
  background-size: cover;
`
