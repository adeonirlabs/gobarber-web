import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  display: flex;

  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  color: #666360;

  height: 56px;
  line-height: 56px;
  padding: 0 16px;
  width: 100%;

  & + div {
    margin-top: 8px;
  }

  input {
    background: transparent;
    border: 0;
    color: #f4ede8;
    flex: 1;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`
