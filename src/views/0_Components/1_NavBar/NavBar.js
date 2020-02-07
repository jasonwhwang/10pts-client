import React from 'react'
import './NavBar.css'
import Logo from '../../../img/logo.svg'

class NavBar extends React.Component {
  render() {
    return (
      <div className="navBar" id="navBar">
        <div className="navBar-wrapper box-flex-row-acenter">
          <img src={Logo} className="navBar-logo" alt="10pts" />
        </div>
      </div>
    );
  }
}

export default NavBar