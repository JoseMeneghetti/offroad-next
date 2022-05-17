import React, { useEffect, useState } from 'react'
import { Container } from '../styles/pages/Home'
import ProductSummary from '../components/ProductSummary/ProductSummary'
import HomeSearchBox from '../components/HomeSearchBox/HomeSearchBox'
import useSWR from 'swr'
import { Catalog } from '../components/Skeleton/Catalog'

const Home: React.FC = props => {
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState(undefined)
  const [result, setResult] = useState(undefined)

  const fetcher = url => fetch(url).then(r => r.json())

  const { data: productsPrismaData, error: productsPrismaError } = useSWR(
    `/api/products/find-all/`,
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
    if (searchResult) {
      setResult(searchResult)
    } else {
      setResult(productsPrismaData)
    }
  }, [searchResult, productsPrismaData])

  if (productsPrismaError) {
    return <h1> ERRO 500...</h1>
  }

  console.log(result)
  return (
    <Container>
      <HomeSearchBox
        setSearch={setSearch}
        search={search}
        handleSearch={handleSearch}
      />
      {!productsPrismaData && (
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
        {result?.map(product => (
          <ProductSummary
            photos={product.photos}
            brand={product.brand}
            model={product.model}
            km={product.km}
            price={product.price}
            user={product.user}
            yearF={product.yearF}
            yearM={product.yearM}
            key={product.id}
          />
        ))}
      </div>
    </Container>
  )
}

export default Home
