import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Test } from './components/test'
import styled, { css } from 'styled-components'
import { useTheme } from './styles/theme/useTheme'

const Container = styled.div`
  ${({ theme }) => css`
    background-color: ${theme?.background?.default};
  `}
`

function App() {
  const [count] = useState(0)
  const { theme, changeTheme } = useTheme()

  return (
    <Container id="OKOKOK">
      <Test />
      <div>
        <a href="httpps://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => changeTheme('light')}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs" onClick={() => changeTheme('dark')}>
        theme: {theme?.primary?.main}
      </p>
    </Container>
  )
}

export default App
