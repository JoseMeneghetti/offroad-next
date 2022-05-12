import React from 'react'
import { Container } from '../styles/pages/Home'
import ProductSummary from '../components/ProductSummary/ProductSummary'
import HomeSearchBox from '../components/HomeSearchBox/HomeSearchBox'

const Home: React.FC = () => {
  return (
    <Container>
      <HomeSearchBox />
      <div className="content">
        <ProductSummary />
        <ProductSummary />
      </div>
    </Container>
  )
}

export default Home
