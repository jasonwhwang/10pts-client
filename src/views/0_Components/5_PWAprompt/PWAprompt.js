import React from 'react'
import './PWAprompt.css'
import Icon from '../../../img/icon.png'
import { X } from 'react-feather'

// Show PWA Prompt on iOS Devices

// https://www.netguru.com/codestories/few-tips-that-will-make-your-pwa-on-ios-feel-like-native

class PWAprompt extends React.Component {
  state = {
    show: false
  }
  // Detects if device is on iOS 
  isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    return /iphone|ipad|ipod/.test(userAgent)
  }
  // Detects if device is in standalone mode
  isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone)

  componentDidMount() {
    // Checks if should display install popup notification:
    if (this.isIos() && !this.isInStandaloneMode()) {
      this.setState({ show: true })
    }
  }

  render() {
    if(!this.state.show) return null
    return (
      <div className="pwa">
        <div className="pwa-wrapper box-flex-acenter">
          <img src={Icon} alt="10pts Install" className="box-img pwa-img" />
          <h6 className="box-margin-left-10 box-text-bold follow-blue box-text-7 box-flex-1">
            Install by Adding to Homescreen
          </h6>
          <button onClick={() => { this.setState({ show: false })}}
            className="box-flex-acenter">
            <X size={16} />
          </button>
        </div>
      </div>
    )
  }
}

export default PWAprompt