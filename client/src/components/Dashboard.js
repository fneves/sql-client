import React from 'react'
import Sidebar from './dashboard/Sidebar'
import Query from './dashboard/Query'
import Results from './dashboard/Results'

class Dashboard extends React.Component {
  render(){
    return (
      <div>
        <Sidebar>
        </Sidebar>
        <div>
          <Query></Query>
          <Results></Results>
        </div>
      </div>
    )
  }
}

export default Dashboard