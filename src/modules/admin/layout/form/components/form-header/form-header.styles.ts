import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`

export const IconContainer = styled.i`
  align-items: center;
  border: 1px solid #c3c3c3;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 8px;
`

export const LeftCorner = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;

  & > svg {
    height: 24px;
    width: 24px;
  }
`

export const LeftCornerHeading = styled.h2`
  color: #414141;
  font-size: 24px;
  font-weight: 600;
`
