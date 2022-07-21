import React, { useState } from 'react'
import {
  Image,
  ImageContainer,
  ProfileProductSummaryContainer
} from '../../styles/components/Profile/ProfileProductSummary'

import { useRouter } from 'next/router'
import { PencilLine, Spinner, Trash } from 'phosphor-react'
import { deletePhotos } from '../../firebase/FirebaseStore'
import { getBaseUrl } from '../../utils/selectEnviroment'
import { IsLoading } from '../../styles/components/Sell/SellForm'

interface ProductPhotos {
  photo: string
  path: string
  id: number
}
interface ProductLocalization {
  state: string
  city: string
}
export interface ProfileProductSummaryBikeProps {
  id: number
  photos: [ProductPhotos]
  brand: string
  km?: string
  hours?: string
  model: string
  price: string
  user: ProductLocalization
  yearF?: string
  yearM?: string
  type?: string
}

const ProfileProductSummary: React.FC<ProfileProductSummaryBikeProps | any> = ({
  product
}) => {
  const route = useRouter()
  const [isLoading, setisLoading] = useState(false)

  function handleDelete(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    e.preventDefault()
    e.stopPropagation()

    setisLoading(true)
    fetch(`/api/bike/delete `, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idProduct: product?.id
      })
    }).then(async result => {
      if (result.status === 200) {
        await Promise.all(
          product.photos.map(async element => {
            console.log(element.path)
            return await deletePhotos(element.path)
          })
        )
        const revalidate = await fetch(`${getBaseUrl()}/api/revalidate?secret=${
          process.env.NEXT_PUBLIC_MY_SECRET_TOKEN
        }&path=/}
        `)
        route.push('/my-sells')
        setisLoading(false)
      } else {
        setisLoading(false)
      }
    })
  }
  console.log(isLoading)
  console.log(product)
  return (
    <ProfileProductSummaryContainer
      onClick={() =>
        route.push(
          product?.type
            ? `/product/equipment/${product?.id}`
            : `/product/bike/${product?.id}`
        )
      }
    >
      <ImageContainer>
        <Image src={product?.photos[0]?.photo} alt="" />
      </ImageContainer>
      <div>
        <p>
          <span>{product?.brand}</span> - <span>{product?.model}</span>
        </p>
      </div>
      <div>
        <p style={{ fontWeight: 700 }}>R$ {product?.price}</p>
      </div>
      <div className="handle">
        <Trash size={25} onClick={e => handleDelete(e)}/>
      </div>
      {isLoading && (
        <IsLoading>
          <Spinner size={50} />
        </IsLoading>
      )}
    </ProfileProductSummaryContainer>
  )
}

export default ProfileProductSummary
