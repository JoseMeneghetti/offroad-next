import React from 'react'
import { MenuContainer } from '../../styles/components/Menu/Menu'
import MenuItem from './MenuItem'
import useTheme from '../../data/hook/useTheme'
import ChangeThemeBtn from './ChangeThemeBtn'
import AvatarUsuario from './AvatarUsuario'
import useAuth from '../../data/hook/useAuth'
import Link from 'next/link'
import { CurrencyCircleDollar, UserCircle } from 'phosphor-react'

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

      {user && (
        <MenuItem
          texto="Meus Anuncios"
          icone={<CurrencyCircleDollar size={30} />}
          url="/my-sells"
        ></MenuItem>
      )}

      <ChangeThemeBtn tema={ctx.theme} changeTheme={ctx.changeTheme} />

      {!user ? (
        <MenuItem icone={<UserCircle size={30} />} url="/login"></MenuItem>
      ) : (
        <AvatarUsuario />
      )}
    </MenuContainer>
  )
}

export default Menu
