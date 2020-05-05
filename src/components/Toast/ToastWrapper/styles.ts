import { animated } from 'react-spring'
import styled, { css } from 'styled-components'

interface Props {
  type?: 'success' | 'error' | 'warning' | 'info'
  description: boolean
}

const toastType = {
  success: css`
    background-color: #00b48f;
    border-color: #00b48f;
    color: #00b48f;
  `,
  error: css`
    background-color: #ab3030;
    border-color: #ab3030;
    color: #ab3030;
  `,
  warning: css`
    background-color: #ff9000;
    border-color: #ff9000;
    color: #ff9000;
  `,
  info: css`
    background-color: #0092c9;
    border-color: #0092c9;
    color: #0092c9;
  `,
}

export const Container = styled(animated.div)<Props>`
  display: flex;

  border: 2px solid #28262e;
  ${({ type }) => toastType[type || 'info']};
  background-color: #28262e;
  color: #f4ede8;

  align-items: center;
  border-radius: 10px;
  display: flex;
  padding: 16px 32px 16px 16px;
  position: relative;
  width: 360px;

  &::after {
    border-radius: 3px;
    content: '';
    display: block;
    height: calc(100% - 20px);
    left: 10px;
    position: absolute;
    width: 6px;
    z-index: 10;
    ${({ type }) => toastType[type || 'info']};
  }

  & + div {
    margin-top: 8px;
  }

  > svg {
    ${({ type }) => toastType[type || 'info']};
    background-color: transparent;
    margin: 0 16px 0 8px;
  }

  div {
    flex: 1;
    align-items: center;

    p {
      color: #f4ede8;
      font-size: 13px;
      line-height: 16px;
      margin-top: 6px;
      opacity: 0.7;
    }
  }

  button {
    display: flex;

    background: transparent;
    border: 0;
    color: #666360;

    position: absolute;
    right: 8px;
    top: 8px;
  }
`
