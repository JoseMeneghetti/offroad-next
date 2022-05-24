import styled from 'styled-components'

export const Container = styled.div`
  width: inherit;
  height: 100vh;
  .content {
    padding: 0 1rem;
    display: flex;
    flex-wrap: wrap;
    @media (min-width: 768px) {
      justify-content: space-around;
    }
  }
`
