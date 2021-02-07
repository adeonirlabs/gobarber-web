import 'react-day-picker/lib/style.css'

import Logo from 'assets/logo.svg'
import { useAuth } from 'hooks/auth'
import { useCallback, useEffect, useMemo, useState } from 'react'
import DayPicker, { DayModifiers } from 'react-day-picker'
import { FiClock, FiPower } from 'react-icons/fi'
import { api } from 'services'

import * as S from './styles'

type CalendarModifiers = {
  available?: boolean
} & DayModifiers

type MonthAvailabilityProps = {
  day: number
  available: boolean
}

export const Dashboard = () => {
  const { signOut, user } = useAuth()

  const [selectedDay, setSelectedDay] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityProps[]
  >([])

  const handleChangeDay = useCallback(
    (day: Date, modifiers: CalendarModifiers) => {
      if (modifiers.available) {
        setSelectedDay(day)
      }
    },
    [],
  )

  const handleChangeMonth = useCallback((month: Date) => {
    setCurrentMonth(month)
  }, [])

  const disabledDays = useMemo(() => {
    const days = monthAvailability
      .filter((day) => day.available === false)
      .map((day) => {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()

        return new Date(year, month, day.day)
      })

    return days
  }, [currentMonth, monthAvailability])

  useEffect(() => {
    api
      .get(`providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => {
        setMonthAvailability(response.data)
      })
  }, [currentMonth, user])

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

          <S.ComingSection>
            <h3>Manhã</h3>

            <S.Appointment>
              <span>
                <FiClock size={20} />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/3428733?s=460&u=bae1120b3b70eb367daed0a8cde1889482f0c7ab&v=4"
                  alt="Adeonir"
                />
                <strong>Adeonir Kohl</strong>
              </div>
            </S.Appointment>

            <S.Appointment>
              <span>
                <FiClock size={20} />
                09:00
              </span>

              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/3428733?s=460&u=bae1120b3b70eb367daed0a8cde1889482f0c7ab&v=4"
                  alt="Adeonir"
                />
                <strong>Adeonir Kohl</strong>
              </div>
            </S.Appointment>
          </S.ComingSection>

          <S.ComingSection>
            <h3>Tarde</h3>

            <S.Appointment>
              <span>
                <FiClock size={20} />
                14:00
              </span>

              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/3428733?s=460&u=bae1120b3b70eb367daed0a8cde1889482f0c7ab&v=4"
                  alt="Adeonir"
                />
                <strong>Adeonir Kohl</strong>
              </div>
            </S.Appointment>

            <S.Appointment>
              <span>
                <FiClock size={20} />
                16:00
              </span>

              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/3428733?s=460&u=bae1120b3b70eb367daed0a8cde1889482f0c7ab&v=4"
                  alt="Adeonir"
                />
                <strong>Adeonir Kohl</strong>
              </div>
            </S.Appointment>
          </S.ComingSection>
        </S.Schedule>

        <S.Calendar>
          <DayPicker
            locale="pt-BR"
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
            onDayClick={handleChangeDay}
            selectedDays={selectedDay}
            onMonthChange={handleChangeMonth}
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </S.Calendar>
      </S.Content>
    </S.Container>
  )
}
