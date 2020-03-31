import React from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'

import ScrollTop from './0_Components/Other/ScrollTop'
import NotFound from './8_Other/NotFound'
import NavBar from './0_Components/1_NavBar/NavBar'
import TabBar from './0_Components/2_TabBar/TabBar'
import Home from './1_Home/Home'
import Search from './2_Search/Search'
import Filters from './2_Search/Filters'
import Photos from './3_New/Photos'
import Details from './3_New/Details'
import TextReview from './3_New/TextReview'
import Saved from './4_Saved/Saved'
import Account from './5_Account/Account'
import Settings from './5_Account/Settings'
import Food from './6_Food/Food'
import Review from './7_Review/Review'
import MapFrame from './8_Other/MapFrame'
import Login from './9_Login/Login'
import About from './8_Other/About'
import Callback from './8_Other/Callback'
import PWAprompt from './0_Components/5_PWAprompt/PWAprompt'

const App = (props) => {
  return (
    <div className="app">
      <NavBar {...props} />
      <PWAprompt />

      <ScrollTop location={props.location} >
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/search/filters" component={Filters} />
          <Route exact path="/:path(search|search/list)" component={Search} />

          <Route exact path='/:path(map|search/map|new/map|edit/map|saved/map|account/map)' component={MapFrame} />

          <Route exact path="/new" component={Photos} />
          <Route exact path="/new/details" component={Details} />
          <Route exact path="/new/review" component={TextReview} />
          <Route exact path="/edit/:foodname" component={Photos} />
          <Route exact path="/edit/:foodname/details" component={Details} />
          <Route exact path="/edit/:foodname/review" component={TextReview} />

          <Route exact path="/:path(saved|saved/likes|saved/following)" component={Saved} />

          <Route exact path="/:path(account)/:route(settings)" component={Settings} />
          <Route exact path="/:path(account)/:route?" component={Account} />

          <Route exact path="/:path(login|login/signup|login/welcome|login/success|login/resetpassword|login/newpassword)" component={Login} />
          <Route exact path="/callback" component={Callback} />

          <Route exact path='/:path(f|search/f|saved/f|account/f)/:foodname' component={Food} />
          <Route exact path='/:path(p|search/p|saved/p|account/p)/:foodname' component={Food} />

          <Route exact path='/:path(f|search/f|saved/f|account/f)/:foodname/:username' component={Review} />
          <Route exact path='/:path(p|search/p|saved/p|account/p)/:foodname/:username' component={Review} />
          <Route exact path='/:path(c|search/c|saved/c|account/c)/:foodname/:username' component={Review} />

          <Route exact path='/:path(a|search/a|saved/a|account/a)/:username/:route?' component={Account} />

          <Route exact path="/:path(about|terms|privacy)" component={About} />
          <Route component={NotFound} />
        </Switch>
      </ScrollTop>

      <Route exact path='/:path?/:route*/' component={TabBar} />
    </div>
  )
}

export default App
