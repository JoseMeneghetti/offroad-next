import React from 'react'
import { OptionBtnContainer } from '../../styles/components/OptionButton'

const OptionButton: React.FC = () => {
  return (
    <OptionBtnContainer>
      <button>Motos</button>
      <button>Equipamento</button>
    </OptionBtnContainer>
  )
}

export default OptionButton
