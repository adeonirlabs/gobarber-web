import styled, { css } from 'styled-components'

interface Props {
  isFocused: boolean
  isFilled: boolean
}

export const Container = styled.div<Props>`
  align-items: center;
  display: flex;

  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  color: #666360;

  height: 56px;
  line-height: 56px;
  padding: 0 16px;
  width: 100%;

  & + div {
    margin-top: 8px;
  }

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-color: #ff9000;
      color: #ff9000;
    `}

  ${({ isFilled }) =>
    isFilled &&
    css`
      color: #ff9000;
    `}

  input {
    background: transparent;
    border: 0;
    color: #f4ede8;
    flex: 1;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`
