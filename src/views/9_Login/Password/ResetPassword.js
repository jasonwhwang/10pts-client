import React from 'react'
import { Link } from 'react-router-dom'
import FadeTransition from '../../0_Components/7_FadeTransition/FadeTransition'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { forgotPassword } from '../../../services/authApi'
import '../Login.css'
import LoadingPage from '../../0_Components/4_Loading/LoadingPage'

class ResetPassword extends React.Component {
  state = {
    email: "",
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
    response = await forgotPassword(this.state.email)
    if (response.error) {
      this.setState({ ...this.state, error: response.error, loading: false })
    } else {
      this.props.history.push("/login/newpassword")
    }
  }

  render() {
    if (this.state.loading) return <LoadingPage />

    return (
      <FadeTransition>
        <div className="page box-flex-row-center box-background">
          <HelmetProvider><Helmet>
            <title>Reset Password</title>
            <meta name="description" content="Reset Password" />
          </Helmet></HelmetProvider>

            <form onSubmit={this.submitForm} className="box-flex-col login box-flex-1">
              <h2 className="box-margin-bottom-30">Reset Password</h2>

              <h6 className="box-text-5 box-text-nobold box-margin-bottom-20">Enter your email address. We'll send you a password verification code.</h6>
              {
                this.state.error !== "" &&
                <h6 className="box-text-8 box-color-red box-text-nobold">{this.state.error}</h6>
              }

              <input value={this.state.email}
                type="email"
                id="email"
                placeholder="Email"
                autoComplete="username"
                className="box-input box-text-5 box-margin-top-10 box-margin-bottom-20"
                onChange={this.changeInputState} />

              <div className="box-flex-between box-flex-acenter box-margin-top-20">
                <button className="box-button">Submit</button>
                <Link to="/login/newpassword" className="box-text-7">Have the code?</Link>
              </div>
            </form>
          </div>
      </FadeTransition>
    )
  }
}

export default ResetPassword