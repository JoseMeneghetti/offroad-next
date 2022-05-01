import React from 'react'
import useAuth from '../data/hook/useAuth'
import { LoginContainer } from '../styles/pages/Login'

const Login: React.FC = ({}) => {
  const { user, logout } = useAuth()
  console.log(user)
  return (
    <LoginContainer>
      <div className="imgContainer">
        <img
          src="images/KTM-VOHLAND-Dec21-Cudby-0015_Small.jpg"
          alt="Picture of the author"
        />
      </div>
      <div className="form">
        <button onClick={logout}> </button>
      </div>
    </LoginContainer>
  )
}

export default Login
