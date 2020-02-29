import React from 'react'
import './Food.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import { Link } from 'react-router-dom'
import Photo from '../../img/user.png'
import ErrorBoundary from '../0_Components/3_ErrorBoundary/ErrorBoundary'
import { CardRatings, PhotosList } from '../0_Components/10_Cards/CardRatings'
import { HideTabBarRoute } from '../0_Components/Other/HideTabBar'

const mapStateToProps = state => ({
  user: state.common.user
})

class Food extends React.Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    this.setState({ ...this.state, loading: false })
  }

  render() {
    if (this.state.loading) return <LoadingPage />
    let params = this.props.match.params
    let isMain = params.path === 'f' || params.path.indexOf('/f') !== -1
    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>Food</title>
            <meta name="description" content="Food" />
            {params.path !== "f" &&
              <link rel="canonical" href={`${process.env.REACT_APP_url_LINK}/f/${params.foodname}`} />
            }
          </Helmet></HelmetProvider>
          <ErrorBoundary>
            <HideTabBarRoute location={this.props.location} match={this.props.match} />

            {isMain ? <FoodMain {...this.props} data={data} />
              : <PhotosList {...this.props} data={data} />
            }

          </ErrorBoundary>
        </div>
      </FadeTransition>
    )
  }
}

const FoodMain = (props) => {
  let params = props.match.params
  let tab = ''
  if (params.path) {
    if (params.path.indexOf('search') === 0) tab = '/search'
    else if (params.path.indexOf('saved') === 0) tab = '/saved'
    else if (params.path.indexOf('account') === 0) tab = '/account'
  }
  return (
    <>
      <CardRatings data={props.data} tab={tab} params={params} />
      <FoodStats savedCount={props.data.savedCount} reviewsCount={props.data.reviewsCount} />
      <FoodReviews reviews={props.data.reviews} tab={tab} params={params} />
      <div className="box-margin-bottom-60"></div>
    </>
  )
}

const FoodStats = ({ savedCount, reviewsCount }) => {
  let savedString = savedCount === 1 ? '1 Save' : `${savedCount} Saves`
  let reviewsString = reviewsCount === 1 ? '1 Review' : `${reviewsCount} Reviews`

  return (
    <div className="box-flex-acenter box-flex-between food-statsHeight box-border-bottom">
      <h6 className="box-text-bold">{reviewsString}</h6>
      <h6 className="box-text-nobold box-text-7">{savedString}</h6>
    </div>
  )
}

const FoodReviews = ({ reviews, tab, params }) => {
  return (
    <>{reviews.map(review => {
      let username = review.user && review.user.username ? review.user.username : ''
      let likes = review.likes === 1 ? '1 like' : review.likes + " likes"
      return (
        <Link to={`${tab}/f/${params.foodname}/${username}`}
          className="box-flex-acenter food-reviewsHeight box-color-black"
          key={username} >
          <img src={review.user && review.user.image ? review.user.image : Photo}
            className="card-userImage-l box-img"
            alt={username} />
          <h6 className="box-text-bold box-flex-1 box-margin-15">{username}</h6>
          <h6 className="box-text-nobold box-text-8">{likes}</h6>
          <h6 className="box-margin-left-20 card-pts-medium box-flex-row-center">{review.pts}</h6>
        </Link>
      )
    })}</>
  )
}

let data = {
  photos: [null, null, null],
  foodname: "food-name1",
  foodTitle: "Food Name1",
  address: "City Hall, New York, NY",
  pts: 5,
  isSaved: false,
  savedCount: 7,
  reviewsCount: 9,
  hasReviewed: false,

  price: 15,
  tags: [{ _id: 10, name: 'Example Tag1' }, { _id: 11, name: 'Example Tag2' }, { _id: 12, name: 'Example Tag3' }, { _id: 13, name: 'Example Tag4' }],
  ptsTaste: 5,
  ptsAppearance: 5,
  ptsTexture: 5,
  ptsAroma: 5,
  ptsBalance: 5,
  reviews: [
    {
      user: { image: null, username: 'username1' },
      pts: 5,
      likes: 35
    },
    {
      user: { image: null, username: 'username2' },
      pts: 5,
      likes: 35
    }
  ]
}

export default connect(mapStateToProps)(Food)