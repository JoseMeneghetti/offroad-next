import React, { useState } from 'react'
import { SellForms } from '../../styles/pages/Sell'
import BikeForm from './BikeForm'
import EquipmentForm from './EquipmentForm'

const SellForm: React.FC = ({}) => {
  const [selectedNavItem, setSelectedNavItem] = useState('moto')

  return (
    <SellForms>
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
      {selectedNavItem === 'equip' ? <EquipmentForm /> : <BikeForm />}
    </SellForms>
  )
}

export default SellForm
