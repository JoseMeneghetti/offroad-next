import React, { useEffect, useLayoutEffect, useState } from 'react'
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

import 'react-datepicker/dist/react-datepicker.css'
import { getBaseUrl } from '../../utils/selectEnviroment'

const DEFAULT_EQUIPMENT = {
  brand: '',
  model: '',
  type: '',
  price: '',
  describe: '',
  cep: '',
  city: '',
  state: '',
  phone: '',
  name: '',
  userId: null
}

export type EquipmentFormType = {
  brand: string
  model: string
  type: string
  price: string
  describe: string
  cep: string
  city: string
  state: string
  phone: string
  name: string
  userId: number
}

const EquipmentForm: React.FC = ({}) => {
  const [equipment, setEquipment] =
    useState<EquipmentFormType>(DEFAULT_EQUIPMENT)
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
    if (equipment?.cep?.length === 8) {
      setisLoading(true)
      fetch(`https://viacep.com.br/ws/${equipment.cep}/json/`)
        .then(async response => {
          const json = await response.json()
          setEquipment({
            ...equipment,
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
  }, [equipment.cep])

  useLayoutEffect(() => {
    if (userPrismaData?.id) {
      setEquipment({
        ...equipment,
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

  async function handleSubmit() {
    const photos = await Promise.all(
      newFiles.map(async element => {
        return await saveInFirebase(user.email, element.id, element.file)
      })
    )

    if (photos.length) {
      setisLoading(true)
      fetch(`/api/equipment/create `, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          equipment: equipment,
          photos: photos
        })
      }).then(async result => {
        if (result.status === 200) {
          const revalidate =
            await fetch(`${getBaseUrl()}/api/revalidate?secret=${
              process.env.NEXT_PUBLIC_MY_SECRET_TOKEN
            }&path=/}
            `)
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
          <span>Sobre seu Equipamento</span>
        </SellFormStepTitle>
        <SellInput
          showError={showError}
          type="text"
          label="Qual o tipo do Equipamento?"
          name="type"
          value={equipment}
          changeValue={setEquipment}
        />
        <SellInput
          showError={showError}
          type="text"
          label="Qual a Marca?"
          name="brand"
          value={equipment}
          changeValue={setEquipment}
        />
        <SellInput
          showError={showError}
          type="text"
          label="Qual o Modelo?"
          name="model"
          value={equipment}
          changeValue={setEquipment}
        />
      </div>
      <div className={`steps ${step === 1 && 'active'}`}>
        <SellFormStepTitle>
          <span>Sobre seu Equipamento</span>
        </SellFormStepTitle>
        <SellInput
          showError={showError}
          type="number"
          customProps={{ inputmode: 'numeric', pattern: '[0-9]*' }}
          label="Qual o Valor?"
          name="price"
          value={equipment}
          changeValue={setEquipment}
        />
        <label className="textarea-label">Descrição</label>
        <textarea
          className="textarea-input"
          placeholder="Conte detalhes do seu equipamento"
          onChange={event =>
            setEquipment({ ...equipment, describe: event.target.value })
          }
        />
      </div>
      <div className={`steps ${step === 2 && 'active'}`}>
        <SellFormStepTitle>
          <span>Coloque as melhores fotos do seu equipamento</span>
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
          value={equipment}
          changeValue={setEquipment}
        />
        <SellInput
          showError={showError}
          type="text"
          label="Em que cidade está?"
          name="city"
          value={equipment}
          changeValue={setEquipment}
        />
        <SellInput
          showError={showError}
          type="text"
          label="Em que estado está?"
          name="state"
          value={equipment}
          changeValue={setEquipment}
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
          value={equipment}
          changeValue={setEquipment}
        />
        <SellInput
          showError={showError}
          type="text"
          label="Qual o seu Telefone?"
          name="phone"
          value={equipment}
          changeValue={setEquipment}
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
          <button> Anunciar</button>
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

export default EquipmentForm
