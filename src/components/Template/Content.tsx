import React from 'react'
import { ContentContainer } from '../../styles/components/Template/Content'

type ContentProps = {
  children?: any
}

const Titulo: React.FC<ContentProps> = ({ children }) => {
  return <ContentContainer>{children}</ContentContainer>
}

export default Titulo
