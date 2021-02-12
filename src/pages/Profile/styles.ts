import * as InputStyles from 'components/Input/styles'
import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.section`
  height: 100vh;
`

export const HeaderWrapper = styled.header`
  height: 144px;
  background: #28262e;
  padding: 0 10px;
`

export const Header = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 100%;

  a {
    svg {
      color: #999591;
      width: 24px;
      height: 24px;
      transition: opacity 0.2s ease;

      :hover {
        opacity: 0.7;
      }
    }
  }
`

export const ContentWrapper = styled.div`
  padding: 0 10px;
`

export const Content = styled.div`
  display: flex;
  place-content: center;
  flex-direction: column;
  min-width: 400px;
  width: 100%;
  margin: 0 auto;

  form {
    margin-bottom: 80px;
    width: 340px;
    display: flex;
    flex-direction: column;
    align-self: center;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }

    ${InputStyles.Container}:nth-child(3n-1) {
      margin-top: 24px;
    }
  }

  > a {
    align-items: center;
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
`

export const Avatar = styled.div`
  position: relative;
  margin-top: -93px;
  margin-bottom: 32px;
  align-self: center;

  img {
    border-radius: 50%;
    width: 186px;
    height: 186px;
  }

  button {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 48px;
    height: 48px;
    border: 0;
    border-radius: 50%;
    background: #ff9000;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;

    svg {
      color: #312e38;
    }

    :hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`
