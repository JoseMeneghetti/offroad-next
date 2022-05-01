import React from 'react'

import { Container } from '../styles/pages/Home'

import OptionButton from '../components/OptionButtons/OptionButton'
import ProductSummary from '../components/ProductSummary/ProductSummary'
import Layout from '../components/Template/Layout'

const Home: React.FC = () => {
  return (
    <Container>
      <Layout
        subtitulo="Ache sua Moto ou Seu Equipamento Off-Road"
        children={
          <>
            <OptionButton />
            <ProductSummary />
          </>
        }
      />
    </Container>
  )
}

export default Home
