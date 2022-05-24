import React, { useEffect, useState } from 'react'
import { Container } from '../styles/pages/Home'
import ProductSummary from '../components/ProductSummary/ProductSummary'
import HomeSearchBox from '../components/HomeSearchBox/HomeSearchBox'
import useSWR from 'swr'
import { Catalog } from '../components/Skeleton/Catalog'
import { ProductSummaryBikeProps } from '../components/ProductSummary/ProductSummary'
import _ from 'lodash'

const Home: React.FC = props => {
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState(undefined)
  const [result, setResult] = useState(undefined)
  const [type, setType] = useState<'bike' | 'equipment'>('bike')

  const fetcher = url => fetch(url).then(r => r.json())

  const { data: bikePrismaData, error: bikePrismaError } = useSWR(
    `/api/bike/find-all/`,
    fetcher
  )

  const { data: equipmentPrismaData, error: equipmentPrismaError } = useSWR(
    `/api/equipment/find-all/`,
    fetcher
  )

  function handleSearch(e: any) {
    e.preventDefault()
    if (search) {
      fetch(`/api/products/find/${search}`).then(async response => {
        setSearchResult(await response.json())
      })
    } else {
      setSearchResult(undefined)
    }
  }

  useEffect(() => {
    if (type === 'bike') {
      setResult(bikePrismaData)
    } else if (type === 'equipment') {
      setResult(equipmentPrismaData)
    }
  }, [type])

  useEffect(() => {
    if (searchResult) {
      setResult(searchResult)
    } else {
      setResult(bikePrismaData)
    }
  }, [searchResult, bikePrismaData])

  return (
    <Container>
      <HomeSearchBox
        setSearch={setSearch}
        search={search}
        handleSearch={handleSearch}
        setType={setType}
        type={type}
      />
      {bikePrismaError && <h1> ERRO 500...</h1>}
      {!bikePrismaData && (
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
