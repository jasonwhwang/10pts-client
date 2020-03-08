import React from 'react'
import './Account.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import ErrorBoundary from '../0_Components/3_ErrorBoundary/ErrorBoundary'
import SettingsAccount from './SettingsAccount'
import SettingsImage from './SettingsImage'
import SettingsPassword from './SettingsPassword'
import { Link } from 'react-router-dom'
import { HideTabBarInput } from '../0_Components/Other/HideTabBar'
import { logOut } from '../../services/authApi'

const mapStateToProps = state => ({
  user: state.common.user
})

const mapDispatchToProps = dispatch => ({
  changeVal: (type, val) =>
    dispatch({ type, val })
})

class Settings extends React.Component {
  state = {
    user: null,
    error: '',
    loading: true
  }
  changeUser = (user) => {
    this.props.changeVal('user', user)
    this.setState({ ...this.state, loading: false, error: '' })
  }
  componentDidMount() {
    if(!this.props.user) this.props.history.push('/login')
    this.setState({ ...this.state, loading: false, error: '' })
  }
  componentDidUpdate() {
    if(!this.props.user) this.props.history.push('/login')
  }

  render() {
    if (this.state.loading) return <LoadingPage />

    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>Settings</title>
            <meta name="description" content="Settings" />
          </Helmet></HelmetProvider>
          <ErrorBoundary>

            <SettingsImage user={this.props.user} changeUser={this.changeUser} />
            <HideTabBarInput>
              <div id="inputContainer">
                <SettingsAccount user={this.props.user} changeUser={this.changeUser} />
                <SettingsPassword />
              </div>
            </HideTabBarInput>

            <div className="box-flex-col box-margin-15 box-margin-top-40 box-margin-bottom-60 box-border-top">
              <button onClick={() => logOut()} className="settings-logout box-border-bottom settingss-padding-10 box-text-7 box-flex-acenter">Log Out</button>
              <Link to="/about" className="box-color-black box-border-bottom settingss-padding-10 box-text-7">About</Link>
              <Link to="/terms" className="box-color-black box-border-bottom settingss-padding-10 box-text-7">Terms</Link>
              <Link to="/privacy" className="box-color-black box-border-bottom settingss-padding-10 box-text-7">Privacy</Link>
            </div>

          </ErrorBoundary>
        </div>
      </FadeTransition>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)