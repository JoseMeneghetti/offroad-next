import React, { useState } from 'react'
import { PicturesContainer } from '../../../styles/components/Sell/Pictures'
import MyDropzone from './Dropzone'
import FileList from './FileList'
import _ from 'lodash'
import filesize from 'filesize'
import { ErroContainer } from '../../../styles/pages/Login'
import { Warning } from 'phosphor-react'

interface PicturesProps {
  setNewFiles: (newFiles) => void
  newFiles: any
}

const Pictures: React.FC<PicturesProps> = ({ setNewFiles, newFiles }) => {
  const [error, setError] = useState(null)

  function handleUpload(files: any) {
    const uploadedFiles = files.map(file => ({
      file,
      id: _.uniqueId(`${new Date().toJSON()}`),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file)
    }))

    setNewFiles(newFiles => [...newFiles, ...uploadedFiles])
  }

  function handleDelete(id: string) {
    const array = newFiles
    const result = array.filter(function (ele) {
      return ele.id != id
    })
    setNewFiles(result)
  }

  console.log('=>', newFiles)

  return (
    <PicturesContainer>
      {error && (
        <ErroContainer>
          <>
            <Warning size={24} />
            <span>{error}</span>
          </>
        </ErroContainer>
      )}
      <MyDropzone handleUpload={handleUpload} setError={setError} />
      {newFiles?.length ? (
        <FileList files={newFiles} handleDelete={handleDelete} />
      ) : (
        <></>
      )}
    </PicturesContainer>
  )
}

export default Pictures
