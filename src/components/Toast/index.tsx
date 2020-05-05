import { ToastMessage } from 'hooks/toast'
import React, { FC } from 'react'

import { Container } from './styles'
import { ToastWrapper } from './ToastWrapper'

interface Props {
  messages: ToastMessage[]
}

export const Toast: FC<Props> = ({ messages }) => {
  return (
    <Container>
      {messages.map((message) => (
        <ToastWrapper key={message.id} toast={message} />
      ))}
    </Container>
  )
}
