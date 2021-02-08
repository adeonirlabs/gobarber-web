import 'react-day-picker/lib/style.css'

import Logo from 'assets/logo.svg'
import { format, isAfter, isToday, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { useAuth } from 'hooks/auth'
import { useCallback, useEffect, useMemo, useState } from 'react'
import DayPicker, { DayModifiers } from 'react-day-picker'
import { FiClock, FiPower } from 'react-icons/fi'
import { api } from 'services'

import * as S from './styles'

type CalendarModifiers = {
  available?: boolean
} & DayModifiers

type MonthAvailability = {
  day: number
  available: boolean
}

type Appointment = {
  id: string
  date: string
  hour: string
  user: {
    name: string
    avatar_url: string
  }
}

export const Dashboard = () => {
  const { signOut, user } = useAuth()

  const [selectedDay, setSelectedDay] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailability[]
  >([])

  const [appointments, setAppointments] = useState<Appointment[]>([])

  const handleChangeDay = useCallback(
    (day: Date, modifiers: CalendarModifiers) => {
      if (modifiers.available && !modifiers.disabled) {
        setSelectedDay(day)
      }
    },
    [],
  )

  const handleChangeMonth = useCallback((month: Date) => {
    setCurrentMonth(month)
  }, [])

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

  useEffect(() => {
    api
      .get<Appointment[]>('appointments/me', {
        params: {
          year: selectedDay.getFullYear(),
          month: selectedDay.getMonth() + 1,
          day: selectedDay.getDate(),
        },
      })
      .then((response) => {
        const appointmentsWithHour = response.data.map((appointment) => {
          return {
            ...appointment,
            hour: format(parseISO(appointment.date), 'HH:mm'),
          }
        })
        setAppointments(appointmentsWithHour)
      })
  }, [selectedDay])

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

  const selectedDayAsText = useMemo(() => {
    return format(selectedDay, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    })
  }, [selectedDay])

  const selectedWeekday = useMemo(() => {
    return format(selectedDay, 'eeee', {
      locale: ptBR,
    })
  }, [selectedDay])

  const morningAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return parseISO(appointment.date).getHours() < 12
    })
  }, [appointments])

  const afternoonAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return parseISO(appointment.date).getHours() >= 12
    })
  }, [appointments])

  const nextAppointment = useMemo(() => {
    return appointments.find((appointment) => {
      return isAfter(parseISO(appointment.date), new Date())
    })
  }, [appointments])

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
            {isToday(selectedDay) && <span>Hoje</span>}
            <span>{selectedDayAsText}</span>
            <span>{selectedWeekday}</span>
          </p>

          {isToday(selectedDay) && nextAppointment && (
            <S.NextAppoitment>
              <h3>Próximo agendamento</h3>
              <div>
                <img
                  src={nextAppointment?.user.avatar_url}
                  alt={nextAppointment?.user.name}
                />
                <strong>{nextAppointment?.user.name}</strong>

                <span>
                  <FiClock size={24} />
                  {nextAppointment.hour}
                </span>
              </div>
            </S.NextAppoitment>
          )}

          <S.ComingSection>
            <h3>Manhã</h3>

            {morningAppointments.length === 0 && (
              <p>Nenhum agendamento neste período.</p>
            )}

            {morningAppointments.map((appointment) => (
              <S.Appointment key={appointment.id}>
                <span>
                  <FiClock size={20} />
                  {appointment.hour}
                </span>

                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </S.Appointment>
            ))}
          </S.ComingSection>

          <S.ComingSection>
            <h3>Tarde</h3>

            {morningAppointments.length === 0 && (
              <p>Nenhum agendamento neste período.</p>
            )}

            {afternoonAppointments.map((appointment) => (
              <S.Appointment key={appointment.id}>
                <span>
                  <FiClock size={20} />
                  {appointment.hour}
                </span>

                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </S.Appointment>
            ))}
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
