import React from 'react'
import ForceLoading from '../components/Authentication/ForceLoading'
import SellForm from '../components/Sell/SellForm'
import { SellContainer } from '../styles/pages/Sell'

const Sell: React.FC = ({}) => {
  return (
    <ForceLoading>
      <SellContainer>
        <SellForm />
      </SellContainer>
    </ForceLoading>
  )
}

export default Sell
