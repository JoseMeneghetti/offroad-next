import React, { useEffect, useState } from 'react'
import useAuth from '../../data/hook/useAuth'
import { saveInFirebase } from '../../firebase/FirebaseStore'
import { OptionBtnContainer } from '../../styles/components/OptionButton'
import {
  BikeFormContainer,
  IsLoading
} from '../../styles/components/Sell/BikeForm'
import _ from 'lodash'
import Pictures from './Pictures/Pictures'
import SellInput from './SellInput'
import { Spinner } from 'phosphor-react'

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
  state: ''
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
}

const BikeForm: React.FC = ({}) => {
  const [bike, setBike] = useState<BikeFormType>(DEFAULT_BIKE)
  const [step, setStep] = useState(0)
  const [newFiles, setNewFiles] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [value, setValue] = useState(null)
  const [error, setError] = useState(null)

  const { user } = useAuth()

  useEffect(() => {
    if (bike.cep.length === 8) {
      setisLoading(true)
      fetch(`https://viacep.com.br/ws/${bike.cep}/json/`)
        .then(async response => {
          const json = await response.json()
          setValue(json)
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

  console.log('==>', bike)
  console.log(isLoading, value, error)

  function handleSubmit(e) {
    e.preventDefault()
    newFiles.forEach(async element => {
      await saveInFirebase(user.email, element.id, element.file)
    })
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
      <div className={`steps ${step === 0 && 'active'}`}>
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
      </div>
      <div className={`steps ${step === 2 && 'active'}`}>
        <span>Coloque as melhores fotos de sua Moto </span>
        <Pictures newFiles={newFiles} setNewFiles={setNewFiles} />
      </div>
      <div className={`steps ${step === 3 && 'active'}`}>
        {isLoading && (
          <IsLoading>
            <Spinner size={50} />
          </IsLoading>
        )}
        <SellInput
          type="text"
          label="Qual o seu CEP?"
          name="cep"
          value={bike}
          changeValue={setBike}
        />
        <SellInput
          type="text"
          label="Que cidade está sua moto?"
          name="city"
          value={bike}
          changeValue={setBike}
        />
        <SellInput
          type="text"
          label="Qual Estado está sua moto?"
          name="state"
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
        <button onClick={e => handleNext(e)}>Continuar</button>
      </OptionBtnContainer>
      {/* <button onClick={(e) => handleSubmit(e)}> Anunciar</button> */}
    </BikeFormContainer>
  )
}

export default BikeForm
