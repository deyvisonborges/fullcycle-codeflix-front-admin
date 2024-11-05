import styled from 'styled-components'
import { css } from 'styled-components'

export const Button = styled.button`
  ${({ theme }) => css`
    ${theme.secondary.main}
  `}
`
