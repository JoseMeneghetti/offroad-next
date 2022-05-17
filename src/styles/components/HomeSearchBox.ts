import styled from 'styled-components'

export const HomeSearchBoxContainer = styled.div`
  margin: 20px auto 32px;
  padding: 20px 30px;
  max-width: 1024px;
  min-width: 800px;
  width: 100%;
  box-shadow: 0 8px 20px 0 rgb(158 184 209 / 43%);
  border-radius: 0.5rem;
  @media (max-width: 769px) {
    min-width: 100%;
  }
  .NavBar--tabs {
    display: flex;
    justify-content: start;
    align-items: center;
    .NavBar--item {
      padding: 0 0.5rem;
      font-size: 16px;
      font-weight: 500;
      margin-right: 3%;
      cursor: pointer;
      border-bottom: 3px solid transparent;
    }
    .active {
      font-weight: 600;
      border-bottom-color: ${props => props.theme.colors.quaternary};
      color: ${props => props.theme.colors.text};
    }
  }
  .NavBar--content {
    display: block;
    margin-top: 16px;
    font-size: 14px;
    color: #4d4c59;
    .NavBar__searchbar {
      display: flex;
      .SearchBar {
        width: 70%;
        padding: 0;
        margin-bottom: 8px;
        margin-right: 20px;
      }
      input {
        width: 100%;
        border: 2px solid #ecedf2;
        border-radius: 0.5rem;
        padding: 1rem 1rem 1rem 3rem;
        font-size: 16px;
        background-image: url(https://www.webmotors.com.br/assets/img/icon/search.svg);
        background-repeat: no-repeat;
        background-position-y: center;
        background-size: 50px 30px;
        @media (max-width: 769px) {
          font-size: 12px;
        }
      }
      button {
        font: inherit;
        box-shadow: 0 8px 12px -8px ${props => props.theme.colors.tertiary};
        border-radius: 0.5rem;
        width: 30%;
        height: 100%;
        padding: 1rem;
        font-size: 18px;
        font-weight: 600;
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.text};
        border: none;
        cursor: pointer;
        &:hover {
          background-color: ${props => props.theme.colors.hover};
        }
        @media (max-width: 769px) {
          font-size: 14px;
        }
      }
    }
  }
`
