import React from 'react'
import './Home.css'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import List from '../0_Components/11_List/List'
import ErrorBoundary from '../0_Components/3_ErrorBoundary/ErrorBoundary'
// import { ReviewData } from '../0_Components/Other/_data'
import { getData } from '../../services/api'

class Home extends React.Component {
  state = {
    data: [],
    loading: true
  }
  async componentDidMount() {
    let params = new URLSearchParams()
    let currDate = new Date()
    params.set('date', currDate.getTime())
    let query = params.toString()
    let res = await getData(`/reviews?${query}`)
    if(res.error) return
    this.setState({ data: res.data, loading: false })
  }
  changeFollowing = (username, isFollowing) => {
    let newData = this.state.data.map(review => {
      if(review.account.username === username) {
        let newReview = review
        review.account.isFollowing = isFollowing
        return newReview
      } else return review
    })
    this.setState({ ...this.state, data: newData })
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
              
          </ErrorBoundary>
        </div>
      </FadeTransition>
    )
  }
}

export default Home