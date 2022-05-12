import { Warning } from 'phosphor-react'
import React, { useState } from 'react'
import useAuth from '../../../data/hook/useAuth'
import { ErroContainer, LoginContainer } from '../../../styles/pages/Login'
import AuthInput from '../AuthInput'

const Login: React.FC = ({}) => {
  const [error, setError] = useState(null)
  const [mode, setMode] = useState<'login' | 'cadastro'>('login')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const { login, register, loginGoogle } = useAuth()

  function showError(msg, time = 5) {
    setError(msg)
    setTimeout(() => {
      setError(null)
    }, time * 1000)
  }

  async function handleSubmit() {
    try {
      if (mode === 'login') {
        await login(email, senha)
      } else {
        await register(email, senha)
      }
    } catch (e) {
      console.log(e)
      showError(e?.message ?? 'Erro Desconhecido!')
    }
  }

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

        {error && (
          <ErroContainer>
            <>
              <Warning size={24} />
              <span>{error}</span>
            </>
          </ErroContainer>
        )}

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
