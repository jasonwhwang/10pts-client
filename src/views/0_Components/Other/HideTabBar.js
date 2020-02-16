import React from 'react'

class HideTabBar extends React.Component {
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
    if (e.target.matches('input')) {
      let tabBar = document.getElementById("TabBar")
      tabBar && tabBar.classList.add("tabBar-hide")
    }
  }
  showBar = (e) => {
    if (e.target.matches("input")) {
      let tabBar = document.getElementById("TabBar")
      tabBar && tabBar.classList.remove("tabBar-hide")
    }
  }
  render() {
    return this.props.children
  }
}

export default HideTabBar