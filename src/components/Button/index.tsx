import { ButtonHTMLAttributes } from 'react'

import * as S from './styles'

type Props = {
  children: React.ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ children, ...rest }: Props) => (
  <S.Container type="button" {...rest}>
    {children}
  </S.Container>
)
