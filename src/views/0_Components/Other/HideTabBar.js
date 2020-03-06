import React from 'react'

class HideTabBarInput extends React.Component {
  componentDidMount() {
    let inputContainer = document.getElementById('inputContainer')
    inputContainer && inputContainer.addEventListener('focusin', this.hideBar)
    inputContainer && inputContainer.addEventListener('focusout', this.showBar)
  }
  componentWillUnmount() {
    let inputContainer = document.getElementById('inputContainer')
    inputContainer && inputContainer.addEventListener('focusin', this.hideBar)
    inputContainer && inputContainer.removeEventListener('focusout', this.showBar)
  }
  hideBar = (e) => {
    if (e.target.matches('input') || e.target.matches('textarea')) {
      let tabBar = document.getElementById('TabBar')
      tabBar && tabBar.classList.add('tabBar-hide')
    }
  }
  showBar = (e) => {
    if (e.target.matches('input') || e.target.matches('textarea')) {
      let tabBar = document.getElementById('TabBar')
      tabBar && tabBar.classList.remove('tabBar-hide')
    }
  }
  render() {
    return this.props.children
  }
}

class HideTabBarRoute extends React.Component {
  componentDidMount() {
    this.changeHideTabBar()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) this.changeHideTabBar()
  }
  changeHideTabBar = () => {
    let params = this.props.match.params
    let isMain = params.path === 'f' || params.path.indexOf('/f') !== -1
    if (!isMain) {
      let tabBar = document.getElementById('TabBar')
      tabBar && tabBar.classList.add('tabBar-hide')
    } else {
      let tabBar = document.getElementById('TabBar')
      tabBar && tabBar.classList.remove('tabBar-hide')
    }
  }
  componentWillUnmount() {
    let tabBar = document.getElementById('TabBar')
    tabBar && tabBar.classList.remove('tabBar-hide')
  }
  render() {
    return null
  }
}

export {
  HideTabBarInput,
  HideTabBarRoute
}