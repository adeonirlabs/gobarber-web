import styled from 'styled-components'

export const Container = styled.div`
  position: relative;

  span {
    background: #ff9000;
    border-radius: 4px;
    color: #312e38;
    font-size: 14px;
    font-weight: 500;
    padding: 8px;
    width: 160px;

    opacity: 0;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);

    &::after {
      border-color: #ff9000 transparent;
      border-style: solid;
      border-width: 6px 6px 0 6px;

      content: '';
      left: 50%;
      position: absolute;
      top: 100%;
      transform: translateX(-50%);
    }
  }

  &:hover {
    span {
      opacity: 1;
      visibility: visible;
    }
  }
`
