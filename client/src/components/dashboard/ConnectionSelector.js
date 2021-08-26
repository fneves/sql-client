import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { css } from '@emotion/css'
import { useSelector } from 'react-redux'
import { initConnection, clearErrors } from '../../features/connectionSlice'
import { ErrorAlert, DismissButton } from '../../styles/alerts'

const connectionMenu = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items:center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.75);
`

const connectionPanel = css`
  text-align: left;
  min-width: 300px;
  padding: 10px;
  border-radius: 5px;
  background: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

const ConnectionSelector = () => {
  const dispatch = useDispatch()
  const connectionString = useSelector((state) => state.connection.value)
  const status = useSelector((state) => state.connection.status)
  const connectionError = useSelector((state) => state.connection.error)

  const [connection, setConnection] = useState(connectionString || '')

  const handleChange  = e => setConnection(e.target.value.trim())
  const handleSubmit  = e => dispatch(initConnection(connection))
  const dismissErrors = e => dispatch(clearErrors())

  let errors = ""
  if(connectionError) {
    errors =(<ErrorAlert>{connectionError} <DismissButton onClick={dismissErrors}>x</DismissButton></ErrorAlert>)
  }

  return (
    <div className={connectionMenu}>
      {errors}
      <div className={connectionPanel}>
        <div className="field">
          <label htmlFor="connections-string">
            Postgres connection string
          </label>
          <input type="string" id="connections-string" value={connection} onChange={handleChange} />
        </div>
        <input type="submit" onClick={handleSubmit} className="btn primary" value="Connect" disabled={status === "loading"}/>
      </div>
    </div>
  )
}

export default ConnectionSelector
