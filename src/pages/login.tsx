import React, { useState } from 'react'
import AuthInput from '../components/Authentication/AuthInput'
import useAuth from '../data/hook/useAuth'
import { LoginContainer } from '../styles/pages/Login'

const Login: React.FC = ({}) => {
  const [mode, setMode] = useState<'login' | 'cadastro'>('login')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  function handleSubmit() {}

  const { user, loginGoogle } = useAuth()
  console.log(user)
  return (
    <LoginContainer>
      <div className="imgContainer">
        <img
          src="images/KTM-VOHLAND-Dec21-Cudby-0015_Small.jpg"
          alt="Picture of the author"
        />
      </div>
      <div className="form">
        <div className="logo">
          <img src="images/My project.png" width={200} height={150}></img>
        </div>
        <h1> {mode === 'login' ? 'Entre com sua Conta' : 'Cadastre-se'} </h1>
        <AuthInput
          label="E-mail"
          type="email"
          value={email}
          changeValue={setEmail}
        />
        <AuthInput
          label="Password"
          type="password"
          value={senha}
          changeValue={setSenha}
        />
        <button onClick={() => handleSubmit()}>
          {mode === 'login' ? 'Entrar' : 'Cadastrar'}
        </button>
        <hr />
        <button className="btnGoogle" onClick={() => loginGoogle()}>
          Entrar com Google
        </button>
        {mode === 'login' ? (
          <p>
            Novo por aqui?
            <a onClick={() => setMode('cadastro')}>
              {' '}
              Crie uma conta gratuitamente
            </a>
          </p>
        ) : (
          <p>
            Já possui conta?
            <a onClick={() => setMode('login')}> Entre Aqui</a>
          </p>
        )}
      </div>
    </LoginContainer>
  )
}

export default Login
