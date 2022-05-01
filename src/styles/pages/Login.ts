import styled from 'styled-components'

export const LoginContainer = styled.div`
  width: inherit;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .form {
    margin: 0 1rem;
    width: 50%;
    @media (max-width: 768px) {
      width: 100%;
    }
    .logo {
      display: flex;
      justify-content: center;
    }
    p {
      margin-top: 0.5rem;
    }
    a {
      color: blue;
      font-weight: 500;
      cursor: pointer;
      :hover {
        color: blueviolet;
      }
    }
  }
  .imgContainer {
    width: 50%;
    @media (max-width: 768px) {
      display: none;
    }
    img {
      height: 100vh;
      width: 100%;
      object-fit: none;
    }
  }
  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
  }
  button {
    width: 100%;
    background-color: ${props => props?.theme?.colors?.primary};
    margin: 1rem 0;
    border-radius: 0.5rem;
    font-weight: 500;
    font: inherit;
    color: inherit;
    border: none;
    padding: 1rem;
    cursor: pointer;
    outline: inherit;
    &:hover {
      background-color: ${props => props?.theme?.colors?.hover};
    }
  }
  .btnGoogle {
    background-color: red;
  }
  hr {
    margin-top: 0.5rem;
    border: 1px solid grey;
    width: 100%;
  }
`
