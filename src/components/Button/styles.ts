import { shade } from 'polished'
import styled, { css, keyframes } from 'styled-components'

import { Props } from '.'

const spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`

export const Container = styled.button<Pick<Props, 'loading'>>`
  background: #ff9000;
  color: #312e38;
  border: 0;
  border-radius: 10px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;

  height: 56px;
  line-height: 56px;
  margin-top: 24px;
  padding: 0 16px;
  width: 100%;

  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }

  ${({ loading }) =>
    loading &&
    css`
      svg {
        animation: ${spinner} 1s infinite linear;
      }
    `}
`
