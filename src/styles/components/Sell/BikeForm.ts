import styled from 'styled-components'

export const BikeFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 2rem;

  .steps {
    display: none;
  }
  .active {
    display: block;
  }
  .Years {
    display: flex;
    justify-content: space-between;
    @media (max-width: 769px) {
      flex-direction: column;
      width: 100%;
      height: 100%;
    }
  }
`

export const IsLoading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.text};
  opacity: 0.9;
  /* background-color: rgba(255, 255, 255, 0.9); */
  border-radius: 1rem;
  svg {
    color: ${props => props.theme.colors.background};
    animation-name: spin;
    animation-duration: 2500ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
export const BikeFormStepTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 2rem;
  span {
    font-size: 20px;
    font-weight: 600;
  }
`
