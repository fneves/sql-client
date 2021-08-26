import React from 'react'
import { backdropStyle, modalPanelStyle } from "../styles/modals";

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({...this.state, email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({...this.state, password: event.target.value});
  }

  handleSubmit(event) {
    alert('A login request was submitted: ' + this.state.email + ' ' + this.state.password);
    event.preventDefault();
  }

  render() {
    return (
      <div css={backdropStyle}>
        <div css={modalPanelStyle}>
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <label>
                Email:
                <input type="email" value={this.state.email} onChange={this.handleEmailChange} />
              </label>

              <label>
                Password:
                <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
              </label>
            </fieldset>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Login