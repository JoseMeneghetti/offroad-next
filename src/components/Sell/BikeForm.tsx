import React, { useEffect, useState } from 'react'
import useAuth from '../../data/hook/useAuth'
import { saveInFirebase } from '../../firebase/FirebaseStore'
import { OptionBtnContainer } from '../../styles/components/OptionButton'
import {
  SellFormContainer,
  SellFormStepTitle,
  IsLoading
} from '../../styles/components/Sell/SellForm'
import _ from 'lodash'
import Pictures from './Pictures/Pictures'
import SellInput from './SellInput'
import { Spinner, Warning } from 'phosphor-react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { ErroContainer } from '../../styles/pages/Login'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { getBaseUrl } from '../../utils/selectEnviroment'

const DEFAULT_BIKE = {
  brand: '',
  model: '',
  yearF: new Date().getFullYear().toString(),
  yearM: new Date().getFullYear().toString(),
  km: '',
  hours: '',
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
  hours: string
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
  const [datepikerYearF, setDatepikerYearF] = useState(new Date())
  const [datepikerYearM, setDatepikerYearM] = useState(new Date())
  const [radio, setRadio] = useState('km')
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

  useEffect(() => {
    if (radio) {
      setBike({
        ...bike,
        km: '',
        hours: ''
      })
    }
  }, [radio])

  function showError(msg, time = 5) {
    setError(msg)
    setTimeout(() => {
      setError(null)
    }, time * 1000)
  }

  async function handleSubmit() {
    setisLoading(true)

    const photos = await Promise.all(
      newFiles.map(async element => {
        return await saveInFirebase(user.email, element.id, element.file)
      })
    )

    if (photos.length) {
      fetch(`/api/bike/create `, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bike: bike,
          photos: photos
        })
      }).then(async result => {
        if (result.status === 200) {
          const revalidate = await fetch(`${getBaseUrl()}/api/revalidate?secret=${
            process.env.NEXT_PUBLIC_MY_SECRET_TOKEN
          }&path=/}
          `)
          console.log('revalidate',revalidate)
          setisLoading(false)

          route.push('/')
        } else {
          setisLoading(false)
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

  console.log(radio)

  return (
    <SellFormContainer
      onSubmit={event => {
        event.preventDefault()
        handleSubmit()
      }}
    >
      {error && (
        <ErroContainer>
          <>
            <Warning size={24} />
            <span>{error}</span>
          </>
        </ErroContainer>
      )}
      <div className={`steps ${step === 0 && 'active'}`}>
        <SellFormStepTitle>
          <span>Sobre sua Moto</span>
        </SellFormStepTitle>
        <SellInput
          showError={showError}
          type="text"
          label="Qual a Marca?"
          name="brand"
          value={bike}
          changeValue={setBike}
        />
        <SellInput
          showError={showError}
          type="text"
          label="Qual o Modelo?"
          name="model"
          value={bike}
          changeValue={setBike}
        />

        <div className="Years">
          <div className="datescolumn">
            <label>Ano de Fabricação</label>
            <DatePicker
              className="datepiker-input"
              selected={datepikerYearF}
              onChange={date => {
                setDatepikerYearF(date)
                setBike({ ...bike, yearF: date.getFullYear().toString() })
              }}
              showYearPicker
              dateFormat="yyyy"
              maxDate={new Date()}
              minDate={new Date('1950-01-01T03:24:00')}
            />
          </div>
          <div className="datescolumn">
            <label>Ano do Modelo</label>
            <DatePicker
              className="datepiker-input"
              selected={datepikerYearM}
              onChange={date => {
                setDatepikerYearM(date)
                setBike({ ...bike, yearM: date.getFullYear().toString() })
              }}
              showYearPicker
              dateFormat="yyyy"
              maxDate={new Date()}
              minDate={new Date('1950-01-01T03:24:00')}
            />
          </div>
        </div>
      </div>
      <div className={`steps ${step === 1 && 'active'}`}>
        <SellFormStepTitle>
          <span>Sobre sua Moto</span>
        </SellFormStepTitle>
        <div className="radioContainer">
          <label>
            <input
              type="radio"
              value="km"
              name="km"
              checked={radio === 'km'}
              onChange={() => setRadio('km')}
            ></input>
            KM
          </label>
          <label>
            <input
              type="radio"
              value="hours"
              name="hours"
              checked={radio === 'hours'}
              onChange={() => setRadio('hours')}
            ></input>
            Horas
          </label>
          {radio === 'km' ? (
            <SellInput
              showError={showError}
              customProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              type="number"
              label="Quantos KMs sua moto já rodou?"
              name="km"
              value={bike}
              changeValue={setBike}
            />
          ) : (
            <SellInput
              showError={showError}
              customProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              type="number"
              label="Quantos Horas sua moto possui?"
              name="km"
              value={bike}
              changeValue={setBike}
            />
          )}
        </div>

        <SellInput
          showError={showError}
          type="number"
          customProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          label="Qual o Valor?"
          name="price"
          value={bike}
          changeValue={setBike}
        />
        <label className="textarea-label">Descrição</label>
        <textarea
          className="textarea-input"
          placeholder="Conte detalhes da sua moto"
          onChange={event => setBike({ ...bike, describe: event.target.value })}
        />
      </div>
      <div className={`steps ${step === 2 && 'active'}`}>
        <SellFormStepTitle>
          <span>Coloque as melhores fotos de sua Moto</span>
        </SellFormStepTitle>
        <Pictures newFiles={newFiles} setNewFiles={setNewFiles} />
      </div>
      <div className={`steps ${step === 3 && 'active'}`}>
        <SellFormStepTitle>
          <span>Sobre sua Localização</span>
        </SellFormStepTitle>
        <SellInput
          showError={showError}
          type="text"
          label="Qual o seu CEP?"
          name="cep"
          value={bike}
          changeValue={setBike}
        />
        <SellInput
          showError={showError}
          type="text"
          label="Em que cidade está?"
          name="city"
          value={bike}
          changeValue={setBike}
        />
        <SellInput
          showError={showError}
          type="text"
          label="Em que estado está?"
          name="state"
          value={bike}
          changeValue={setBike}
        />
      </div>
      <div className={`steps ${step === 4 && 'active'}`}>
        <SellFormStepTitle>
          <span>Sobre Você</span>
        </SellFormStepTitle>
        <SellInput
          showError={showError}
          type="text"
          label="Qual o seu nome?"
          name="name"
          value={bike}
          changeValue={setBike}
        />
        <SellInput
          showError={showError}
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
          <button>Anunciar</button>
        ) : (
          <button onClick={e => handleNext(e)}>Continuar</button>
        )}
      </OptionBtnContainer>
      {isLoading && (
        <IsLoading>
          <Spinner size={50} />
        </IsLoading>
      )}
    </SellFormContainer>
  )
}

export default BikeForm
