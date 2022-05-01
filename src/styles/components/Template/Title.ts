import styled from 'styled-components'

export const TitleContainer = styled.div`
  h1 {
    font-size: 54px;
    color: ${props => props.theme.colors.primary};
    text-align: center;
  }
  h2 {
    margin-top: 24px;
    font-size: 24px;
    line-height: 32px;
    text-align: center;
    color: ${props => props.theme.colors.secundary};
  }
`
