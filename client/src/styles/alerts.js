import styled from '@emotion/styled'

export const ErrorAlert = styled.div({
  position: 'fixed',
  display: 'flex',
  justifyContent: 'space-between',
  zIndex:   '3',
  padding: '10px',
  borderRadius: "5px",
  color: 'white',
  background: 'red',
  top: "20px",
  right: "20px"
})

export const DismissButton = styled.button({
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
  height: '20px',
  cursor: 'pointer',
  width: '20px',
  borderRadius: '9999px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: '20px',
  padding: '0px'
})