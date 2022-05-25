import React, { useEffect, useState } from 'react'
import { Container } from '../styles/pages/Home'
import ProductSummary from '../components/ProductSummary/ProductSummary'
import HomeSearchBox from '../components/HomeSearchBox/HomeSearchBox'
import useSWR from 'swr'
import { Catalog } from '../components/Skeleton/Catalog'
import { ProductSummaryBikeProps } from '../components/ProductSummary/ProductSummary'
import _ from 'lodash'
import { getAllBikesHome } from '../data/next/sell-page'
import { InferGetStaticPropsType } from 'next'

export async function getStaticProps() {
  try {
    const bikePrismaData: any = await getAllBikesHome()
    return {
      props: {
        bikePrismaData
      },
      revalidate: 60 * 10
    }
  } catch (error) {
    throw new Error(error)
  }
}

const Home: React.FC = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState(undefined)
  const [result, setResult] = useState(undefined)
  const [type, setType] = useState<'bike' | 'equipment'>('bike')

  const fetcher = url => fetch(url).then(r => r.json())

  const { data: equipmentPrismaData, error: equipmentPrismaError } = useSWR(
    `/api/equipment/find-all/`,
    fetcher
  )

  function handleSearch(e: any) {
    e.preventDefault()
    if (search) {
      if (type === 'bike') {
        fetch(`/api/bike/find/${search}`).then(async response => {
          if (response.status === 400) alert('nenhum resultado encontrado')
          const result = await response.json()
          setSearchResult(result)
        })
      } else if (type === 'equipment') {
        fetch(`/api/equipment/find/${search}`).then(async response => {
          if (response.status === 400) alert('nenhum resultado encontrado')
          const result = await response.json()
          setSearchResult(result)
        })
      }
    } else {
      setSearchResult(undefined)
    }
  }

  useEffect(() => {
    if (type === 'bike') {
      setResult(props?.bikePrismaData)
    } else if (type === 'equipment') {
      setResult(equipmentPrismaData)
    }
  }, [type])

  useEffect(() => {
    if (searchResult) {
      setResult(searchResult)
    } else {
      setResult(props?.bikePrismaData)
    }
  }, [searchResult, props?.bikePrismaData])

  return (
    <Container>
      <HomeSearchBox
        setSearch={setSearch}
        search={search}
        handleSearch={handleSearch}
        setType={setType}
        type={type}
      />
      {!props.bikePrismaData && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '100vh'
          }}
        >
          <Catalog />
        </div>
      )}
      <div className="content">
        {result?.map((product: ProductSummaryBikeProps) => (
          <ProductSummary key={_.uniqueId()} product={product} />
        ))}
      </div>
    </Container>
  )
}

export default Home
