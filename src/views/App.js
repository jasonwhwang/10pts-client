import React from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'

import ScrollTop from './0_Components/0_ScrollTop/ScrollTop'
import NotFound from './0_Components/5_NotFound/NotFound'
import NavBar from './0_Components/1_NavBar/NavBar'
import TabBar from './0_Components/2_TabBar/TabBar'
import Home from './1_Home/Home'
import Search from './2_Search/Search'
import New from './3_New/New'
import Saved from './4_Saved/Saved'
import Account from './5_Account/Account'

const App = (props) => {
  return (
    <div className="app">
      <NavBar {...props} />

      <ScrollTop location={props.location} >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search/:route?" component={Search} />
          <Route path="/new/:route?" component={New} />
          <Route path="/edit/:foodname/:route?" component={New} />
          <Route path="/saved/:route?" component={Saved} />
          <Route path="/account/:route?" component={Account} />
          <Route component={NotFound} />
        </Switch>
      </ScrollTop>

      <TabBar location={props.location} />
    </div>
  )
}

export default App
