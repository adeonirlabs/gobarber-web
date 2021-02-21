import ArrowLeftIcon from 'assets/icon-arrow-left.svg'
import ArrowRightIcon from 'assets/icon-arrow-right.svg'
import { shade } from 'polished'
import styled, { css } from 'styled-components'

type AppointmentProps = {
  isPast?: boolean
}

export const Container = styled.article``

export const HeaderWrapper = styled.header`
  height: 144px;
  background: #28262e;
  padding: 0 10px;
`

export const Header = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 100%;

  > img {
    width: 160px;
  }

  > button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 24px;
      height: 24px;
    }
  }
`

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: #1e1d23;
    display: block;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
      font-size: 14px;
    }

    a {
      text-decoration: none;
      color: #ff9000;
      transition: opacity 0.2s ease;

      :hover {
        opacity: 0.8;
      }
    }
  }
`

export const ContentWrapper = styled.div`
  padding: 0 10px;
`

export const Content = styled.section`
  max-width: 1120px;
  margin: 64px auto;
  display: grid;
  grid-template-columns: 1fr 360px;
  grid-template-areas: 'schedule calendar';
  gap: 120px;
`

export const Schedule = styled.main`
  grid-area: schedule;

  h1 {
    font-size: 36px;
  }

  p {
    color: #ff900f;
    margin-top: 8px;
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;

      :not(:last-child)::after {
        content: '';
        width: 1px;
        height: 14px;
        background: #ff9900;
        margin-left: 8px;
        margin-right: 8px;
      }
    }
  }
`

export const NextAppoitment = styled.div`
  margin-top: 64px;

  h3 {
    color: #999591;
    font-size: 20px;
    margin-bottom: 24px;
  }

  div {
    background: #3e3b47;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    position: relative;

    ::before {
      content: '';
      width: 3px;
      height: 70%;
      border-radius: 0 3px 3px 0;
      background: #ff9900;
      position: absolute;
      left: 0;
      top: 15%;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-right: 24px;
    }

    strong {
      font-size: 24px;
    }

    span {
      margin-left: auto;
      font-size: 20px;
      display: flex;
      align-items: center;
      color: #999591;

      svg {
        color: #ff9900;
        margin-right: 10px;
      }
    }
  }
`

export const ComingSection = styled.div`
  margin-top: 48px;

  h3 {
    color: #999591;
    font-size: 20px;
    border-bottom: 1px solid #3e3b47;
    padding-bottom: 16px;
    margin-bottom: 24px;
  }

  p {
    color: #fff;
  }
`

export const Appointment = styled.div<AppointmentProps>`
  ${(props) => css`
    display: flex;

    span {
      font-size: 16px;
      display: flex;
      align-items: center;
      color: ${props.isPast ? '#999591' : '#f4ede8'};
      width: 70px;

      svg {
        color: #ff9900;
        margin-right: 10px;
      }
    }

    div {
      flex: 1;
      background: ${props.isPast ? '#28262e' : '#3e3b47'};
      border-radius: 10px;
      display: flex;
      align-items: center;
      padding: 16px;
      margin-left: 24px;

      img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        margin-right: 16px;
      }

      strong {
        font-size: 20px;
        color: ${props.isPast && shade(0.2, '#999591')};
      }
    }

    + div {
      margin-top: 16px;
    }
  `}
`

export const Calendar = styled.aside`
  grid-area: calendar;

  .DayPicker {
    border-radius: 10px;

    &-wrapper {
      padding-bottom: 0;
      background: #28262e;
      border-radius: 10px;
      z-index: 0;
    }

    &-NavBar {
      position: relative;

      ::before {
        content: '';
        width: 100%;
        height: 50px;
        position: absolute;
        background: #3e3b47;
        border-radius: 10px 10px 0 0;
        z-index: -1;
      }
    }

    &-NavButton {
      color: #999591 !important;
      margin-top: 0;
      top: 0;

      &--prev {
        background: url(${ArrowLeftIcon}) no-repeat center;
        margin-right: 0;
        left: 12px;
        width: 50px;
        height: 50px;
      }

      &--next {
        background: url(${ArrowRightIcon}) no-repeat center;
        right: 12px;
        width: 50px;
        height: 50px;
      }
    }

    &-Month {
      border-collapse: separate;
      border-spacing: 8px;
      margin: 0;
      padding: 0 10px 10px;
    }

    &-Caption {
      line-height: 50px;
      color: #f4ede8;

      > div {
        text-align: center;
      }
    }

    &-Weekday {
      color: #666360;
      font-size: 16px;
    }

    &-Day {
      width: 40px;
      height: 40px;
      transition: all 0.2s ease;
      border-radius: 10px;

      &--today {
        font-weight: normal;
        color: #fff;
      }

      &--available:not(.DayPicker-Day--outside) {
        background: #3e3b47;
        border-radius: 10px;
      }

      &--disabled {
        color: #666360;
        background: transparent !important;
      }

      &--selected:not(.DayPicker-Day--disabled) {
        background: #ff9000 !important;
        color: #232129 !important;
      }
    }

    &:not(.DayPicker--interactionDisabled)
      .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
      background: ${shade(0.2, '#3e3b47')};
    }
  }
`
