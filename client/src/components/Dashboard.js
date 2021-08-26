import React from 'react'
import Sidebar from './dashboard/Sidebar'
import Query from './dashboard/Query'
import Results from './dashboard/Results'
import ConnectionSelector from './dashboard/ConnectionSelector'
import { css } from "@emotion/css";
import { useSelector } from "react-redux"

const mainLayout = css`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`

const panel = css`
  width: 100%;
  height: 100%;
`

const Dashboard = () => {
  const isConnected = useSelector((state) => state.connection.isConnected)

  return (
    <div className={mainLayout}>
      <Sidebar />
      <div className={panel}>
        <Query />
        <Results />
        { !isConnected && <ConnectionSelector /> }
      </div>
    </div>
  )
}

export default Dashboard