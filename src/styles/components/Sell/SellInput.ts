import styled from 'styled-components'

export const SellInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
  label {
    font-size: 14px;
    line-height: 100%;
    color: ${props => props?.theme?.colors?.text};
  }
  input {
    font-size: 1rem;
    font-weight: 500;
    padding: 8px 8px;
    color: ${props => props?.theme?.colors?.text};
    background-color: transparent;
    border: 0;
    border-bottom: 3px solid grey;
    &:focus {
      outline: none;
      border-bottom: 3px solid ${props => props?.theme?.colors?.primary};
    }
  }
`
