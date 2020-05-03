import React, { FC, ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<Props> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
)
