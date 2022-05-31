import styled from 'styled-components'

export const ProfileInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 100%;
  label {
    text-transform: capitalize;
  }
  input {
    width: 100%;
    padding: 10px 8px;
    border-radius: 0.5rem;
    background-color: ${props => props?.theme?.colors?.text};
  }
`

export const ProfileForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  .row {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`
