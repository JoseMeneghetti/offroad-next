import React from 'react'
import { ProfileInputContainer } from '../../styles/components/Profile/ProfileInput'


type ProfileInputProps = {
  customProps?: any
  label: string
  type: string
  value: any
  name: string
  changeValue: (newValue: any) => void
  showError?: (msg: string) => void
  required?: boolean,
  disabled?: boolean
}

const ProfileInput: React.FC<ProfileInputProps> = ({
  label,
  type,
  value,
  name,
  changeValue,
  showError,
  customProps,
  required,
  disabled
}) => {
  return (
    <ProfileInputContainer>
      <label>{label}</label>
      <input
        onInvalid={() => showError && showError('Preencha todos os campos!')}
        required={required ? true : false}
        disabled={disabled ? true : false}
        type={type}
        value={value?.[name]}
        onChange={event => {
          changeValue?.({ ...value, [name]: event.target.value })
        }}
        {...customProps}
      />
    </ProfileInputContainer>
  )
}

export default ProfileInput
