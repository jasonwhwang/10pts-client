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
// import { FoodMainData } from '../0_Components/Other/_data'
import { getData } from '../../services/api'

const mapStateToProps = state => ({
  user: state.common.user
})

const mapDispatchToProps = dispatch => ({
  changeVal: (type, val) =>
    dispatch({ type, val })
})

class Food extends React.Component {
  state = {
    food: null,
    loading: true
  }
  async componentDidMount() {
    let res = await getData(`/food/${this.props.match.params.foodname}`)
    if(!res || res.error || res.errors) return
    this.setState({ ...this.state, food: res.food, loading: false })
    let page = {
      _id: res.food._id,
      isReviewed: res.food.isReviewed,
      isSaved: res.food.isSaved,
      foodname: res.food.foodname,
      foodTitle: res.food.foodTitle,
      address: res.food.address,
    }
    this.props.changeVal('setPage', page)
  }

  render() {
    if (this.state.loading) return <LoadingPage />
    let params = this.props.match.params
    let isMain = params.path === 'f' || params.path.indexOf('/f') !== -1
    let f = this.state.food
    let title = f ? `${f.foodTitle} | ${f.address}` : 'Food'
    let description = f ? `${f.foodTitle} at ${f.address}, 10pts` : 'Food'
    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            {params.path !== "f" &&
              <link rel="canonical" href={`${process.env.REACT_APP_url_LINK}/f/${params.foodname}`} />
            }
          </Helmet></HelmetProvider>
          <ErrorBoundary>
            <HideTabBarRoute location={this.props.location} match={this.props.match} />

            {isMain ? <FoodMain {...this.props} data={this.state.food} />
              : <PhotosList {...this.props} data={this.state.food} />
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
  let savedString = savedCount === 1 ? '1 save' : `${savedCount} saves`
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
      let username = review.account && review.account.username ? review.account.username : ''
      let likes = review.likesCount === 1 ? '1 like' : review.likesCount + " likes"
      return (
        <Link to={`${tab}/f/${params.foodname}/${username}`}
          className="box-flex-acenter food-reviewsHeight box-color-black"
          key={username} >
          <img src={review.account && review.account.image ? review.account.image : Photo}
            className="card-userImage-l box-img"
            alt={username} />
          <h6 className="box-text-bold box-flex-1 box-margin-15">{username}</h6>
          <h6 className="box-text-nobold box-text-8 box-margin-15">{likes}</h6>
          <h6 className="card-pts-medium box-flex-row-center">{review.pts}</h6>
        </Link>
      )
    })}</>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Food)