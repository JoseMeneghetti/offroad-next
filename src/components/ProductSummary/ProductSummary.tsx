import React from 'react'
import {
  Image,
  ImageContainer,
  ProductSummaryContainer,
  YearContainer,
  LocationContainer
} from '../../styles/components/ProductSummary'
import Slider from 'react-slick'

interface ProductPhotos {
  photo: string
  id: number
}

interface ProductLocalization {
  state: string
  city: string
}
interface ProductSummaryProps {
  photos: [ProductPhotos]
  brand: string
  km: string
  model: string
  price: string
  user: ProductLocalization
  yearF: string
  yearM: string
}

const ProductSummary: React.FC<ProductSummaryProps> = ({
  photos,
  brand,
  km,
  model,
  price,
  user,
  yearF,
  yearM
}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return (
    <ProductSummaryContainer>
      <ImageContainer>
        <Slider {...settings}>
          {photos?.map(element => (
            <Image key={element.id} src={element.photo} alt="" />
          ))}
        </Slider>
      </ImageContainer>
      <div>
        <p>
          <span>{brand}</span> - <span>{model}</span>
        </p>
      </div>
      <div>
        <p style={{ fontWeight: 700 }}>R$ {price}</p>
      </div>
      <YearContainer>
        <span>
          {yearF}/{yearM}
        </span>
        <span>{km} Kms</span>
      </YearContainer>
      <LocationContainer>
        <span>
          {user.city} - {user.state}
        </span>
      </LocationContainer>
    </ProductSummaryContainer>
  )
}

export default ProductSummary
