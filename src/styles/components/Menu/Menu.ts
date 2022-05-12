import styled from 'styled-components'

export const MenuContainer = styled.div`
  display: flex;
  position: sticky;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: ${props => props.theme.colors.background_2};
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  width: 100%;
  z-index: 2;
  .logo {
    cursor: pointer;
    display: flex;
    align-items: center;
    flex-grow: 1;
    span {
      font-size: 1.25rem;
      color: ${props => props.theme.colors.hover};
      font-weight: 700;
    }
  }
  img {
    object-fit: contain;
  }
  .menuItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 0.5rem;
    svg {
      width: inherit;
      height: inherit;
      color: ${props => props.theme.colors.text};
      stroke: ${props => props.theme.colors.text};
      path {
        color: ${props => props.theme.colors.text};
        stroke: ${props => props.theme.colors.text};
      }
    }
    .menuLink {
      display: flex;
      flex-direction: column;
      cursor: pointer;
    }
    span {
      font-size: 12px;
    }
  }
  .avatar {
    width: 35px;
    height: 35px;
    border-radius: 2rem;
    margin: 0.2rem;
    cursor: pointer;
  }
`
