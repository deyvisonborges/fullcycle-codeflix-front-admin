import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: fit-content;
  width: 620px;
`

export const Form = styled.form`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  height: fit-content;
  width: 100%;
`

// --> WIP: Migrate to lib
export const ButtonGroup = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  width: 100%;
`

export const CancelButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.informative.danger};
  color: ${({ theme }) => theme.informative.danger};
  padding: 8px 16px;
  text-align: center;
  max-width: 220px;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.informative.danger}10;
    cursor: pointer;
  }
`

export const SaveButton = styled.button`
  background: ${({ theme }) => theme.primary.main};
  border: none;
  color: #ffffff;
  padding: 8px 16px;
  text-align: center;
  max-width: 220px;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.primary.main};
    filter: brightness(0.9);
    cursor: pointer;
  }
`

// <--
export const Footer = styled.footer`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`
