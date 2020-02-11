import React from 'react'
import './NavBar.css'
import FadeTransition from '../7_FadeTransition/FadeTransition'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Search, Filter, XCircle } from 'react-feather'

const mapStateToProps = state => ({
  keywords: state.search.keywords,
  category: state.search.category
})

const mapDispatchToProps = dispatch => ({
  changeVal: (type, val) =>
    dispatch({ type, val })
})

const SearchNav = (props) => {
  let searchPlaceholder = props.category ? `Search ${props.category}...` : "Search..."
  return (
    <FadeTransition>
      <div className="navBar-wrapper box-expand-height box-flex-stretch">
        <Search size={18} className="searchNav-searchIconPadding box-expand-height" />

        <input placeholder={searchPlaceholder}
          className="searchNav-searchInput box-flex-1 box-text-5"
          value={props.keywords}
          onChange={e => props.changeVal("keywords", e.target.value)} />

        <button
          className={`box-flex-row-center defaultNav-button searchNav-xButton
          ${props.keywords ? "box-show" : "box-hide"}`}
          onClick={() => props.changeVal("keywords", "")}>
          <XCircle size={16} />
        </button>

        <Link to="/search/filters" className="box-flex-row-center searchNav-filterIconPadding defaultNav-button">
          <Filter size={18} />
        </Link>
      </div>
    </FadeTransition>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchNav)