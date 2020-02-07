import React from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'

import ScrollTop from './0_Components/0_ScrollTop/ScrollTop'
import NotFound from './0_Components/5_NotFound/NotFound'
import NavBar from './0_Components/1_NavBar/NavBar'
import TabBar from './0_Components/2_TabBar/TabBar'
import Home from './1_Home/Home'
import Search from './2_Search/Search'

const App = (props) => {
  return (
    <div className="app">
      <NavBar history={props.history} location={props.location}/>

      <ScrollTop location={props.location}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search/:route?" component={Search} />
          <Route component={NotFound} />
        </Switch>
      </ScrollTop>

      <TabBar history={props.history} location={props.location}/>
    </div>
  )
}

export default App
