import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Field } from "../../styles/inputs"

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
  padding: 20px;
  border-radius: 5px;
  background: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

const connectionInputStyle = css`
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
  width: fill-available;
  textIndent: "5px"
`

const ConnectionSelector = () => {
  const dispatch = useDispatch()
  const status = useSelector((state) => state.connection.status)

  const [host, setHost] = useState('')
  const [port, setPort] = useState('')
  const [database, setDatabase] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleHostChange  = e => setHost(e.target.value.trim())
  const handlePortChange  = e => setPort(e.target.value.trim())
  const handleDatabaseChange  = e => setDatabase(e.target.value.trim())
  const handleUsernameChange  = e => setUsername(e.target.value.trim())
  const handlePasswordChange  = e => setPassword(e.target.value.trim())

  const connectionString = () => {
    const parts = ["postgres://"]
    const authentication = [username, password].filter(item => item && item !== "")

    if (authentication.length > 0) {
      parts.push(authentication.join(":"))
      parts.push("/")
    }
    parts.push(host)

    if(port) {
      parts.push(`:${port}`)
    }

    parts.push("/")
    parts.push(database)

    return parts.join("")
  }

  let value = connectionString()
  console.log(value)

  const handleSubmit  = e => dispatch(initConnection(value))

  return (
    <div className={connectionMenu}>
      <div className={connectionPanel}>
        <Field>
          <label htmlFor="connections-string">
            Host
          </label>
          <input type="string" id="connections-string" value={host} onChange={handleHostChange} className={connectionInputStyle} />
        </Field>

        <Field>
          <label htmlFor="connections-string">
            Port
          </label>
          <input type="string" id="connections-string" value={port} onChange={handlePortChange} className={connectionInputStyle} />
        </Field>

        <Field>
          <label htmlFor="connections-string">
            Database
          </label>
          <input type="string" id="connections-string" value={database} onChange={handleDatabaseChange} className={connectionInputStyle} />
        </Field>
        <Field>
          <label htmlFor="connections-string">
            Username
          </label>
          <input type="string" id="connections-string" value={username} onChange={handleUsernameChange} autocomplete="off" className={connectionInputStyle} />
        </Field>
        <Field>
          <label htmlFor="connections-string">
            Password
          </label>
          <input type="password" id="connections-string" value={password} onChange={handlePasswordChange} autocomplete="off"  className={connectionInputStyle} />
        </Field>

        <input type="submit" onClick={handleSubmit} className="btn primary" value="Connect" disabled={status === "loading"}/>
      </div>
    </div>
  )
}

export default ConnectionSelector
