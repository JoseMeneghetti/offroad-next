import React from 'react'
import {
  Image,
  ImageContainer,
  ProductSummaryContainer,
  YearContainer,LocationContainer
} from '../../styles/components/ProductSummary'

const ProductSummary: React.FC = () => {
  return (
    <ProductSummaryContainer>
      <ImageContainer>
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/offroad-market.appspot.com/o/product-1%2FIMG_1713.JPEG?alt=media&token=4231e849-5b70-4960-879b-bcd87f450438"
          alt=""
        />
      </ImageContainer>
      <div>
        <p>
          <span>HONDA</span> - <span>CRF 250F</span>
        </p>
      </div>
      <div>
        <p style={{fontWeight: 700}}>R$ 24.000</p>
      </div>
      <YearContainer>
        <span>2020/2021</span>
        <span>1000 Horas</span>
      </YearContainer>
      <LocationContainer>
        <span>Atibaia - SP</span>
      </LocationContainer>
    </ProductSummaryContainer>
  )
}

export default ProductSummary
