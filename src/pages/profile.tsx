import React from 'react'
import ForceLoading from '../components/Authentication/ForceLoading'
import Menu from '../components/Menu/Menu'
import useAuth from '../data/hook/useAuth'
import { LoginContainer } from '../styles/pages/Login'

const Profile: React.FC = ({}) => {
  const { logout } = useAuth()

  return (
    <ForceLoading>
      <LoginContainer>
        <div className="imgContainer">
          <img
            src="images/KTM-VOHLAND-Dec21-Cudby-0015_Small.jpg"
            alt="Picture of the author"
          />
        </div>
        <div className="form">
          <button onClick={logout}> SAIR </button>
        </div>
      </LoginContainer>
    </ForceLoading>
  )
}

export default Profile
