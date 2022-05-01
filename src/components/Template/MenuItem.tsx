import Link from 'next/link'
import React from 'react'

type MenuItemProps = {
  url: string
  icone: any
  texto?: string
}

const MenuItem: React.FC<MenuItemProps> = ({ icone, texto, url }) => {
  return (
    <div className="menuItem">
      <Link href={url}>
        <div className={'menuLink'}>
          {icone}
          {texto && <span>{texto}</span>}
        </div>
      </Link>
    </div>
  )
}

export default MenuItem
