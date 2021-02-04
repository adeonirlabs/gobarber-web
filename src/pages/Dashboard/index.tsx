import Logo from 'assets/logo.svg'
import { useAuth } from 'hooks/auth'
import { FiPower } from 'react-icons/fi'

import * as S from './styles'

export const Dashboard = () => {
  const { signOut, user } = useAuth()

  return (
    <S.Container>
      <S.Header>
        <S.HeaderContent>
          <img src={Logo} alt="GoBarber" />

          <S.Profile>
            <img src={user.avatar_url} alt={user.name} />

            <div>
              <span>Bem vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </S.Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </S.HeaderContent>
      </S.Header>
    </S.Container>
  )
}
