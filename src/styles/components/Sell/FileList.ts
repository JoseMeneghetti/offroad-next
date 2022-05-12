import styled from 'styled-components'

interface PreviewProps {
  src: string
}

export const FileListContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const FileInfo = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  span {
    font-size: 12px;
    color: #f2f2f2;
    margin-top: 5px;
  }
  svg {
    cursor: pointer;
  }
`
export const Preview = styled.div<PreviewProps>`
  width: 50px;
  height: 50px;
  border-radius: 0.5rem;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  margin-right: 10px;
`
