import { Component } from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({ username: event.target.value })
  }

  onChangePassword = event => {
    this.setState({ password: event.target.value })
  }

  onSubmitSuccess = jwtToken => {
    // Save the JWT token in cookies
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
  }

  onSubmitFailure = errorMsg => {
    this.setState({ showSubmitError: true, errorMsg })
  }

  submitForm = async event => {
    event.preventDefault()
    const { username, password } = this.state

    // Dummy credentials
    const dummyUsername = 'admin@123'
    const dummyPassword = 'admin@123'

    if (username === dummyUsername && password === dummyPassword) {
      // Simulate a successful login with a dummy JWT token
      const jwtToken = 'dummy-jwt-token'
      this.onSubmitSuccess(jwtToken)
    } else {
      this.onSubmitFailure('Invalid username or password')
    }
  }

  renderPasswordField = () => {
    const { password } = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const { username } = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  render() {
    const { showSubmitError, errorMsg } = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Navigate to="/" />
    }

    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
