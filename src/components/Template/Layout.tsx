import React from 'react'
import Menu from './Menu'
import Navbar from './Navbar'
import Content from './Content'
import { LayoutContainer } from '../../styles/components/Template/Layout'

type LayoutProps = {
  titulo?: string
  subtitulo?: string
  children?: any
}

const Layout: React.FC<LayoutProps> = ({ children, titulo, subtitulo }) => {
  return (
    <LayoutContainer>
        <Menu />
        <Navbar titulo={titulo} subtitulo={subtitulo} />
        <Content>{children}</Content>
    </LayoutContainer>
  )
}

export default Layout
