import React from 'react'
import './PWAprompt.css'

// https://www.netguru.com/codestories/few-tips-that-will-make-your-pwa-on-ios-feel-like-native

class PWAprompt extends React.Component {
  state = {
    showInstallMessage: false
  }
  // Detects if device is on iOS 
  isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }
  // Detects if device is in standalone mode
  isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

  componentDidMount() {
    // Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode()) {
      this.setState({ showInstallMessage: true });
    }
  }

  render() {
    return (
      <div className="pwaPrompt">
        <div className="pwaPrompt-wrapper">
          PWAprompt
        </div>
      </div>
    );
  }
}

export default PWAprompt