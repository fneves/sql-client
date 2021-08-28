import React from 'react'
import { css } from '@emotion/css'
import Editor from "@monaco-editor/react";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { executeQuery } from '../../features/connectionSlice'

const queryContainer = css`
  min-height: 20%;
  max-height: 50%;
  width: 100%;
  overflow-y: auto;
  background: white;
  border: 1px solid lightgray;
`

const toolbar = css`
  background: lightgray;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 50px;
`

export const Query = () => {
  const tables = useSelector((state) => state.connection.tables)
  const connection = useSelector((state) => state.connection.connectionId)
  const defaultQuery = `select * from ${tables[0].name} limit 10;`
  const [query, setQuery] = useState(defaultQuery)

  const dispatch = useDispatch()
  const handleEditorChange = (value, _event) => setQuery(value)
  const runQuery = () => dispatch(executeQuery({ connection: connection, query: query }))

  return (
    <div className={queryContainer}>
      <div className={toolbar}>
        <button onClick={runQuery}>Run query</button>
      </div>
      <Editor
        height="30vh"
        defaultLanguage="sql"
        defaultValue={defaultQuery}
        onChange={handleEditorChange}
      />
    </div>
  )
}

export default Query
