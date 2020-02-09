import React from 'react'
import './TabBar.css'
import { Link } from 'react-router-dom'
import { Home, Search, PlusSquare, Bookmark, User } from 'react-feather'

const TabBar = (props) => {
  let path = props.location.pathname
  let home = path.indexOf("/search") !== 0 &&
    path.indexOf("/new") !== 0 &&
    path.indexOf("/saved") !== 0 &&
    path.indexOf("/account") !== 0
  return (
    <div className={`tabBar ${path.indexOf("/new") === 0 && "tabBar-hide"}`}>
      <div className="tabBar-wrapper">
        <Link to="/" className="tabBar-link box-flex-row-center">
          <Home className={`${home && "box-fill-black"}`} />
          <div className={`tabBar-fillHome ${home && "tabBar-homeWidth"}`}></div>
        </Link>

        <Link to="/search" className="tabBar-link box-flex-row-center">
          <Search className={`${path.indexOf("/search") === 0 && "tabBar-stroke"}`} />
        </Link>

        <Link to="/new" className="tabBar-link box-flex-row-center">
          <PlusSquare className={`${path.indexOf("/new") === 0 && "tabBar-stroke"}`} />
        </Link>

        <Link to="/saved" className="tabBar-link box-flex-row-center">
          <Bookmark className={`${path.indexOf("/saved") === 0 && "box-fill-black"}`} />
        </Link>

        <Link to="/account" className="tabBar-link box-flex-row-center">
          <User className={`${path.indexOf("/account") === 0 && "tabBar-fillUser"}`} />
        </Link>
      </div>
    </div>
  )
}

export default TabBar