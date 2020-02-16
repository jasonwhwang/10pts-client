import React from 'react'
import './TabBar.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Home, Search, PlusSquare, Bookmark, User } from 'react-feather'

const mapStateToProps = state => ({
  user: state.common.user
})

const TabBar = (props) => {
  let path = props.match.params.path
  let newEdit = path === "new" || path === "edit"
  let account = path === "account" || path === "login"
  let home = path !== "search" &&
    path !== "new" && path !== "edit" &&
    path !== "saved" &&
    path !== "account" && path !== "login"

  return (
    <div className={`tabBar ${newEdit ? "tabBar-hide" : ''}`} id="TabBar">
      <div className="tabBar-wrapper">
        <Link to="/" className="tabBar-link box-flex-row-center">
          <Home className={`${home ? "box-fill-black" : null}`} />
          <div className={`tabBar-fillHome ${home ? "tabBar-homeWidth" : ''}`}></div>
        </Link>

        <Link to="/search" className="tabBar-link box-flex-row-center">
          <Search className={`${path === "search" ? "tabBar-stroke" : ''}`} />
        </Link>

        <Link to="/new" className="tabBar-link box-flex-row-center">
          <PlusSquare className={`${newEdit ? "tabBar-stroke" : ''}`} />
        </Link>

        <Link to="/saved" className="tabBar-link box-flex-row-center">
          <Bookmark className={`${path === "saved" ? "box-fill-black" : ''}`} />
        </Link>

        <Link to={props.user ? "/account" : "/login"} className="tabBar-link box-flex-row-center">
          <User className={`${account ? "tabBar-fillUser" : ''}`} />
        </Link>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(TabBar)