import styled from 'styled-components'

export const PicturesContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 0.5rem;
  margin: 1rem 2rem;
  padding: 1rem;
  .dropzone {
    display: flex;
    justify-content: center;
    padding: 20px;
    border: 1px ${props => props.theme.colors.secundary} dashed;
  }
`
