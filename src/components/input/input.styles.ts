import styled from 'styled-components'

export const Input = styled.input`
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 4px;
  color: ${({ theme }) => theme.primary.main};
  font-size: 14px;
  padding: 8px 12px;
  width: 100%;
`
