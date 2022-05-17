import styled from 'styled-components'

export const OptionBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: 1rem 0;
  button {
    width: 200px;
    background-color: ${props => props.theme.colors.primary};
    margin: 0.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    font: inherit;
    color: inherit;
    border: none;
    padding: 1rem;
    cursor: pointer;
    outline: inherit;
    opacity: 1;
    &:hover {
      background-color: ${props => props.theme.colors.hover};
    }
  }
  .BtnVoltar {
    background-color: transparent;
    border: 1px solid ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
    &:hover {
      color: #000;
      border-color: #000;
    }
  }
`
