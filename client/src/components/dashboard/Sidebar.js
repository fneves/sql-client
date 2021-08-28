import React from 'react'
import { css } from "@emotion/css";
import { useSelector } from "react-redux"
import Table from "./sidebar/Table"

const sidebarContainer = css`
  padding: 20px 10px;
  min-width: 250px;
  height: 97vh;
  overflow-y: auto;
  background: white;
  border-right: solid 1px lightgray;
  font-size: 12px;
`

const Sidebar = () => {
  const tables = useSelector(state => state.connection.tables)
  const content = tables.map(table => <Table table={table} key={table.name} />)

  return (
    <div className={sidebarContainer}>
      <h3>Tables</h3>
      {content}
    </div>
  )
}

export default Sidebar