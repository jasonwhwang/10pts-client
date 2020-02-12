import React from 'react'
import './Other.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'

const mapStateToProps = state => ({
  user: state.common.user
})

class MapFrame extends React.Component {
  state = {
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
  async componentDidMount() {
    this.redirectPath()
    this.setState({ ...this.state, loading: false })
  }

  render() {
    if (this.state.loading) return <LoadingPage />

    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>Map</title>
            <meta name="description" content="Map" />
          </Helmet></HelmetProvider>

          <div className="box-box">Map</div>
          <div className="box-box">Map</div>
          <div className="box-box">Map</div>

        </div>
      </FadeTransition>
    )
  }
}

export default connect(mapStateToProps)(MapFrame)