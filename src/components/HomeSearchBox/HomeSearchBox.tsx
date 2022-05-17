import Link from 'next/link'
import React, { useState } from 'react'
import { HomeSearchBoxContainer } from '../../styles/components/HomeSearchBox'

interface HomeSearchBoxProps {
  search: string
  setSearch: (search: string) => void
  handleSearch: (e: any) => void
}

const HomeSearchBox: React.FC<HomeSearchBoxProps> = ({
  search,
  setSearch,
  handleSearch
}) => {
  const [selectedNavItem, setSelectedNavItem] = useState('moto')

  return (
    <HomeSearchBoxContainer>
      <div className="NavBar--tabs">
        <h2
          className={`NavBar--item ${
            selectedNavItem === 'moto' ? 'active ' : ''
          }`}
          onClick={() => {
            setSelectedNavItem('moto')
          }}
        >
          Comprar Motos
        </h2>
        <h2
          className={`NavBar--item ${
            selectedNavItem === 'equip' ? 'active ' : ''
          }`}
          onClick={() => {
            setSelectedNavItem('equip')
          }}
        >
          Comprar Equipamentos
        </h2>
        <Link href="/sell">
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
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
            <button onClick={e => handleSearch(e)}>Ver Ofertas</button>
          </div>
        </div>
      </div>
    </HomeSearchBoxContainer>
  )
}

export default HomeSearchBox
