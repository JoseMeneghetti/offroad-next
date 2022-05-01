import React from 'react'
import Title from './Title'
import { NavbarContainer } from '../../styles/components/Template/Navbar'

type NavbarProps = {
  titulo?: string
  subtitulo?: string
}

const Navbar: React.FC<NavbarProps> = ({ titulo, subtitulo }) => {
  return (
    <NavbarContainer>
      <Title titulo={titulo} subtitulo={subtitulo} />
    </NavbarContainer>
  )
}

export default Navbar
