import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"

function DynamicComponent(props) {
  if (props.isLoggedIn) {
    return <Dashboard />
  } else {
    return <Login />
  }
}

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }

    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/api');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {
    return (
      <div className="App">
        <DynamicComponent isLoggedIn={false}/>
      </div>
    );
  }
}

export default App;