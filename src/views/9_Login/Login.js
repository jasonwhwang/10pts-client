import React from 'react'
import './Login.css'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import LoginPage from './LoginSignup/LoginPage'
import Signup from './LoginSignup/Signup'
import Pages from './Pages/Pages'
import ResetPassword from './Password/ResetPassword'
import NewPassword from './Password/NewPassword'

const mapStateToProps = state => ({
  user: state.common.user
})

class Login extends React.Component {
  componentDidMount() {
    if (this.props.user) this.props.history.push("/account")
  }

  render() {
    return (
      <Switch>
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/login/signup' component={Signup} />
        <Route exact path='/login/welcome' component={Pages} />
        <Route exact path='/login/success' component={Pages} />
        <Route exact path='/login/resetpassword' component={ResetPassword} />
        <Route exact path='/login/newpassword' component={NewPassword} />
      </Switch>
    )
  }
}

export default connect(mapStateToProps)(Login)