import { ForceLoadingContainer } from '../../styles/components/Authentication/ForceLoading'
import loading from '../../../public/images/loading.gif'
import Image from 'next/image'
import useAuth from '../../data/hook/useAuth'
import { useRouter } from 'next/router'

interface ForceLoadingProps {
  children: any
}

const ForceLoading: React.FC<ForceLoadingProps> = ({ children }) => {
  const { user, loading: loadingState } = useAuth()
  const route = useRouter()

  function renderContent() {
    return <>{children}</>
  }

  function renderLoading() {
    return (
      <ForceLoadingContainer>
        <Image src={loading} />
      </ForceLoadingContainer>
    )
  }

  if (!loadingState && user?.email) {
    return renderContent()
  } else if (loadingState) {
    renderLoading()
  } else {
    route.push('/login')
  }
}

export default ForceLoading
