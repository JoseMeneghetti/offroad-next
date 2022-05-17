import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  linkWithCredential
} from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import initFirebase from '../../firebase/config'
import Usuario from '../../typings/firebase/firebase'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import useSWR from 'swr'

type AuthContextProps = {
  user?: Usuario
  loading?: boolean
  register?: (email: string, senha: string) => Promise<void>
  login?: (email: string, senha: string) => Promise<void>
  loginGoogle?: () => Promise<void>
  loginFacebook: () => Promise<void>
  logout?: () => Promise<void>
}

export const AuthContext = createContext<AuthContextProps | null>(null)

async function normalUser(firebaseUser: User): Promise<Usuario> {
  const token = await firebaseUser.getIdToken()
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    nome: firebaseUser.displayName,
    token,
    provedor: firebaseUser.providerId,
    imagemUrl: firebaseUser.photoURL
  }
}

function cookieManager(logado: boolean) {
  if (logado) {
    Cookies.set('offroad-auth', logado.toString(), { expires: 7 })
  } else {
    Cookies.remove('offroad-auth')
  }
}

export const AuthProvider: React.FC<any> = ({ children }) => {
  // init Firebase
  initFirebase()
  const googleProvider = new GoogleAuthProvider()
  const facebookProvider = new FacebookAuthProvider()
  const auth = getAuth()
  const router = useRouter()
  const [user, setUser] = useState<Usuario>()

  const [loading, setLoading] = useState(true)

  async function sessionConfig(userFirebase: User) {
    if (userFirebase?.email) {
      const user = await normalUser(userFirebase)
      setUser(user)
      cookieManager(true)
      setLoading(false)
      return user.email
    } else {
      setUser(null)
      cookieManager(false)
      setLoading(false)
      return false
    }
  }

  function createUser(email: string) {
    try {
      fetch(`/api/user/create `, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email
        })
      })
    } finally {
    }
  }

  async function loginGoogle() {
    try {
      setLoading(true)
      const resp = await signInWithPopup(auth, googleProvider)
      await sessionConfig(resp.user)
      fetch(`/api/user/find/${resp.user.email}`).then(response => {
        if (response.status === 400) {
          createUser(resp.user.email)
        }
      })
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  async function loginFacebook() {
    try {
      setLoading(true)
      await signInWithPopup(auth, facebookProvider).then(async resp => {
        // The signed-in user info.
        const user = resp.user
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // const credential = FacebookAuthProvider.credentialFromResult(resp)
        // const accessToken = credential.accessToken
        console.log(user)
        await sessionConfig(user)

        fetch(`/api/user/find/${user.email}`).then(response => {
          if (response.status === 400) {
            createUser(user.email)
          }
        })
        router.push('/')
      })
    } catch (error) {
      const errorCode = error.code
      const credential = FacebookAuthProvider.credentialFromError(error)

      if (
        credential &&
        errorCode === 'auth/account-exists-with-different-credential'
      ) {
        const result = await signInWithPopup(auth, googleProvider)
        await linkWithCredential(result.user, credential).then(
          async response => {
            await sessionConfig(response.user)
            router.push('/')
          }
        )
      }
    } finally {
      setLoading(false)
    }
  }

  async function login(email: string, senha: string) {
    try {
      setLoading(true)
      const resp = await signInWithEmailAndPassword(auth, email, senha)
      await sessionConfig(resp.user)
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  async function register(email: string, senha: string) {
    try {
      setLoading(true)
      const resp = await createUserWithEmailAndPassword(auth, email, senha)
      await sessionConfig(resp.user)
      createUser(email)
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    try {
      setLoading(true)
      await signOut(auth)
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (Cookies.get('offroad-auth')) {
      const cancel = onAuthStateChanged(auth, sessionConfig)
      return () => cancel()
    } else {
      setLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loginGoogle,
        login,
        register,
        logout,
        loading,
        loginFacebook
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
