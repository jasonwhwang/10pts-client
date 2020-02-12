import React from 'react'
import './Account.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'

const mapStateToProps = state => ({
  user: state.common.user
})

class Account extends React.Component {
  state = {
    data: null,
    loading: true
  }
  redirectPath = () => {
    let path = this.props.match.params.path
    let notValid = path && path !== "search" && path !== "saved" && path !== "account"
    if(notValid) {
      let redirectUrl = this.props.location.pathname.replace(`/${path}`, '')
      this.props.history.push(redirectUrl)
    }
  }

  initializeState = async () => {
    if(this.props.location.pathname === "/account" && !this.props.user) {
      this.setState({ data: null, loading: false })
      return
    }
    
    this.setState({ data: null, loading: true })
    // Get User Account
    this.setState({ data: {}, loading: false })
  }

  componentDidMount() {
    this.redirectPath()
    this.initializeState()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) this.initializeState()
  }

  render() {
    if (this.state.loading) return <LoadingPage />

    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>Account</title>
            <meta name="description" content="Account" />
          </Helmet></HelmetProvider>

          <div className="box-box">Account</div>
          <div className="box-box">Account</div>
          <div className="box-box">Account</div>

        </div>
      </FadeTransition>
    )
  }
}

export default connect(mapStateToProps)(Account)