import React from 'react'
import {
  Image,
  ImageContainer,
  ProductSummaryContainer,
  YearContainer,
  LocationContainer
} from '../../styles/components/ProductSummary'

import Slider from 'react-slick'
import { useRouter } from 'next/router'
interface ProductPhotos {
  photo: string
  id: number
}
interface ProductLocalization {
  state: string
  city: string
}
export interface ProductSummaryBikeProps {
  id: number
  photos: [ProductPhotos]
  brand: string
  km: string
  model: string
  price: string
  user: ProductLocalization
  yearF?: string
  yearM?: string
  type?: string
}

const ProductSummary: React.FC<ProductSummaryBikeProps | any> = ({
  product
}) => {
  const route = useRouter()

  function SampleNextArrow(props) {
    const { className, style, onClick } = props
    return (
      <div
        className={className}
        style={{ ...style, display: 'block' }}
        onClick={e => {
          onClick()
          e.stopPropagation()
        }}
      />
    )
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props
    return (
      <div
        className={className}
        style={{ ...style, display: 'block' }}
        onClick={e => {
          onClick()
          e.stopPropagation()
        }}
      />
    )
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow props />,
    prevArrow: <SamplePrevArrow props />
  }

  return (
    <ProductSummaryContainer
      onClick={() =>
        route.push(
          product.type
            ? `/product/equipment/${product?.id}`
            : `/product/bike/${product?.id}`
        )
      }
    >
      <ImageContainer>
        <Slider {...settings}>
          {product.photos?.map((element: ProductPhotos) => (
            <Image key={element.id} src={element.photo} alt="" />
          ))}
        </Slider>
      </ImageContainer>
      <div>
        <p>
          <span>{product.brand}</span> - <span>{product.model}</span>
        </p>
      </div>
      <div>
        <p style={{ fontWeight: 700 }}>R$ {product.price}</p>
      </div>
      <YearContainer>
        {!product.type ? (
          <>
            <span>
              {product.yearF}/{product.yearM}
            </span>
            <span>{product.km} Kms</span>
          </>
        ) : (
          <span>{product.type}</span>
        )}
      </YearContainer>
      <LocationContainer>
        <span>
          {product.user?.city} - {product.user?.state}
        </span>
      </LocationContainer>
    </ProductSummaryContainer>
  )
}

export default ProductSummary
