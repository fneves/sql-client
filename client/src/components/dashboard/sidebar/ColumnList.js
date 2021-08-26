import { css } from "@emotion/css"
import  { useState } from "react"

const columnsHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ColumnList = (props) => {
  const [expanded, setExpanded] = useState(false)

  let expandedColumns = ""
  if(expanded) {
    expandedColumns = props.columns.map(column => <li key={column.name}>{column.name} ({column.type})</li>)
  }
  const icon = expanded ? "-" : "+"

  const toggle = () => setExpanded(!expanded)
  return (
    <div>
      <div className={columnsHeader}>
        <h5>Columns</h5>
        <button onClick={toggle}>{icon}</button>
      </div>

      {expandedColumns}
    </div>
  )
}