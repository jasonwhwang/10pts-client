import React from 'react'
import './NavBar.css'
import FadeTransition from '../7_FadeTransition/FadeTransition'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Search, Filter, XCircle } from 'react-feather'
import { HideTabBarInput } from '../Other/HideTabBar'

const mapStateToProps = state => ({
  keywords: state.search.keywords,
  category: state.search.category
})

const mapDispatchToProps = dispatch => ({
  changeVal: (type, val) =>
    dispatch({ type, val })
})

class SearchNav extends React.Component {
  onChangeKeywords = (e) => {
    this.props.changeVal(e.target.id, e.target.value)
  }
  removeKeywords = () => {
    this.props.changeVal("keywords", "")
    this.props.history.push("/search")
  }
  submitSearch = (e) => {
    e.preventDefault()
    document.getElementById("keywords").blur()
  }
  render() {
    let searchPlaceholder = this.props.category ? `Search ${this.props.category}...` : "Search..."
    return (
      <FadeTransition>
        <div className="navBar-wrapper box-expand-height box-flex-stretch">
          <Search size={18} className="searchNav-searchIconPadding box-expand-height" />

          <HideTabBarInput>
            <form id="inputContainer" className="box-flex-1 box-flex-row" onSubmit={this.submitSearch}>
              <input placeholder={searchPlaceholder} id="keywords"
                className="searchNav-searchInput box-flex-1 box-text-5"
                value={this.props.keywords}
                onChange={this.onChangeKeywords} />
            </form>
          </HideTabBarInput>

          <button type="button"
            className={`box-flex-row-center defaultNav-button searchNav-xButton
            ${this.props.keywords ? "box-show" : "box-hide"}`}
            onClick={this.removeKeywords}>
            <XCircle size={16} />
          </button>

          <Link to="/search/filters" className="box-flex-row-center searchNav-filterIconPadding defaultNav-button">
            <Filter size={18} />
          </Link>
        </div>
      </FadeTransition>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchNav)