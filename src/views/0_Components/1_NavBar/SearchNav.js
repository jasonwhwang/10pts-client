import React from 'react'
import './NavBar.css'
import FadeTransition from '../7_FadeTransition/FadeTransition'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Search, Filter, XCircle } from 'react-feather'
import { HideTabBarInput } from '../Other/HideTabBar'
import { getData } from '../../../services/api'

const mapStateToProps = state => ({
  search: state.search,
})

const mapDispatchToProps = dispatch => ({
  changeVal: (type, val) =>
    dispatch({ type, val })
})

class SearchNav extends React.Component {
  onChangeKeywords = (e) => {
    this.props.changeVal(e.target.id, e.target.value)
  }
  removeKeywords = async () => {
    await this.props.changeVal("keywords", "")
    this.props.history.push("/search")
    this.search()
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
  setQuery = async () => {
    if (this.props.location.search) {
      let q = new URLSearchParams(this.props.location.search).get('q')
      await this.props.changeVal("keywords", q)
    }
  }
  search = async () => {
    let p = new URLSearchParams()
    if(this.props.search.keywords) p.set('keywords', this.props.search.keywords)
    p.set('minPts', this.props.search.minPts)
    p.set('maxPts', this.props.search.maxPts)
    p.set('minPrice', this.props.search.minPrice)
    p.set('maxPrice', this.props.search.maxPrice)
    let tags = this.props.search.searchTags.map(tag => { return tag._id })
    if(tags.length > 0) p.set('tags', tags.join(', '))
    let pString = p.toString()

    this.props.changeVal('searchLoading', true)
    let res = null
    if(this.props.search.category === 'accounts') res = await getData(`/accounts?${pString}`)
    else res = await getData(`/food?${pString}`)
    if(res.data) this.props.changeVal('searchData', res.data)
    this.props.changeVal('searchLoading', false)
  }

  async componentDidMount() {
    await this.setQuery()
    this.search()
  }
  componentDidUpdate(prevProps) {
    if(this.props.location.search !== prevProps.location.search) this.search()
  }
  componentWillUnmount() {
    this.props.changeVal('keywords', '')
    this.props.changeVal('searchData', [])
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