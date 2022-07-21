import Link from 'next/link'
import { User } from 'phosphor-react'
import useAuth from '../../data/hook/useAuth'

interface AvatarUsuarioProps {}

const AvatarUsuario: React.FC<AvatarUsuarioProps> = () => {
  const { user } = useAuth()
  return (
    <Link href="/profile">
      {user.imagemUrl ? (
        <img src={user?.imagemUrl} alt="Avatar do Usuário" className="avatar" />
      ) : (
        <User size={30} />
      )}
    </Link>
  )
}

export default AvatarUsuario
