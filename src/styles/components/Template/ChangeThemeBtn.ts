import styled from 'styled-components'

export const ThemeBtnContainerDark = styled.div`
  .icon {
    color: ${props => props.theme.colors.hover};
    width: 24px;
    height: 24px;
    border-radius: 0.25rem;
    margin-right: 1rem;
  }
`

export const ThemeBtnContainerLight = styled.div`
  .icon {
    color: ${props => props.theme.colors.quaternary};
    width: 24px;
    height: 24px;
    border-radius: 0.25rem;
    margin-left: 0.5rem;
    margin-right: 1rem;
  }
`
