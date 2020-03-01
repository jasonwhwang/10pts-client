import React from 'react'
import './Home.css'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import List from '../0_Components/11_List/List'
import ErrorBoundary from '../0_Components/3_ErrorBoundary/ErrorBoundary'

class Home extends React.Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    this.setState({ ...this.state, loading: false })
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
              data={data}
              match={this.props.match}
              location={this.props.location} />
              
          </ErrorBoundary>
        </div>
      </FadeTransition>
    )
  }
}

let data = [
  {
    user: { image: null, username: "username", isFollowing: false },
    photos: [null, null, null],
    foodname: "food-name1",
    foodTitle: "Food Name1",
    address: "City Hall, New York, NY",
    pts: 5,
    isLiked: false,
    isSaved: false,
    likesCount: 3,
    commentsCount: 5,
    updatedAt: new Date()
  },
  {
    user: { image: null, username: "username", isFollowing: false },
    photos: [null, null, null],
    foodname: "food-name2",
    foodTitle: "Food Name2",
    address: "City Hall, New York, NY",
    pts: 5,
    isLiked: false,
    isSaved: false,
    likesCount: 3,
    commentsCount: 5,
    updatedAt: new Date()
  },
  {
    user: { image: null, username: "username", isFollowing: false },
    photos: [null, null, null],
    foodname: "food-name3",
    foodTitle: "Food Name3",
    address: "City Hall, New York, NY",
    pts: 5,
    isLiked: false,
    isSaved: false,
    likesCount: 3,
    commentsCount: 5,
    updatedAt: new Date()
  }
]

export default Home