import styled from 'styled-components'

export const ProfileInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 100%;
  label {
    text-transform: capitalize;
  }
  input {
    font-size: 1rem;
    font-weight: 500;
    padding: 8px 8px;
    color: ${props => props?.theme?.colors?.text};
    background-color: transparent;
    border: 0;
    border-bottom: 3px solid grey;
    max-width: 220px;
    &:focus {
      outline: none;
      border-bottom: 3px solid ${props => props?.theme?.colors?.primary};
    }
  }
`
export const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .image-container {
    width: 150px;
    height: 150px;
    position: relative;
    margin: 0px auto;
    border-radius: 100px;
    border: 3px solid rgb(236, 237, 242);
    div {
      border: 3px solid rgb(255, 255, 255);
      border-radius: 100px;
      background: rgb(0, 0, 0);
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      height: 100%;
      width: 100%;
      color: rgb(255, 255, 255);
      font-size: 70px;
      font-weight: 500;
    }
    img {
      height: 100%;
      width: 100%;
      border-radius: 100px;

    }
  }
  span {
    font-size: 20px;
  }
`

export const ProfileForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  .row {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      margin-right: 0.25rem;
    }
  }
`
