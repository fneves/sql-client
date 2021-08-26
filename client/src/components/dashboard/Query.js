import React from 'react'
import { css } from '@emotion/css'

const queryContainer = css`
  padding: 20px 10px;
  min-height: 20%;
  max-height: 50%;
  width: 100%;
  overflow-y: auto;
  background: yellow;
`

class Query extends React.Component {
  render(){
    return (
      <div className={queryContainer}>
       Query aread
      </div>
    )
  }
}

export default Query
