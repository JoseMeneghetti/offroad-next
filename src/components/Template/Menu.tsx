import React from 'react'
import { MenuContainer } from '../../styles/components/Template/Menu'
import MenuItem from './MenuItem'
import Login from '../../assets/user.svg'
import Logo from '../../assets/logo-1.png'
import useTheme from '../../data/hook/useTheme'
import ChangeThemeBtn from './ChangeThemeBtn'
import AvatarUsuario from './AvatarUsuario'
import useAuth from '../../data/hook/useAuth'

const Menu: React.FC = () => {
  const ctx = useTheme()
  const { user } = useAuth()
  console.log(user)
  return (
    <MenuContainer>
      <div className='logo'>
        <img src={'/images/My project.png'} width={51} height={38} />
        <span>RoiaShop</span>
      </div>
      <ChangeThemeBtn tema={ctx.theme} changeTheme={ctx.changeTheme} />

      {!user ? (
        <MenuItem icone={<Login />} url="/login" texto="Login"></MenuItem>
      ) : (
        <AvatarUsuario />
      )}
    </MenuContainer>
  )
}

export default Menu
