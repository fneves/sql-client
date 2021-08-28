import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { css } from '@emotion/css'
import { useSelector } from 'react-redux'
import { initConnection } from '../../features/connectionSlice'


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
  min-width: 400px;
  padding: 10px;
  border-radius: 5px;
  background: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

const connectionInputStyle = css({
  width: "100%",
  width: "-moz-available",
  width: "-webkit-fill-available",
  width: "fill-available",
  textIndent: "5px"
})

const ConnectionSelector = () => {
  const dispatch = useDispatch()
  const connectionString = useSelector((state) => state.connection.value)
  const status = useSelector((state) => state.connection.status)

  const [connection, setConnection] = useState(connectionString || '')

  const handleChange  = e => setConnection(e.target.value.trim())
  const handleSubmit  = e => dispatch(initConnection(connection))

  return (
    <div className={connectionMenu}>
      <div className={connectionPanel}>
        <div className="field">
          <label htmlFor="connections-string">
            Postgres connection string
          </label>
          <input type="string" id="connections-string" value={connection} onChange={handleChange} placeholder="postgres://localhost/my-local-db" className={connectionInputStyle} />
        </div>
        <input type="submit" onClick={handleSubmit} className="btn primary" value="Connect" disabled={status === "loading"}/>
      </div>
    </div>
  )
}

export default ConnectionSelector
