import React from 'react'
import './NavBar.css'
import FadeTransition from '../7_FadeTransition/FadeTransition'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ChevronLeft, Settings } from 'react-feather'

const mapStateToProps = state => ({
  authUser: state.common.authUser
})

const AccountNav = (props) => {
  if(props.location.pathname.indexOf("/account") === 0) return <AuthUserNav authUser={props.authUser} />
  return <UserNav history={props.history} match={props.match} />
}

const AuthUserNav = (props) => {
  let username = props.authUser && props.authUser.username ? props.authUser.username : ""
  return (
    <FadeTransition>
      <div className="navBar-wrapper box-expand-height box-flex-stretch">
        <h5 className="box-flex-row-acenter box-flex-1 nav-padding15">{username}</h5>

        <Link to="/account/settings"
          className="box-flex-row-acenter box-flex-end nav-padding15 defaultNav-button">
          <Settings size={18} />
        </Link>
      </div>
    </FadeTransition>
  )
}

const UserNav = (props) => {
  return (
    <FadeTransition>
      <div className="navBar-wrapper box-expand-height box-flex-stretch">
        <button onClick={() => props.history.goBack()}
          className="box-flex-row-acenter defaultNav-button nav-padding10">
          <ChevronLeft size={24} />
          <h5 className="box-flex-row-acenter box-margin-left-5">{props.match.params.username}</h5>
        </button>

        <div className="box-flex-1"></div>

        <button className="box-flex-row-acenter box-flex-end nav-padding15 box-text-bold follow-blue">
          Follow
        </button>
      </div>
    </FadeTransition>
  )
}

export default connect(mapStateToProps)(AccountNav)