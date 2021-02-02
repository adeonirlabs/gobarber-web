import { ToastMessage } from 'hooks/toast'
import { useTransition } from 'react-spring'

import * as S from './styles'
import { ToastWrapper } from './ToastWrapper'

interface Props {
  messages: ToastMessage[]
}

export const Toast = ({ messages }: Props) => {
  const animatedToast = useTransition(messages, (message) => message.id, {
    from: { right: '-110%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
  })

  return (
    <S.Container>
      {animatedToast.map(({ item, key, props }) => (
        <ToastWrapper key={key} toast={item} style={props} />
      ))}
    </S.Container>
  )
}
