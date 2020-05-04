import React, { FC } from 'react'

import { Container } from './styles'

interface Props {
  title: string
  className?: string
}

export const Tooltip: FC<Props> = ({ title, className, children }) => (
  <Container className={className}>
    <span>{title}</span>
    {children}
  </Container>
)
