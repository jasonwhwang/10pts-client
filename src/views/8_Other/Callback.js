import React from 'react'
import './Other.css'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { connect } from 'react-redux'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import Loading from '../0_Components/4_Loading/Loading'
import ErrorBoundary from '../0_Components/3_ErrorBoundary/ErrorBoundary'
import { Hub } from 'aws-amplify'
import { getData } from '../../services/api'

const mapDispatchToProps = dispatch => ({
  changeVal: (type, val) =>
    dispatch({ type, val })
})

class Callback extends React.Component {
  state = { error: '' }
  componentDidMount() {
    document.getElementById('navBar').classList.add('navBar-hide')
    document.getElementById('TabBar').classList.add('tabBar-hide')
    Hub.listen('auth', this.listener)
  }
  componentWillUnmount() {
    document.getElementById('navBar').classList.remove('navBar-hide')
    document.getElementById('TabBar').classList.remove('tabBar-hide')
    Hub.remove('auth', this.listener)
  }
  listener = (data) => {
    if (data.payload.event === 'signIn') this.getUser()
  }
  getUser = async () => {
    let res = await getData('/user')
    if (res.error) {
      this.setState({ ...this.state, error: 'Server error, please log in at another time.' })
    } else {
      await this.props.changeVal('user', res.user)
      this.props.history.push('/account')
    }
  }

  render() {
    return (
      <FadeTransition>
        <div className="page box-flex-col">
          <HelmetProvider><Helmet>
            <title>Log In</title>
            <meta name="description" content="Log In" />
          </Helmet></HelmetProvider>
          <ErrorBoundary>

            {this.state.error ?
              <div className="map-loading box-flex-row-center">
                <h6>{this.state.error}</h6>
              </div>
              :
              <div className="map-loading box-flex-row-center">
                <Loading />
              </div>
            }

          </ErrorBoundary>
        </div>
      </FadeTransition>
    )
  }
}

export default connect(null, mapDispatchToProps)(Callback)