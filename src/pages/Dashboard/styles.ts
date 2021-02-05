import styled from 'styled-components'

export const Container = styled.article``

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

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

    strong {
      color: #ff9000;
    }
  }
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
  grid-area: 'schedule';

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

      + span::before {
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
`

export const Appointment = styled.div`
  display: flex;

  span {
    font-size: 16px;
    display: flex;
    align-items: center;
    color: #f4ede8;
    width: 70px;

    svg {
      color: #ff9900;
      margin-right: 10px;
    }
  }

  div {
    flex: 1;
    background: #3e3b47;
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
    }
  }

  + div {
    margin-top: 16px;
  }
`

export const Calendar = styled.aside`
  grid-area: 'calendar';
  background: #28262e;
  border-radius: 10px;
  height: 362px;
`
