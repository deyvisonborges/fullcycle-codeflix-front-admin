import { createGlobalStyle } from 'styled-components'

const ResetStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
  }

  html, body, #root {
    height: 100%;
  }
`
export default ResetStyles
