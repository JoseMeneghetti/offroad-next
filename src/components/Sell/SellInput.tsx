import React from 'react'
import { SellInputContainer } from '../../styles/components/Sell/SellInput'
import { BikeFormType } from './BikeForm'
import { EquipmentFormType } from './EquipmentForm'

type SellInputProps = {
  customProps?: any
  label: string
  type: string
  value: BikeFormType | EquipmentFormType
  name: string
  changeValue: (newValue: any) => void
  showError: (msg: string) => void
}

const SellInput: React.FC<SellInputProps> = ({
  label,
  type,
  value,
  name,
  changeValue,
  showError,
  customProps
}) => {
  return (
    <SellInputContainer>
      <label>{label}</label>
      <input
        onInvalid={() => showError('Preencha todos os campos!')}
        required
        type={type}
        value={value?.[name]}
        onChange={event => {
          changeValue?.({ ...value, [name]: event.target.value })
        }}
        {...customProps}
      />
    </SellInputContainer>
  )
}

export default SellInput
