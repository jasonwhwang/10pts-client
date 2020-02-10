import React from 'react'
import './Login.css'
import { connect } from 'react-redux'
import LoginPage from './LoginSignup/LoginPage'
import Signup from './LoginSignup/Signup'
import Pages from './Pages/Pages'
import ResetPassword from './Password/ResetPassword'
import NewPassword from './Password/NewPassword'

const mapStateToProps = state => ({
  authUser: state.common.authUser
})

class Login extends React.Component {
  componentDidMount() {
    if(this.props.authUser) this.props.history.push("/account")
  }
  
  render() {
    let pathname = this.props.location.pathname
    return (
      <div className="page" id="home">
        {pathname === "/login" && <LoginPage location={this.props.location} history={this.props.history}/>}
        {pathname === "/signup" && <Signup location={this.props.location} history={this.props.history}/>}
        {pathname === "/welcome" || pathname === "/success" ? <Pages location={this.props.location} history={this.props.history}/>:null}
        {pathname === "/resetpassword" && <ResetPassword location={this.props.location} history={this.props.history}/>}
        {pathname === "/newpassword" && <NewPassword location={this.props.location} history={this.props.history}/>}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Login)