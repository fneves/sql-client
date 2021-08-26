import { css } from "@emotion/css"
import  { useState } from "react"
import { ColumnList } from "./ColumnList"

export const Table = (props) => {
  const [selected, setSelected] = useState(false)

  const color = selected ? 'gray' : 'lightgray'

  const tableStyles = css`
   background: ${color};
   color:  black;
   padding: 5px;
   display: flex;
   justify-content: space-between;
  `

  let expandedContent = ""
  if(selected) {
    expandedContent = (<ColumnList columns={props.table.columns} />)
  }

  const icon = selected ? "-" : "+"

  const toggle = () => setSelected(!selected)
  return (
    <div>
      <div className={tableStyles}>
        {props.table.name}
        <button onClick={toggle}>{icon}</button>
      </div>
      {expandedContent }
    </div>
  )
}

export default Table