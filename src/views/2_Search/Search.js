import React from 'react'
import './Search.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import Loading from '../0_Components/4_Loading/Loading'
import List from '../0_Components/11_List/List'
import ErrorBoundary from '../0_Components/3_ErrorBoundary/ErrorBoundary'
import { AccountRow } from '../0_Components/11_List/ListRow'
// import { FoodData, UserSearchData } from '../0_Components/Other/_data'
import { getData } from '../../services/api'

const mapStateToProps = state => ({
  search: state.search
})

const mapDispatchToProps = dispatch => ({
  changeVal: (type, val) =>
    dispatch({ type, val })
})

class Search extends React.Component {
  state = {
    data: [],
    limit: 12,
    offset: 0,
    loading: false,
    noMoreData: false
  }
  async componentDidMount() {
    window.addEventListener('scroll', this.scrollListener, false)
    await this.setQuery()
    this.fetchData()
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener, false)
  }
  async componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      await this.setQuery()
      await this.setStateAsync({ ...this.state, data: [], offset: 0, noMoreData: false })
      this.fetchData()
    }
  }

  setQuery = async () => {
    if (this.props.location.search) {
      let q = new URLSearchParams(this.props.location.search).get('q')
      await this.props.changeVal("keywords", q)
    }
  }
  fetchData = async () => {
    if (this.state.noMoreData || this.state.loading) return
    await this.setStateAsync({ ...this.state, loading: true })
    let p = new URLSearchParams()
    if (this.props.search.keywords) p.set('keywords', this.props.search.keywords)
    p.set('minPts', this.props.search.minPts)
    p.set('maxPts', this.props.search.maxPts)
    p.set('minPrice', this.props.search.minPrice)
    p.set('maxPrice', this.props.search.maxPrice)
    p.set('limit', this.state.limit)
    p.set('offset', this.state.offset)
    let tags = this.props.search.searchTags.map(tag => { return tag._id })
    if (tags.length > 0) p.set('tags', tags.join('-'))
    let query = `?${p.toString()}`

    let res = null
    if (this.props.search.category === 'accounts') res = await getData(`/accounts${query}`)
    else res = await getData(`/food${query}`)
    if (res.error) return
    this.setState({
      ...this.state,
      data: this.state.data.concat(res.data),
      noMoreData: res.data.length === 0,
      offset: this.state.offset + 1,
      loading: false
    })
  }
  scrollListener = () => {
    if ((window.innerHeight + window.scrollY + 300) >= document.body.offsetHeight) {
      this.fetchData()
    }
  }
  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  render() {
    return (
      <FadeTransition>
        <div className="page box-flex-col">
          <HelmetProvider><Helmet>
            <title>Search</title>
            <meta name="description" content="Search" />
          </Helmet></HelmetProvider>
          <ErrorBoundary>

            {!this.props.search.category && this.state.data.length > 0 ?
              <List
                data={this.state.data}
                match={this.props.match}
                location={this.props.location} />
              :
              <AccountRow data={this.state.data} tab="/search" />
            }
            {this.state.data.length === 0 && !this.state.loading &&
              <h6 className="box-color-gray box-text-nobold box-flex-row-center box-text-8 box-margin-15">
                None
              </h6>
            }

            {this.state.loading &&
              <div className="box-flex-row-center box-margin-top-30 box-margin-bottom-30">
                <Loading small={true} />
              </div>
            }

          </ErrorBoundary>
        </div>
      </FadeTransition>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)