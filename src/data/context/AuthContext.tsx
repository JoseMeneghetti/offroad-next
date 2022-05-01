import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signOut
} from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import initFirebase from '../../firebase/config'
import Usuario from '../../typings/firebase/firebase'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { authUrl } from 'vtex'

type AuthContextProps = {
  user?: Usuario
  loading?: boolean
  register?: (email: string, senha: string) => Promise<void>
  login?: (email: string, senha: string) => Promise<void>
  loginGoogle?: () => Promise<void>
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
  const provider = new GoogleAuthProvider()
  const auth = getAuth()
  const router = useRouter()
  const [user, setUser] = useState<Usuario>()

  const [Loading, setLoading] = useState(true)

  async function sessionConfig(userFirebase: User) {
    console.log('userFirebase', userFirebase)
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

  async function loginGoogle() {
    try {
      setLoading(true)
      const resp = await signInWithPopup(auth, provider)
      sessionConfig(resp.user)
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
    if (Cookies.get('admin-template-cod3r-auth')) {
      const cancel = onAuthStateChanged(auth, sessionConfig)
      return () => cancel()
    } else {
      setLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loginGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
