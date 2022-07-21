import React from 'react'
import useSWR from 'swr'
import useAuth from '../../data/hook/useAuth'
import { ProductSummaryBikeProps } from '../ProductSummary/ProductSummary'
import _ from 'lodash'
import ProfileProductSummary from './ProfileProductSummary'
import {
  MySellsContainer,
  MySellsContent
} from '../../styles/components/Profile/MySells'
import Slider from 'react-slick'

const MySells: React.FC = ({}) => {
  const { user } = useAuth()
  console.log(user)
  const fetcher = url => fetch(url).then(r => r.json())

  const { data, error: equipmentPrismaError } = useSWR(
    `/api/products/${user?.email}/`,
    fetcher
  )
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
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow props />,
    prevArrow: <SamplePrevArrow props />
  }

  console.log(data)

  return (
    <MySellsContainer>
      <h2>Meus Anuncios</h2>
      <MySellsContent>
        <span>Minhas Motos Anunciadas</span>
        <Slider {...settings}>
          {data?.bikes?.map((product: ProductSummaryBikeProps) => (
            <ProfileProductSummary key={_.uniqueId()} product={product} />
          ))}
        </Slider>
      </MySellsContent>
      <MySellsContent>
        <span>Meus Equipamentos Anunciados</span>
        <Slider {...settings}>
          {data?.equipments?.map((product: ProductSummaryBikeProps) => (
            <ProfileProductSummary key={_.uniqueId()} product={product} />
          ))}
        </Slider>
      </MySellsContent>
    </MySellsContainer>
  )
}

export default MySells
