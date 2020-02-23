import React from 'react'
import './Saved.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import ListRow from '../0_Components/11_List/ListRow'

const mapStateToProps = state => ({
  user: state.common.user
})

class Saved extends React.Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    this.setState({ ...this.state, loading: false })
  }

  render() {
    if (this.state.loading) return <LoadingPage />

    let dataSource = data
    if(this.props.match.params.path === 'saved/likes') dataSource = data2
    else if(this.props.match.params.path === 'saved/following') dataSource = data3

    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>Saved</title>
            <meta name="description" content="Saved" />
          </Helmet></HelmetProvider>

          <ListRow
            data={dataSource}
            location={this.props.location}
            match={this.props.match}
            />

        </div>
      </FadeTransition>
    )
  }
}

let data = [
  {
    photos: [null, null, null],
    foodname: "food-name1",
    foodTitle: "Food Name1",
    address: "City Hall, New York, NY",
    pts: 5,
    isSaved: false,
    savedCount: 7,
    reviewsCount: 9,
    hasReviewed: false
  },
  {
    photos: [null, null, null],
    foodname: "food-name2",
    foodTitle: "Food Name2",
    address: "City Hall, New York, NY",
    pts: 5,
    isSaved: false,
    savedCount: 7,
    reviewsCount: 9,
    hasReviewed: false
  },
  {
    photos: [null, null, null],
    foodname: "food-name3",
    foodTitle: "Food Name3",
    address: "City Hall, New York, NY",
    pts: 5,
    isSaved: false,
    savedCount: 7,
    reviewsCount: 9,
    hasReviewed: false
  }
]

let data2 = [
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

let data3 = [
  {
    _id: '1',
    user: {
      username: 'username',
      image: null
    },
    notification: 'liked your review',
    review: {
      foodname: 'food-name',
      foodTitle: 'Beef Noodle Soup',
      username: 'username'
    },
    updatedAt: new Date()
  },
  {
    _id: '2',
    user: {
      username: 'username',
      image: null
    },
    notification: 'commented on your review',
    review: {
      foodname: 'food-name',
      foodTitle: 'A Long Foody Food Name',
      username: 'username'
    },
    updatedAt: new Date()
  },
  {
    _id: '3',
    user: {
      username: 'username',
      image: null
    },
    notification: 'is following you',
    review: null,
    updatedAt: new Date()
  },
  {
    _id: '4',
    user: {
      username: 'username',
      image: null
    },
    notification: 'has a new review',
    review: {
      foodname: 'food-name',
      foodTitle: 'Food Name',
      username: 'username'
    },
    updatedAt: new Date()
  }
]

export default connect(mapStateToProps)(Saved)