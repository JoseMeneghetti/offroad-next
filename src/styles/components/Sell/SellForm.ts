import styled from 'styled-components'

export const SellFormContainer = styled.form`
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
    input {
      width: 100%;
    }
    @media (max-width: 769px) {
      width: 100%;
      height: 100%;
    }
    .datescolumn {
      display: flex;
      flex-direction: column;
    }
    label {
      font-size: 14px;
      line-height: 100%;
      color: ${props => props?.theme?.colors?.text};
    }
    .datepiker-input {
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
    .react-datepicker__year-text--selected {
      background-color: ${props => props?.theme?.colors?.primary};
    }
  }
  .textarea-label {
    font-size: 14px;
    line-height: 100%;
    color: ${props => props?.theme?.colors?.text};
  }
  .textarea-input {
    width: 100%;
    font-size: 1rem;
    margin-top: 0.5rem;
    color: ${props => props?.theme?.colors?.text};
    background-color: transparent;
    border-radius: 0.5rem;
    min-height: 250px;
    padding: 0.5rem 0.5rem;
    resize: none;
    @media (max-width: 769px) {
      min-height: 115px;
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
export const SellFormStepTitle = styled.div`
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
