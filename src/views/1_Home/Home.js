import React from 'react'
import './Home.css'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import Loading from '../0_Components/4_Loading/Loading'
import List from '../0_Components/11_List/List'
import ErrorBoundary from '../0_Components/3_ErrorBoundary/ErrorBoundary'
// import { ReviewData } from '../0_Components/Other/_data'
import { getData } from '../../services/api'

class Home extends React.Component {
  state = {
    data: [],
    limit: 12,
    offset: 0,
    date: null,
    loading: false,
    noMoreData: false
  }
  componentDidMount() {
    window.addEventListener('scroll', this.scrollListener, false)
    this.fetchData()
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener, false)
  }
  fetchData = async () => {
    if (this.state.noMoreData || this.state.loading) return
    await this.setStateAsync({ ...this.state, loading: true })
    let date = this.state.date ? this.state.date : new Date().getTime()
    let p = new URLSearchParams()
    p.set('date', date)
    p.set('limit', this.state.limit)
    p.set('offset', this.state.offset)
    let query = `?${p.toString()}`
    
    let res = await getData(`/reviews${query}`)
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
  changeFollowing = (username, isFollowing) => {
    let newData = this.state.data.map(review => {
      if (review.account.username === username) {
        let newReview = review
        review.account.isFollowing = isFollowing
        return newReview
      } else return review
    })
    this.setState({ ...this.state, data: newData })
  }
  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  render() {
    if (this.state.loading) return <LoadingPage />

    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>Home</title>
            <meta name="description" content="Home" />
          </Helmet></HelmetProvider>
          <ErrorBoundary>

            <List
              data={this.state.data}
              changeFollowing={this.changeFollowing}
              match={this.props.match}
              location={this.props.location} />

            <div className="box-flex-row-center box-margin-top-30">
              <Loading small={true} />
            </div>

          </ErrorBoundary>
        </div>
      </FadeTransition>
    )
  }
}

export default Home