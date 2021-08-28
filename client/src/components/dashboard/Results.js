import React from 'react'
import { css } from '@emotion/css'
import { useSelector } from 'react-redux'

const resultsContainer = css`
  position: relative;
  width: 88%;
  height: 64vh;
  text-align: left;
  overflow: auto;
`

const resultsTableHeader = css({
  background:    "#5EEAD4",
  color:         "black",
  padding:       "4px 10px",
  margin:        "0px",
  fontWeight:    "400",
  fontSize:      "14px",
  border:        "1px solid black",
  paddingBottom:  "20px",
  verticalAlign:  "center"
})

const resultsCell = css({
  border:       "1px solid black",
  width:        "auto",
  minWidth:     "50px",
  fontSize:      "14px"
})

const Results = () => {
  const resultsFields = useSelector(state => state.connection.resultsFields)
  const results = useSelector(state => state.connection.results)
  const headers = resultsFields.map((field, idx) => <th key={`header-${idx}`} className={resultsTableHeader}>{field}</th>)

  const rows    = results.map((row, idx) => {
    const content = resultsFields.map((field, idx) => (<td className={resultsCell} key={`cell-${idx}`}>{row[field]}</td>))
    return (<tr key={`row-${idx}`}>{content}</tr>)
  })

  return (
    <div className={resultsContainer}>
      <table>
        <thead>
          <tr>
            {headers}
          </tr>
        </thead>
        <tbody>
         {rows}
        </tbody>
      </table>
    </div>
  )
}

export default Results
