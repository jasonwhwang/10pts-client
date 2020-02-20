import React from 'react'
import './NavBar.css'
import FadeTransition from '../7_FadeTransition/FadeTransition'
import { Switch, Route, Link } from 'react-router-dom'
import Logo from '../../../img/logo.png'
import { ChevronLeft, Settings } from 'react-feather'

import SearchNav from './SearchNav'
import NewNav from './NewNav'
import AccountNav from './AccountNav'
import FoodNav from './FoodNav'

const NavBar = () => {
  return (
    <div id="navBar">
      <Switch>
        <Route exact path='/' component={DefaultNav} />
        <Route path='/login/:route?' component={DefaultNav} />

        <Route exact path='/search' component={SearchNav} />
        <Route exact path='/search/filters' component={TitleNav} />

        <Route exact path='/:path(map|search/map|new/map|edit/map|saved/map|account/map)' component={TitleNav} />

        <Route exact path='/new/:route?' component={NewNav} />
        <Route exact path='/edit/:foodname/:route?' component={NewNav} />

        <Route exact path='/saved/:route?' component={SavedNav} />

        <Route exact path='/account/settings/:route?' component={TitleNav} />
        <Route exact path='/:path(account)/:route?' component={AccountNav} />

        <Route exact path='/:path?/f/:foodname/:username?' component={FoodNav} />
        <Route exact path='/:path?/p/:foodname/:username?' component={TitleNav} />
        <Route exact path='/:path?/c/:foodname/:username' component={TitleNav} />

        <Route exact path='/:path(a|search/a|saved/a|account/a)/:username/:route?' component={AccountNav} />
        <Route component={TitleNav} />
      </Switch>
    </div>
  )
}

const DefaultNav = (props) => {
  let showSettings = props.location.pathname.indexOf("/login") === 0
  return (
    <FadeTransition>
      <div className="navBar-wrapper box-expand-height box-flex-stretch">
        <Link to="/" className="nav-padding15 box-flex-row-acenter">
          <img src={Logo} className="defaultNav-logo" alt="10pts" />
        </Link>

        <div className="box-flex-1"></div>

        {showSettings &&
          <Link to="/account/settings"
            className="box-flex-row-acenter box-flex-end nav-padding15 defaultNav-button">
            <Settings size={18} />
          </Link>
        }
      </div>
    </FadeTransition>
  )
}

const TitleNav = (props) => {
  let title = ""
  if (props.location.pathname.indexOf("/filters") !== -1) title = "Filters"
  else if (props.location.pathname.indexOf("/settings") !== -1 && !props.match.params.route) title = "Settings"

  return (
    <FadeTransition>
      <div className="navBar-wrapper box-expand-height box-flex-stretch">
        <button onClick={() => props.history.goBack()}
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
  if (route && route !== "likes" && route !== "following") return <TitleNav {...props} />

  return (
    <FadeTransition>
      <div className="navBar-wrapper box-expand-height box-flex-stretch">
        <Link to="/saved"
          className={`${!route ? "saved-selected" : "saved-border"} box-color-black box-flex-row-center box-flex-1 box-text-6 box-text-bold`}>
          Saved
        </Link>
        <Link to="/saved/likes"
          className={`${route === "likes" ? "saved-selected" : "saved-border"} box-color-black box-flex-row-center box-flex-1 box-text-6 box-text-bold`}>
          Likes
        </Link>
        <Link to="/saved/following"
          className={`${route === "following" ? "saved-selected" : "saved-border"} box-color-black box-flex-row-center box-flex-1 box-text-6 box-text-bold`}>
          Following
        </Link>
      </div>
    </FadeTransition>
  )
}

export default NavBar