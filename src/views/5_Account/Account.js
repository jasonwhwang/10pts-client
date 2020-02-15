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
    // if(!this.props.user) this.props.history.push("/login")
    this.initializeState()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) this.initializeState()
  }

  render() {
    if (this.state.loading) return <LoadingPage />

    // let params = this.props.match.params
    // let linkUsername = params.username ? params.username : this.props.user.username
    // let route = params.route ? `/${params.route}` : ""
    // let cLink = `${process.env.REACT_APP_url_LINK}/a/${linkUsername}${route}`
    let cLink = `${process.env.REACT_APP_url_LINK}/account`

    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>Account</title>
            <meta name="description" content="Account" />
            <link rel="canonical" href={cLink} />
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