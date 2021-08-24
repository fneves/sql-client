import React from 'react'
import { backdropStyle, modalPanelStyle } from "../styles/modals";

class Login extends React.Component {
  render() {
    return (
      <div css={backdropStyle}>
        <div css={modalPanelStyle}>
            Hello Login Panel
        </div>
      </div>
    );
  }
}

export default Login