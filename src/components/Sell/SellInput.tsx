import React from 'react'
import { SellInputContainer } from '../../styles/components/Sell/SellInput'
import { BikeFormType } from './BikeForm'

type SellInputProps = {
  label: string
  type: string
  value: BikeFormType
  name: string
  changeValue: (newValue: any) => void
}

const SellInput: React.FC<SellInputProps> = ({
  label,
  type,
  value,
  name,
  changeValue
}) => {
  return (
    <SellInputContainer>
      <label>{label}</label>
      <input
        required
        type={type}
        value={value?.[name]}
        onChange={event => {
          changeValue?.({ ...value, [name]: event.target.value })
        }}
      />
    </SellInputContainer>
  )
}

export default SellInput
