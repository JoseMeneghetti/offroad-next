import styled from 'styled-components'

export const SellContainer = styled.div`
  background-image: url('images/KTM-GROUPSDec21-Cudby-0070_XLarge.jpg');
  background-size: cover;
  width: 1890px;
  height: 1072px;
  max-width: 100%;
  max-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  form {
    height: auto;
    width: 500px;
    background-color: ${props => props.theme.colors.background};
    opacity: 0.95;
    border-radius: 0.5rem;
    @media (max-width: 769px) {
      width: 95%;
      height: auto;
    }
    section {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      h1 {
        padding: 0 0.5rem;
        font-weight: 500;
        margin-right: 3%;
        cursor: pointer;
        border-bottom: 3px solid transparent;
      }
      .active {
        font-weight: 600;
        border-bottom-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.text};
      }
    }
  }
`
