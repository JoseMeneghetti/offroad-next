import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Resizer from 'react-image-file-resizer'

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
      if (element.size > 1000000) {
        try {
          Resizer.imageFileResizer(
            element,
            1000,
            1000,
            'JPEG',
            100,
            0,
            uri => {
              console.log(uri)
              handleUpload([uri])
            },
            'file',
            200,
            200
          )
        } catch (err) {
          showError(`${err} / Problema com as Fotos.`)
          console.log(err)
        } 
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
