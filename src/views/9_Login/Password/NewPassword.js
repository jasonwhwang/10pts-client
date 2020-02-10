import React from 'react'
import { Link } from 'react-router-dom'
import FadeTransition from '../../0_Components/10_FadeTransition/FadeTransition'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { forgotPasswordVerify } from '../../../services/authApi'
import '../Login.css'
import LoadingPage from '../../0_Components/4_Loading/LoadingPage'

class NewPassword extends React.Component {
  state = {
    "code": "",
    "email": "",
    "password": "",
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
    let response = null
    response = await forgotPasswordVerify(this.state.email, this.state.code, this.state.password)
    if (response && response.error) {
      this.setState({ ...this.state, error: response.error, loading: false })
    } else {
      this.props.history.push("/success")
    }
  }

  render() {
    if (this.state.loading) return <LoadingPage medium={true} />

    return (
      <FadeTransition>
        <div className="page-wrapper">
          <HelmetProvider><Helmet>
            <title>New Password</title>
            <meta name="description" content="New Password" />
          </Helmet></HelmetProvider>

          <div className="login box-flex-row box-flex-acenter">
            <form onSubmit={this.submitForm} className="login-marginBottom100">
              <h2 className="box-margin-bottom-30">New Password</h2>

              {
                this.state.error !== "" &&
                <h6 className="box-text-8 box-color-red box-text-nobold">{this.state.error}</h6>
              }

              <input value={this.state.code}
                type="number"
                id="code"
                placeholder="Verification Code"
                className="box-input box-text-5 box-margin-top-10 box-margin-bottom-20"
                onChange={this.changeInputState} />

              <input value={this.state.email}
                type="email"
                id="email"
                placeholder="Email"
                autoComplete="username"
                className="box-input box-text-5 box-margin-bottom-20"
                onChange={this.changeInputState} />

              <input value={this.state.password}
                type="password"
                id="password"
                placeholder="Password"
                autoComplete="current-password"
                className="box-input box-text-5 box-margin-bottom-20"
                onChange={this.changeInputState} />

              <div className="box-flex-between box-flex-acenter box-margin-top-20">
                <button className="box-button">Submit</button>
                <Link to="/resetpassword">Missing the code?</Link>
              </div>
            </form>
          </div>
        </div>
      </FadeTransition>
    )
  }
}

export default NewPassword