import React from 'react'
import { AuthInputContainer } from '../../styles/components/Authentication/AuthInput'

type AuthInputProps = {
  label: string
  type: string
  value: any
  changeValue: (newValue: any) => void
}

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  type,
  value,
  changeValue
}) => {
  return (
    <AuthInputContainer>
      <label>{label}</label>
      <input
        required
        type={type}
        value={value}
        onChange={e => changeValue?.(e.target.value)}
      ></input>
    </AuthInputContainer>
  )
}

export default AuthInput
