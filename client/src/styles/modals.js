import { css } from '@emotion/react'

const backdropStyle = css({
  display:        'flex',
  flexDirection:  'column',
  justifyContent: 'center',
  alignItems:     'center',
  height:         '100vh',
  width:          '100%',
  overflow:       'hidden',
  background:     'rgba(36, 24, 23, 0.3)'
})

const modalPanelStyle = css({
  background:   'white',
  padding:      '10px',
  borderRadius: '5px'
})

export { backdropStyle, modalPanelStyle }