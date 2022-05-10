import Link from 'next/link'
import React, { useState } from 'react'
import { HomeSearchBoxContainer } from '../../styles/components/HomeSearchBox'

const HomeSearchBox: React.FC = () => {
  const [selectedNavItem, setSelectedNavItem] = useState('moto')

  function handleNavClick(name: string) {
    setSelectedNavItem(name)
  }
  return (
    <HomeSearchBoxContainer>
      <div className="NavBar--tabs">
        <h2
          className={`NavBar--item ${
            selectedNavItem === 'moto' ? 'active ' : ''
          }`}
          onClick={() => {
            handleNavClick('moto')
          }}
        >
          Comprar Motos
        </h2>
        <h2
          className={`NavBar--item ${
            selectedNavItem === 'equip' ? 'active ' : ''
          }`}
          onClick={() => {
            handleNavClick('equip')
          }}
        >
          Comprar Equipamentos
        </h2>
        <Link href="/">
          <h2 className="NavBar--item">Quero Vender</h2>
        </Link>
      </div>
      <div className="NavBar--content">
        <div className="NavItem">
          <div className="NavBar__searchbar">
            <div className="SearchBar">
              <div className="SearchBar__inputcontainer">
                <input
                  type="text"
                  placeholder="Digite marca ou modelo do carro"
                  value=""
                />
              </div>
            </div>
            <button>Ver Ofertas</button>
          </div>
        </div>
      </div>
    </HomeSearchBoxContainer>
  )
}

export default HomeSearchBox
