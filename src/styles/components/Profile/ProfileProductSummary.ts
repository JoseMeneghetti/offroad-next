import styled from 'styled-components'

export const ProfileProductSummaryContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  flex-direction: column;
  border: 1px solid ${props => props.theme.colors.text};
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 1rem 0 0 1.5rem;
  cursor: pointer;
  max-width: 150px;
  @media (max-width: 550px) {
    max-width: 100%;
  }
  .handle{
    width: 100%;
    padding: 0.5rem 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    svg {
      color: ${props => props.theme.colors.hover};
    }
  }
`

export const ImageContainer = styled.div`
  width: 100%;
  height: 150px;
  margin-bottom: 0.5rem;
  div {
    height: 100%;
    max-height: 150px;
  }
`

export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 0.2rem;
`
