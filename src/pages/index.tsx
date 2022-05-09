import React from 'react'

import { Container } from '../styles/pages/Home'

import OptionButton from '../components/OptionButtons/OptionButton'
import ProductSummary from '../components/ProductSummary/ProductSummary'
import Layout from '../components/Template/Layout'
import HomeSearchBox from '../components/HomeSearchBox/HomeSearchBox'

const Home: React.FC = () => {
  return (
    <Container>
      <Layout
        subtitulo="Ache sua Moto ou Seu Equipamento Off-Road"
        children={
          <>
            <HomeSearchBox />
            <div className='content'>
              <ProductSummary />
              <ProductSummary />
            </div>
          </>
        }
      />
    </Container>
  )
}

export default Home
