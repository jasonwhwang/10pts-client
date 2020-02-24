import React from 'react'
import './NavBar.css'
import FadeTransition from '../7_FadeTransition/FadeTransition'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ChevronLeft, Settings } from 'react-feather'
import FollowButton from '../8_Buttons/FollowButton'

const mapStateToProps = state => ({
  user: state.common.user
})

const AccountNav = (props) => {
  if (props.match.params.path === 'account') return <UserNav user={props.user} history={props.history} match={props.match} />
  return <MemberNav history={props.history} match={props.match} />
}

const UserNav = (props) => {
  let username = props.user && props.user.username ? props.user.username : "username"
  let params = props.match.params
  return (
    <FadeTransition>
      <div className="navBar-wrapper box-expand-height box-flex-stretch">
        {params.route &&
          <button onClick={() => props.history.goBack()}
            className="box-flex-acenter defaultNav-button nav-padding10">
            <ChevronLeft size={24} />
            <h5 className="box-flex-acenter box-margin-left-5">{username}</h5>
          </button>
        }
        {!params.route && 
          <h5 className="box-flex-acenter nav-padding15">{username}</h5>
        }

        <div className="box-flex-1"></div>

        <Link to="/account/settings"
          className="box-flex-acenter box-flex-end nav-padding15 defaultNav-button">
          <Settings size={18} />
        </Link>
      </div>
    </FadeTransition>
  )
}

const MemberNav = (props) => {
  return (
    <FadeTransition>
      <div className="navBar-wrapper box-expand-height box-flex-stretch">
        <button onClick={() => props.history.goBack()}
          className="box-flex-acenter defaultNav-button nav-padding10">
          <ChevronLeft size={24} />
          <h5 className="box-flex-acenter box-margin-left-5">{props.match.params.username}</h5>
        </button>

        <div className="box-flex-1"></div>

        <FollowButton className="box-margin-right-5 follow-blue" />
      </div>
    </FadeTransition>
  )
}

export default connect(mapStateToProps)(AccountNav)