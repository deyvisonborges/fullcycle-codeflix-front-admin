import { createGlobalStyle } from 'styled-components'

const ResetStyles = createGlobalStyle`
* {
  box-sizing: border-boxs;
  margin: 0;
  padding: 0;
}
html, body {
  font-family: 'Playfair Display', serif;
}
`
export default ResetStyles
