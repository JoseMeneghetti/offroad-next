import React, { useState } from 'react'
import BikeForm from './BikeForm'
import EquipForm from './EquipForm'

const SellForm: React.FC = ({}) => {
  const [selectedNavItem, setSelectedNavItem] = useState('moto')

  return (
    <form>
      <section>
        <h1
          className={`${selectedNavItem === 'moto' ? 'active ' : ''}`}
          onClick={() => {
            setSelectedNavItem('moto')
          }}
        >
          Motos
        </h1>
        <h1
          className={`${selectedNavItem === 'equip' ? 'active ' : ''}`}
          onClick={() => {
            setSelectedNavItem('equip')
          }}
        >
          Equipamentos
        </h1>
      </section>
      {selectedNavItem === 'equip' ? <EquipForm /> : <BikeForm />}
    </form>
  )
}

export default SellForm
