import React from 'react'
import { TitleContainer } from '../../styles/components/Template/Title'

type TitleProps = {
  titulo: string
  subtitulo: string
}

const Title: React.FC<TitleProps> = ({ titulo, subtitulo }) => {
  return (
    <TitleContainer>
      <h1>{titulo}</h1>
      <h2>{subtitulo}</h2>
    </TitleContainer>
  )
}

export default Title
