import { ButtonHTMLAttributes } from 'react'
import { ImSpinner9 as ImSpinner } from 'react-icons/im'

import * as S from './styles'

type Props = {
  children: React.ReactNode
  loading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ children, loading, ...rest }: Props) => (
  <S.Container type="button" {...rest}>
    {loading ? <ImSpinner size={24} /> : children}
  </S.Container>
)
