import React from 'react'
import {
  FileInfo,
  FileListContainer,
  Preview
} from '../../../styles/components/Sell/FileList'
import { Trash } from 'phosphor-react'

interface FileListProps {
  files: any
  handleDelete: (id: string) => void
}

const FileList: React.FC<FileListProps> = ({ files, handleDelete }) => {
  return (
    <FileListContainer>
      {files.map(file => (
        <FileInfo key={file.id}>
          <Preview src={file.preview}>
            <Trash
              size={24}
              color={'#000'}
              onClick={() => handleDelete(file.id)}
            />
          </Preview>
          <span>{file.readableSize}</span>
        </FileInfo>
      ))}
    </FileListContainer>
  )
}

export default FileList
