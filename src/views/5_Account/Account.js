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
    loading: true
  }
  async componentDidMount() {
    this.setState({ ...this.state, loading: false })
  }

  render() {
    if (this.state.loading) return <LoadingPage />

    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>New</title>
            <meta name="description" content="New" />
          </Helmet></HelmetProvider>

          <div className="test">Account</div>
          <div className="test">Account</div>
          <div className="test">Account</div>

        </div>
      </FadeTransition>
    )
  }
}

export default connect(mapStateToProps)(Account)