import React from 'react'
import { Link } from 'react-router-dom'
import FadeTransition from '../../0_Components/7_FadeTransition/FadeTransition'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { logIn } from '../../../services/authApi'
import '../Login.css'
import LoadingPage from '../../0_Components/4_Loading/LoadingPage'
// import { getLogIn } from '../../../services/api'

const mapDispatchToProps = dispatch => ({
  changeUser: (user) =>
    dispatch({ type: "USER", user })
});

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    error: "",
    loading: false
  }

  changeInputState = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  }

  submitForm = async (e) => {
    e.preventDefault()
    if (this.state.email === "" || this.state.password === "") {
      this.setState({ ...this.state, error: "Missing required fields." })
      return
    }

    this.setState({ ...this.state, loading: true })
    let response = await logIn(this.state.email, this.state.password)
    if (response.error) {
      this.setState({ ...this.state, error: response.error, loading: false })
      return
    }
    // Get User Profile
    // response = await getLogIn()
    // if (response.error) {
    //   this.setState({ ...this.state, error: response.error, loading: false })
    //   return
    // }
    // this.props.changeUser(response.user) // response.attributes.email
    this.props.changeUser('username')
    this.props.history.push("/")
  }

  render() {
    if (this.state.loading) return <LoadingPage />

    return (
      <FadeTransition>
        <div className="page box-flex-row-center box-background">
          <HelmetProvider><Helmet>
            <title>Log In</title>
            <meta name="description" content="Log In" />
          </Helmet></HelmetProvider>

          <form onSubmit={this.submitForm} className="box-flex-col login box-flex-1">
            <h2 className="box-margin-bottom-30">Log In</h2>

            {
              this.state.error &&
              <h6 className="box-text-8 box-color-red box-text-nobold">{this.state.error}</h6>
            }

            <input value={this.state.email}
              type="email"
              id="email"
              placeholder="Email"
              autoComplete="username"
              className="box-input box-text-5 box-margin-top-10 box-margin-bottom-20"
              onChange={this.changeInputState} />

            <input value={this.state.password}
              type="password"
              id="password"
              placeholder="Password"
              autoComplete="current-password"
              className="box-input box-text-5 box-margin-bottom-20"
              onChange={this.changeInputState} />

            <div className="box-flex-row box-flex-acenter box-margin-top-20">
              <button className="box-button">Log In</button>
              <div className="box-flex-1"></div>
              <Link to="/login/resetpassword" className="box-margin-right-20 box-text-7">Forgot password?</Link>
              <Link to="/login/signup" className="box-text-6">Sign Up</Link>
            </div>
          </form>

        </div>
      </FadeTransition>
    )
  }
}

export default connect(null, mapDispatchToProps)(Login)