import styled from 'styled-components'

export const ThemeBtnContainerDark = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  background: linear-gradient(to right, #fcd34d, #d97706);
  height: 20px;
  padding: 0.25rem;
  border-radius: 1rem;
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #d97706;
    width: 20px;
    height: 20px;
    border-radius: 0.25rem;
  }
  .text {
    display: flex;
    align-items: center;
    margin-left: 0.5rem;
    color: #ffffff;
    span {
      font-size: 12px;
    }
  }
`

export const ThemeBtnContainerLight = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  background: linear-gradient(to right, #6b7280, #111827);
  height: 20px;
  padding: 0.5rem;
  border-radius: 1rem;
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    width: 20px;
    height: 20px;
    border-radius: 0.25rem;
    margin-left: 0.5rem;
  }
  .text {
    display: flex;
    align-items: center;
    color: #ffffff;
    span {
      font-size: 12px;
    }
  }
`
