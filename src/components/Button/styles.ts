import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.button`
  background: #ff9000;
  color: #312e38;
  border: 0;
  border-radius: 10px;
  font-weight: 500;

  height: 56px;
  line-height: 56px;
  margin-top: 24px;
  padding: 0 16px;
  width: 100%;

  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`
