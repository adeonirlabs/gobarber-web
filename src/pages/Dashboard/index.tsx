import Logo from 'assets/logo.svg'
import { useAuth } from 'hooks/auth'
import { FiClock, FiPower } from 'react-icons/fi'

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

      <S.Content>
        <S.Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <S.NextAppoitment>
            <h3>Atendimento a seguir</h3>
            <div>
              <img
                src="https://avatars.githubusercontent.com/u/3428733?s=460&u=bae1120b3b70eb367daed0a8cde1889482f0c7ab&v=4"
                alt="Adeonir"
              />

              <strong>Adeonir Kohl</strong>
              <span>
                <FiClock size={24} />
                08:00
              </span>
            </div>
          </S.NextAppoitment>
        </S.Schedule>
        <S.Calendar />
      </S.Content>
    </S.Container>
  )
}
