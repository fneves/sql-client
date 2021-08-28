import { css } from "@emotion/css"
import  { useState } from "react"
import { ColumnList } from "./ColumnList"

export const Table = (props) => {
  const [selected, setSelected] = useState(false)

  const color = selected ? '#0D9488' : '#5EEAD4'
  const textColor = selected ? 'white' : 'black'
  const tableStyles = css`
   background: ${color};
   color:  ${textColor};
   padding: 5px;
   display: flex;
   justify-content: space-between;
   margin-top: 1px;
   margin-bottom: 1px;
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