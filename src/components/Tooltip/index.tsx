import * as S from './styles'

interface Props {
  title: string
  children: React.ReactNode
  className?: string
}

export const Tooltip = ({ title, className, children }: Props) => (
  <S.Container className={className}>
    <span>{title}</span>
    {children}
  </S.Container>
)
