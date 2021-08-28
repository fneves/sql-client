import React from 'react';

import './App.css';
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import { ErrorAlert, DismissButton } from './styles/alerts'
import { clearErrors } from './features/connectionSlice'
import { useDispatch, useSelector } from 'react-redux'

function DynamicComponent(props) {
  if (props.isLoggedIn) {
    return <Dashboard />
  } else {
    return <Login />
  }
}

const App = () => {
  const dispatch = useDispatch()
  const dismissErrors = e => dispatch(clearErrors())
  const connectionError = useSelector((state) => state.connection.error)

  let errors = ""
  if(connectionError) {
    errors =(<ErrorAlert>{connectionError} <DismissButton onClick={dismissErrors}>x</DismissButton></ErrorAlert>)
  }

  return (
    <div className="App">
      {errors}
      <DynamicComponent isLoggedIn={true}/>
    </div>
  );
}

export default App;