import styled from 'styled-components'

export const Container = styled.div`
  width: inherit;
  height: 100vh;
  .content {
    padding: 0 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    @media (min-width: 1024px) {
      padding: 0 3rem;
    }
  }
`
