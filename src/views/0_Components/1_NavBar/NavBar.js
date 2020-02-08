import React from 'react'
import './NavBar.css'
import FadeTransition from '../7_FadeTransition/FadeTransition'
import { Switch, Route, Link } from 'react-router-dom'
import Logo from '../../../img/logo.svg'
import { ChevronLeft } from 'react-feather'

import SearchNav from './SearchNav'
import NewNav from './NewNav'

const NavBar = () => {
  return (
    <div id="navBar">
      <Switch>
        <Route exact path='/search' component={SearchNav} />
        <Route exact path='/search/filters' component={FiltersNav} />
        <Route path='/new/:route?' component={NewNav} />
        <Route component={DefaultNav} />
      </Switch>
    </div>
  )
}

const DefaultNav = () => {
  return (
    <FadeTransition>
      <div className="navBar-wrapper box-expand-height box-flex-stretch">
        <Link to="/" className="defaultNav-logoWrapper box-flex-row-acenter">
          <img src={Logo} className="defaultNav-logo" alt="10pts" />
        </Link>
      </div>
    </FadeTransition>
  )
}

const FiltersNav = (props) => {
  return (
    <FadeTransition>
      <div className="navBar-wrapper box-expand-height box-flex-stretch">
        <button onClick={() => props.history.goBack() }
          className="box-flex-row-acenter chevron-left">
          <ChevronLeft size={24} className="box-color-black" />
        </button>

        <h6 className="box-flex-1 box-flex-row-center box-text-bold">Filters</h6>

        <div className="chevron-left"></div>
      </div>
    </FadeTransition>
  )
}

export default NavBar