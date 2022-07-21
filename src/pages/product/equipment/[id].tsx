import React, { useCallback, useState } from 'react'
import {
  Image,
  ImageContainer,
  ProductPageContainer,
  DescriptionContainer,
  RightDescriptionContainer,
  DescriptionMonileContainer
} from '../../../styles/components/ProductPage/ProductPage'
import { InferGetStaticPropsType } from 'next'
import Slider from 'react-slick'
import { WhatsappLogo } from 'phosphor-react'
import ImageViewer from 'react-simple-image-viewer'
import { isMobile } from 'react-device-detect'
import {
  getEquipmentIds,
  getEquipmentProducts
} from '../../../data/next/sell-page'

export interface Photo {
  id: number
  photo: string
}

export interface User {
  state: string
  city: string
  phone: string
  name: string
}

export interface EquipmentProduct {
  id: number
  brand: string
  model: string
  type: string
  price: string
  describe: string
  userId: number
  photos: Photo[]
  user: User
}
export interface SimpleDescriptionProps {
  label: any
  text: any
  className?: any
}

export async function getStaticPaths() {
  try {
    const ids = await getEquipmentIds()

    const paths = ids.map(id => {
      return { params: { id } }
    })

    return {
      paths,
      fallback: true
    }
  } catch (error) {
    throw new Error(error)
  }
}

export async function getStaticProps({ params }) {
  try {
    const product: EquipmentProduct = await getEquipmentProducts(
      parseInt(params.id)
    )

    return {
      props: {
        product
      }
    }
  } catch (error) {
    throw new Error(error)
  }
}

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
}
const EquipmentProductPage: React.FC = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const { product } = props

  const photos = product?.photos.map(ele => {
    return `${ele.photo}`
  })

  const openImageViewer = useCallback(index => {
    setCurrentImage(index)
    setIsViewerOpen(true)
  }, [])

  const closeImageViewer = () => {
    setCurrentImage(0)
    setIsViewerOpen(false)
  }

  const SimpleDescription: React.FC<SimpleDescriptionProps> = ({
    label,
    text,
    className
  }) => (
    <div className={`simple-description ${className ?? ''}`}>
      <span className="label">{label} </span>
      <span className="text">{text} </span>
    </div>
  )

  return (
    <ProductPageContainer>
      {props?.product ? (
        <>
          <ImageContainer>
            <Slider {...settings}>
              {photos?.map((element: string, index: number) => (
                <Image
                  key={index}
                  src={element}
                  alt=""
                  onClick={() => openImageViewer(index)}
                />
              ))}
            </Slider>
          </ImageContainer>
          <div className="containers">
            {isMobile ? (
              <DescriptionMonileContainer>
                <div className="title-container">
                  <span className="brand">
                    {product.brand}{' '}
                    <span className="model">{product.model}</span>
                  </span>
                  <span className="price">
                    R${' '}
                    {new Intl.NumberFormat('id').format(
                      parseInt(product.price)
                    )}
                  </span>{' '}
                  <a
                    href={`https://wa.me/55${product.user.phone}`}
                    target="_blank"
                  >
                    <WhatsappLogo size={32} color="#22c016" />
                  </a>
                </div>
                <div className="seller-mobile-info">
                  <SimpleDescription
                    className={'right'}
                    label={'Nome:'}
                    text={product.user.name}
                  />
                  <SimpleDescription
                    label={'Localização:'}
                    text={`${product.user.city} - ${product.user.state}`}
                    className={'right'}
                  />
                  <div className="phone">
                    <SimpleDescription
                      label={'Contato:'}
                      text={product.user.phone}
                      className={'right'}
                    />
                  </div>
                </div>
                <div className="equipment-info-container">
                  <SimpleDescription
                    label={'Tipo do Equipamento'}
                    text={product.type}
                  />
                </div>
                <SimpleDescription
                  label={'Descrição'}
                  text={product.describe}
                />
              </DescriptionMonileContainer>
            ) : (
              <>
                <DescriptionContainer>
                  <div className="title-container">
                    <span className="brand">{product.brand} </span>
                    <span className="model">{product.model}</span>
                  </div>
                  <div className="row-1">
                    <SimpleDescription
                      label={'Tipo do Equipamento'}
                      text={product.type}
                    />
                  </div>
                  <div className="row-2">
                    <SimpleDescription
                      label={'Descrição'}
                      text={product.describe}
                    />
                  </div>
                </DescriptionContainer>
                <RightDescriptionContainer>
                  <div className="price">
                    <span>
                      R${' '}
                      {new Intl.NumberFormat('id').format(
                        parseInt(product.price)
                      )}
                    </span>
                  </div>
                  <div className="seller-info">
                    <span className="seller-label">
                      Informações do Vendedor{' '}
                    </span>
                    <SimpleDescription
                      className={'right'}
                      label={'Nome:'}
                      text={product.user.name}
                    />
                    <SimpleDescription
                      label={'Localização:'}
                      text={`${product.user.city} - ${product.user.state}`}
                      className={'right'}
                    />
                    <div className="phone">
                      <SimpleDescription
                        label={'Contato:'}
                        text={product.user.phone}
                        className={'right'}
                      />

                      <WhatsappLogo
                        size={32}
                        color="#22c016"
                        onClick={() => {
                          console.log('zipzop')
                        }}
                      />
                    </div>
                  </div>
                </RightDescriptionContainer>
              </>
            )}
          </div>
        </>
      ) : (
        false
      )}
      {isViewerOpen && (
        <ImageViewer
          src={photos}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </ProductPageContainer>
  )
}

export default EquipmentProductPage
