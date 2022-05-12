import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface MyDropzoneProps {
  handleUpload: (files) => void
  setError: (erro) => void
}

const MyDropzone: React.FC<MyDropzoneProps> = ({ handleUpload, setError }) => {
  function showError(msg, time = 5) {
    setError(msg)
    setTimeout(() => {
      setError(null)
    }, time * 1000)
  }

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    acceptedFiles.forEach(element => {
      if (element.size > 1500000) {
        showError('Fotos precisam ter menos de 2MB!')
        throw new Error('Fotos precisam ter menos de 2MB!')
      } else handleUpload([element])
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} className={'dropzone'}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Arraste as fotos aqui!</p>
      ) : (
        <p>Arraste seus arquivos ou clique aqui!</p>
      )}
    </div>
  )
}

export default MyDropzone
