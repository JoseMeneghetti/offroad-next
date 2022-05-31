import { Phone } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import ForceLoading from '../components/Authentication/ForceLoading'
import ProfileInput from '../components/Profile/ProfileInput'
import useAuth from '../data/hook/useAuth'
import { ProfileForm } from '../styles/components/Profile/ProfileInput'
import { LoginContainer } from '../styles/pages/Login'

const Profile: React.FC = ({}) => {
  const { logout, user } = useAuth()

  const fetcher = url => fetch(url).then(r => r.json())

  const { data, error } = useSWR(`/api/user/find-all/${user?.email}`, fetcher)

  const [profile, setProfile] = useState({
    id: '',
    email: '',
    name: ' ',
    phone: '',
    cep: '',
    city: '',
    state: ''
  })

  useEffect(() => {
    if (profile?.cep?.length === 8) {
      fetch(`https://viacep.com.br/ws/${profile?.cep}/json/`)
        .then(async response => {
          const json = await response.json()
          setProfile({
            ...profile,
            city: json.localidade,
            state: json.uf
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [profile?.cep])

  useEffect(() => {
    setProfile(data)
  }, [data])

  return (
    <ForceLoading>
      <LoginContainer>
        <div className="imgContainer">
          <img
            src="images/KTM-VOHLAND-Dec21-Cudby-0015_Small.jpg"
            alt="Picture of the author"
          />
        </div>
        <div className="form">
          <ProfileForm>
            <ProfileInput
              /* showError={showError} */
              type="text"
              label="email"
              name="email"
              value={profile}
              changeValue={setProfile}
              disabled
            />
            <ProfileInput
              type="text"
              label="name"
              name="name"
              value={profile}
              changeValue={setProfile}
            />
            <div className="row">
              <ProfileInput
                type="text"
                label="phone"
                name="phone"
                value={profile}
                changeValue={setProfile}
              />
              <ProfileInput
                type="text"
                label="cep"
                name="cep"
                value={profile}
                changeValue={setProfile}
              />
            </div>
            <div className="row">
              <ProfileInput
                type="text"
                label="city"
                name="city"
                value={profile}
                changeValue={setProfile}
              />
              <ProfileInput
                type="text"
                label="state"
                name="state"
                value={profile}
                changeValue={setProfile}
              />
            </div>
          </ProfileForm>
          <button onClick={logout}> SAIR </button>
        </div>
      </LoginContainer>
    </ForceLoading>
  )
}

export default Profile
