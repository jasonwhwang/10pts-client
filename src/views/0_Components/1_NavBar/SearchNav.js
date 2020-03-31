import React from 'react'
import './NavBar.css'
import FadeTransition from '../7_FadeTransition/FadeTransition'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Search, Filter, XCircle } from 'react-feather'
import { HideTabBarInput } from '../Other/HideTabBar'

const mapStateToProps = state => ({
  search: state.search,
})

const mapDispatchToProps = dispatch => ({
  changeVal: (type, val) =>
    dispatch({ type, val })
})

// Search Nav
// - Input adds keywords to URL Search Params and redirects on search(enter)
// - App body will monitor params, on change will call based on new keywords
class SearchNav extends React.Component {
  onChangeKeywords = (e) => {
    this.props.changeVal(e.target.id, e.target.value)
  }
  removeKeywords = async () => {
    await this.props.changeVal("keywords", "")
    this.props.history.push("/search")
  }
  submitSearch = (e) => {
    e.preventDefault()
    document.getElementById("keywords").blur()
    let q = ''
    if(this.props.search.keywords) {
      let s = new URLSearchParams()
      s.set('q', this.props.search.keywords)
      q = '?' + s.toString()
    }
    this.props.history.push(`/search${q}`)
  }
  componentWillUnmount() {
    this.props.changeVal('keywords', '')
  }

  render() {
    let searchPlaceholder = this.props.search.category ? `Search ${this.props.search.category}...` : "Search..."
    return (
      <FadeTransition>
        <div className="navBar-wrapper box-expand-height box-flex-stretch">
          <Search size={18} className="searchNav-searchIconPadding box-expand-height" />

          <HideTabBarInput>
            <form id="inputContainer" className="box-flex-1 box-flex-row" onSubmit={this.submitSearch}>
              <input placeholder={searchPlaceholder} id="keywords"
                className="searchNav-searchInput box-flex-1 box-text-5"
                value={this.props.search.keywords}
                onChange={this.onChangeKeywords} />
            </form>
          </HideTabBarInput>

          <button type="button"
            className={`box-flex-row-center defaultNav-button searchNav-xButton
            ${this.props.search.keywords ? "box-show" : "box-hide"}`}
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