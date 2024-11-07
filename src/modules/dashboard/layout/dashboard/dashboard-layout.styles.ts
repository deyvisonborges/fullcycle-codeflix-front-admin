import styled from 'styled-components'

export const Container = styled.div`
  background-color: #f6f6f7;
  display: flex;
  height: 100%;
  position: relative;
  width: 100%;
`

export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 24px;
  width: 100%;

  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`
