import styled from 'styled-components'

export const Container = styled.aside`
  background-color: ${({ theme }) => theme.primary.main};
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  transition: all 0.3s ease-in;
  width: 20vw;
`
