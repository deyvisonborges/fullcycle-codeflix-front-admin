import styled from 'styled-components'

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  transition: 0.5s;
  width: 100%;
`

export const Input = styled.input`
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 4px;
  color: ${({ theme }) => theme.primary.main};
  font-size: 14px;
  padding: 8px 12px;
  width: 100%;

  &[type='checkbox'] {
    height: 16px;
    width: 16px;
  }
`

export const Label = styled.label`
  font-size: 14px;
`
