import Link from 'next/link'
import useAuth from '../../data/hook/useAuth'

interface AvatarUsuarioProps {
}

const AvatarUsuario: React.FC<AvatarUsuarioProps> = () => {
  const { user } = useAuth()
  return (
    <Link href="/profile">
      <img
        src={user?.imagemUrl ?? '/images/avatar.svg'}
        alt="Avatar do Usuário"
        className='avatar'
      />
    </Link>
  )
}

export default AvatarUsuario
