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

const mapStateToProps = state => ({
  user: state.common.user
})

class Settings extends React.Component {
  state = {
    user: null,
    error: '',
    loading: true
  }
  changeUser = (user) => {
    this.setState({ ...this.state, user: user, loading: false, error: '' })
  }
  async componentDidMount() {
    // let userRes = await getUser()
    // if (userRes.error) this.setState({ ...this.state, error: userRes.error })
    // else this.changeUser(userRes.user)
    this.changeUser(null)
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

            <SettingsImage user={this.state.user} changeUser={this.changeUser} />
            <HideTabBarInput>
              <div id="inputContainer">
                <SettingsAccount user={this.state.user} changeUser={this.changeUser} />
                <SettingsPassword />
              </div>
            </HideTabBarInput>

            <div className="box-flex-col box-margin-15 box-margin-top-40 box-margin-bottom-60 box-border-top">
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

export default connect(mapStateToProps)(Settings)