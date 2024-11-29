import styled from 'styled-components'

export const VideoRoot = styled.div`
  position: relative;
  height: 240px;
  overflow: hidden;
  width: 320px;
`

export const Video = styled.video`
  height: 100%;
  object-fit: cover;
  width: 100%;
`

export const VideoProgress = styled.div<{ progress: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.progress}%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`

export const CloseButton = styled.button`
  background: red;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  height: 20px;
  position: absolute;
  right: 15px;
  top: 10px;
  width: 20px;
`
