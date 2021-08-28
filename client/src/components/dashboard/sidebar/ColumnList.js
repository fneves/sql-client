import { css } from "@emotion/css"
import  { useState } from "react"

const columnsHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
`
const listStyle = css({
  marginTop: "0px"
})
const columnStyle = css`
  text-align: left;
`

export const ColumnList = (props) => {
  const [expanded, setExpanded] = useState(false)

  let expandedColumns = ""
  if(expanded) {
    const sortedColumns = [...props.columns].sort((a, b) => a.name.localeCompare(b.name))
    expandedColumns = sortedColumns.map(column => <li key={column.name} className={columnStyle}>{column.name} ({column.type})</li>)
  }
  const icon = expanded ? "-" : "+"

  const toggle = () => setExpanded(!expanded)
  return (
    <div>
      <div className={columnsHeader}>
        <h5>Columns</h5>
        <button onClick={toggle}>{icon}</button>
      </div>
      <ul className={listStyle}>
        {expandedColumns}
      </ul>
    </div>
  )
}