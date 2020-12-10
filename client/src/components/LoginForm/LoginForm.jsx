import React from 'react'
import InputField from './InputField'
import SubmitButton from './SubmitButton'
import UserStore from './Stores/UserStore'
import './LoginForm.css'
import { withRouter } from 'react-router-dom'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      buttonDisable: false,
    }
  }

  goToRestaurants() {
    this.props.history.push('/restaurants')
  }

  setInputValue(property, val) {
    val = val.trim()
    if (val.length > 12) {
      return
    }

    this.setState({
      [property]: val,
    })
  }

  resetForm() {
    this.setState({
      username: '',
      password: '',
      buttonDisable: false,
    })
  }

  async doLogin() {
    if (!this.state.username) {
      return
    }
    if (!this.state.password) {
      return
    }
    this.setState({
      buttonDisable: true,
    })
    try {
      let res = await fetch('/login', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      })

      let result = await res.json()
      if (result && result.success) {
        UserStore.isLoggedIn = true
        UserStore.username = result.username
      } else if (result && result.success === false) {
        this.resetForm()
        alert(result.msg)
      }
    } catch (e) {
      console.log(e)
      this.resetForm()
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="loginFrom">
            <div className="title-login">Happy Times Login</div>

            <InputField
              type="text"
              placeholder="Username"
              value={this.state.username ? this.state.username : ''}
              onChange={(val) => this.setInputValue('username', val)}
            />
            <InputField
              type="password"
              placeholder="Password"
              value={this.state.password ? this.state.password : ''}
              onChange={(val) => this.setInputValue('password', val)}
            />
            <SubmitButton
              text="Login"
              disable={this.state.buttonDisable}
              onClick={() => this.doLogin()}
            />
          </div>
        </div>
        <div className="col-lg-6 col-md-12" id="guestbutton">
          <SubmitButton
            text="Enter as a Guest"
            disable={this.state.buttonDisable}
            onClick={() => this.goToRestaurants()}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(LoginForm)
