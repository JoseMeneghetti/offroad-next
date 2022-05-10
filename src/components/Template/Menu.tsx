import React from 'react'
import { MenuContainer } from '../../styles/components/Template/Menu'
import MenuItem from './MenuItem'
import Login from '../../assets/user.svg'
import useTheme from '../../data/hook/useTheme'
import ChangeThemeBtn from './ChangeThemeBtn'
import AvatarUsuario from './AvatarUsuario'
import useAuth from '../../data/hook/useAuth'
import Link from 'next/link'

const Menu: React.FC = () => {
  const ctx = useTheme()
  const { user } = useAuth()
  
  return (
    <MenuContainer>
      <Link href={'/'}>
        <div className="logo">
          <img src={'/images/My project.png'} width={51} height={38} />
          <span>RoiaShop</span>
        </div>
      </Link>

      <ChangeThemeBtn tema={ctx.theme} changeTheme={ctx.changeTheme} />

      {!user ? (
        <MenuItem icone={<Login />} url="/login"></MenuItem>
      ) : (
        <AvatarUsuario />
      )}
    </MenuContainer>
  )
}

export default Menu
