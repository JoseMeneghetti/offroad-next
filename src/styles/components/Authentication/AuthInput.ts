import styled from 'styled-components'

export const AuthInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  input {
    padding: 10px 8px;
    border-radius: 0.5rem;
    background-color: ${props => props?.theme?.colors?.text};
  }
`
