import { Pencil, Phone } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import ForceLoading from '../components/Authentication/ForceLoading'
import ProfileInput from '../components/Profile/ProfileInput'
import useAuth from '../data/hook/useAuth'
import {
  ProfileForm,
  ProfileHeader
} from '../styles/components/Profile/ProfileInput'
import { LoginContainer } from '../styles/pages/Login'
import { useRouter } from 'next/router'

const Profile: React.FC = ({}) => {
  const { logout, user } = useAuth()

  const fetcher = url => fetch(url).then(r => r.json())
  const route = useRouter()

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

  function handleSubmit() {
    fetch(`/api/user/update `, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        profile
      })
    }).then(async result => {
      if (result.status === 200) {
        // setisLoading(false)
        route.push('/profile')
      } else {
        console.log(result)
        // setisLoading(false)
      }
    })
  }

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
          <ProfileForm
            onSubmit={e => {
              e.preventDefault()
              e.stopPropagation()
              handleSubmit()
            }}
          >
            <ProfileHeader>
              <div className="image-container">
                {user?.imagemUrl ? (
                  <img
                    src={user?.imagemUrl}
                    alt="Avatar do Usuário"
                    className="avatar"
                  />
                ) : (
                  <div>{profile?.name && profile?.name[0]?.toUpperCase()}</div>
                )}
              </div>
              <span>{profile?.email}</span>
            </ProfileHeader>
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
            <button type="submit">
              <Pencil size={25} /> Editar
            </button>
          </ProfileForm>
          <button onClick={logout}> SAIR </button>
        </div>
      </LoginContainer>
    </ForceLoading>
  )
}

export default Profile
