import styled from 'styled-components'

export const ThemeBtnContainerDark = styled.div`
  height: 30px;
  .icon {
    color: ${props => props.theme.colors.hover};
    border-radius: 0.25rem;
    margin-right: 1rem;
  }
`

export const ThemeBtnContainerLight = styled.div`
  height: 30px;
  .icon {
    color: ${props => props.theme.colors.quaternary};
    border-radius: 0.25rem;
    margin-left: 0.5rem;
    margin-right: 1rem;
  }
`
