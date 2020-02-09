import React from 'react'
import './NavBar.css'
import FadeTransition from '../7_FadeTransition/FadeTransition'
import { Switch, Route, Link } from 'react-router-dom'
import Logo from '../../../img/logo.png'
import { ChevronLeft } from 'react-feather'

import SearchNav from './SearchNav'
import NewNav from './NewNav'
import AccountNav from './AccountNav'
import FoodNav from './FoodNav'

const NavBar = () => {
  return (
    <div id="navBar">
      <Switch>
        <Route exact path='/search' component={SearchNav} />
        <Route exact path='/search/filters' component={FiltersMapSettingsNav} />
        <Route exact path='/account/settings' component={FiltersMapSettingsNav} />
        <Route path='/new/:route?' component={NewNav} />
        <Route path='/edit/:foodname/:route?' component={NewNav} />
        <Route path='/saved/:route?' component={SavedNav} />
        <Route exact path='/account' component={AccountNav} />

        <Route path='/:path*/f/:foodname/:username?' component={FoodNav} />
        <Route path='/:path*/a/:username' component={AccountNav} />
        <Route exact path='/:path*/map/:id?' component={FiltersMapSettingsNav} />
        <Route component={DefaultNav} />
      </Switch>
    </div>
  )
}

const DefaultNav = () => {
  return (
    <FadeTransition>
      <div className="navBar-wrapper box-expand-height box-flex-stretch">
        <div className="nav-padding15 box-flex-row-acenter">
          <img src={Logo} className="defaultNav-logo" alt="10pts" />
        </div>
      </div>
    </FadeTransition>
  )
}

const FiltersMapSettingsNav = (props) => {
  let title = ""
  if(props.location.pathname.indexOf("/filters") !== -1) title = "Filters"
  else if(props.location.pathname.indexOf("/settings") !== -1) title = "Settings"

  return (
    <FadeTransition>
      <div className="navBar-wrapper box-expand-height box-flex-stretch">
        <button onClick={() => props.history.goBack() }
          className="box-flex-row-acenter chevron-left defaultNav-button">
          <ChevronLeft size={24} />
        </button>

        <h6 className="box-flex-1 box-flex-row-center box-text-bold">{title}</h6>

        <div className="chevron-left"></div>
      </div>
    </FadeTransition>
  )
}

const SavedNav = (props) => {
  let route = props.match.params.route
  return (
    <FadeTransition>
      <div className="navBar-wrapper box-expand-height box-flex-stretch">
        <Link to="/saved"
          className={`${!route && "saved-selected"} box-color-black box-flex-row-center box-flex-1 box-text-6 box-text-bold`}>
          Bookmarks
        </Link>
        <Link to="/saved/likes"
          className={`${route === "likes" && "saved-selected"} box-color-black box-flex-row-center box-flex-1 box-text-6 box-text-bold`}>
          Likes
        </Link>
        <Link to="/saved/following"
          className={`${route === "following" && "saved-selected"} box-color-black box-flex-row-center box-flex-1 box-text-6 box-text-bold`}>
          Following
        </Link>
      </div>
    </FadeTransition>
  )
}

export default NavBar