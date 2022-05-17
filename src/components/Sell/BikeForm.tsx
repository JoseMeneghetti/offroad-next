import React, { useEffect, useState } from 'react'
import useAuth from '../../data/hook/useAuth'
import { saveInFirebase } from '../../firebase/FirebaseStore'
import { OptionBtnContainer } from '../../styles/components/OptionButton'
import {
  BikeFormContainer,
  BikeFormStepTitle,
  IsLoading
} from '../../styles/components/Sell/BikeForm'
import _ from 'lodash'
import Pictures from './Pictures/Pictures'
import SellInput from './SellInput'
import { Spinner, Warning } from 'phosphor-react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { ErroContainer } from '../../styles/pages/Login'

const DEFAULT_BIKE = {
  brand: '',
  model: '',
  yearF: '',
  yearM: '',
  km: '',
  price: '',
  describe: '',
  cep: '',
  city: '',
  state: '',
  phone: '',
  name: '',
  userId: null
}

export type BikeFormType = {
  brand: string
  model: string
  yearF: string
  yearM: string
  km: string
  price: string
  describe: string
  cep: string
  city: string
  state: string
  phone: string
  name: string
  userId: number
}

const BikeForm: React.FC = ({}) => {
  const [bike, setBike] = useState<BikeFormType>(DEFAULT_BIKE)
  const [step, setStep] = useState(0)
  const [newFiles, setNewFiles] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user } = useAuth()
  const fetcher = url => fetch(url).then(r => r.json())

  const route = useRouter()

  const { data: userPrismaData, error: userPrismaError } = useSWR(
    `/api/user/find-all/${user.email}`,
    fetcher
  )
    
  useEffect(() => {
    if (bike?.cep?.length === 8) {
      setisLoading(true)
      fetch(`https://viacep.com.br/ws/${bike.cep}/json/`)
        .then(async response => {
          const json = await response.json()
          setBike({
            ...bike,
            city: json.localidade,
            state: json.uf
          })
        })
        .catch(error => {
          setError(error)
        })
        .finally(() => {
          setisLoading(false)
        })
    }
  }, [bike.cep])

  useEffect(() => {
    if (userPrismaData?.id) {
      setBike({
        ...bike,
        cep: userPrismaData.cep,
        city: userPrismaData.city,
        state: userPrismaData.state,
        phone: userPrismaData.phone,
        name: userPrismaData.name,
        userId: userPrismaData.id
      })
    }
  }, [userPrismaData])

  function showError(msg, time = 5) {
    setError(msg)
    setTimeout(() => {
      setError(null)
    }, time * 1000)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const photos = await Promise.all(
      newFiles.map(async element => {
        return await saveInFirebase(user.email, element.id, element.file)
      })
    )

    if (photos.length) {
      setisLoading(true)
      fetch(`/api/products/create `, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bike: bike,
          photos: photos
        })
      }).then(result => {
        console.log('result', result)
        if (result.status === 200) {
          setisLoading(false)
          route.push('/')
        } else {
          showError('Erro Com o banco de dados!')
        }
      })
    }
  }

  function handleNext(e) {
    e.preventDefault()
    const newStep = step + 1
    setStep(newStep)
  }

  function handleBack(e) {
    e.preventDefault()
    const newStep = step - 1
    setStep(newStep)
  }

  return (
    <BikeFormContainer>
      {error && (
        <ErroContainer>
          <>
            <Warning size={24} />
            <span>{error}</span>
          </>
        </ErroContainer>
      )}
      <div className={`steps ${step === 0 && 'active'}`}>
        <BikeFormStepTitle>
          <span>Sobre sua Moto</span>
        </BikeFormStepTitle>
        <SellInput
          type="text"
          label="Qual a Marca?"
          name="brand"
          value={bike}
          changeValue={setBike}
        />
        <SellInput
          type="text"
          label="Qual o Modelo?"
          name="model"
          value={bike}
          changeValue={setBike}
        />
        <div className="Years">
          <SellInput
            type="number"
            label="Ano de Fabricação"
            name="yearF"
            value={bike}
            changeValue={setBike}
          />
          <SellInput
            type="number"
            label="Ano do Modelo"
            name="yearM"
            value={bike}
            changeValue={setBike}
          />
        </div>
      </div>
      <div className={`steps ${step === 1 && 'active'}`}>
        <BikeFormStepTitle>
          <span>Sobre sua Moto</span>
        </BikeFormStepTitle>
        <SellInput
          type="text"
          label="Quantos KMs sua moto já rodou?"
          name="km"
          value={bike}
          changeValue={setBike}
        />
        <SellInput
          type="text"
          label="Qual o Valor?"
          name="price"
          value={bike}
          changeValue={setBike}
        />
        <SellInput
          type="text"
          label="Faça uma brebe descrição sobre sua moto!"
          name="describe"
          value={bike}
          changeValue={setBike}
        />
      </div>
      <div className={`steps ${step === 2 && 'active'}`}>
        <BikeFormStepTitle>
          <span>Coloque as melhores fotos de sua Moto</span>
        </BikeFormStepTitle>
        <Pictures newFiles={newFiles} setNewFiles={setNewFiles} />
      </div>
      <div className={`steps ${step === 3 && 'active'}`}>
        <BikeFormStepTitle>
          <span>Sobre sua Localização</span>
        </BikeFormStepTitle>
        <SellInput
          type="text"
          label="Qual o seu CEP?"
          name="cep"
          value={bike}
          changeValue={setBike}
        />
        <SellInput
          type="text"
          label="Em que cidade está?"
          name="city"
          value={bike}
          changeValue={setBike}
        />
        <SellInput
          type="text"
          label="Em que estado está?"
          name="state"
          value={bike}
          changeValue={setBike}
        />
      </div>
      <div className={`steps ${step === 4 && 'active'}`}>
        <BikeFormStepTitle>
          <span>Sobre Você</span>
        </BikeFormStepTitle>
        <SellInput
          type="text"
          label="Qual o seu nome?"
          name="name"
          value={bike}
          changeValue={setBike}
        />
        <SellInput
          type="text"
          label="Qual o seu Telefone?"
          name="phone"
          value={bike}
          changeValue={setBike}
        />
      </div>
      <OptionBtnContainer>
        <button
          className="BtnVoltar"
          onClick={e => handleBack(e)}
          disabled={step <= 0}
        >
          Voltar
        </button>
        {step === 4 ? (
          <button onClick={e => handleSubmit(e)}> Anunciar</button>
        ) : (
          <button onClick={e => handleNext(e)}>Continuar</button>
        )}
      </OptionBtnContainer>
      {isLoading && (
        <IsLoading>
          <Spinner size={50} />
        </IsLoading>
      )}
    </BikeFormContainer>
  )
}

export default BikeForm
