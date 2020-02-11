import React from 'react'
import './TabBar.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Home, Search, PlusSquare, Bookmark, User } from 'react-feather'

const mapStateToProps = state => ({
  user: state.common.user
})

const TabBar = (props) => {
  let route = props.match.params.route
  let newEdit = route === "new" || route === "edit"
  let account = route === "account" || route === "login"
  let home = route !== "search" &&
    route !== "new" && route !== "edit" &&
    route !== "saved" &&
    route !== "account" && route !== "login"

  return (
    <div className={`tabBar ${newEdit && "tabBar-hide"}`}>
      <div className="tabBar-wrapper">
        <Link to="/" className="tabBar-link box-flex-row-center">
          <Home className={`${home && "box-fill-black"}`} />
          <div className={`tabBar-fillHome ${home && "tabBar-homeWidth"}`}></div>
        </Link>

        <Link to="/search" className="tabBar-link box-flex-row-center">
          <Search className={`${route === "search" && "tabBar-stroke"}`} />
        </Link>

        <Link to="/new" className="tabBar-link box-flex-row-center">
          <PlusSquare className={`${newEdit && "tabBar-stroke"}`} />
        </Link>

        <Link to="/saved" className="tabBar-link box-flex-row-center">
          <Bookmark className={`${route === "saved" && "box-fill-black"}`} />
        </Link>

        <Link to={props.user ? "/account" : "/login"} className="tabBar-link box-flex-row-center">
          <User className={`${account && "tabBar-fillUser"}`} />
        </Link>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(TabBar)