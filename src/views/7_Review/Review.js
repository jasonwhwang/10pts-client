import React from 'react'
import './Review.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import Card from '../0_Components/10_Cards/Card'
import ProgressBar from '../0_Components/Other/ProgressBar'
import Photo from '../../img/user.png'
import ErrorBoundary from '../0_Components/3_ErrorBoundary/ErrorBoundary'
import TextareaAutosize from 'react-autosize-textarea'
import FlagButton from '../0_Components/8_Buttons/FlagButton'
import { Link } from 'react-router-dom'
import Ago from '../0_Components/Other/Ago'
import LikeTrashButton from '../0_Components/8_Buttons/LikeTrashButton'
import ReviewInput from './ReviewInput'

const mapStateToProps = state => ({
  user: state.common.user
})

class Review extends React.Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    this.changeHideTabBar()
    this.setState({ ...this.state, loading: false })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) this.changeHideTabBar()
  }
  changeHideTabBar = () => {
    let params = this.props.match.params
    let isComments = params.path === 'c' || params.path.indexOf('/c') !== -1
    if (isComments) {
      let tabBar = document.getElementById("TabBar")
      tabBar && tabBar.classList.add("tabBar-hide")
    } else {
      let tabBar = document.getElementById("TabBar")
      tabBar && tabBar.classList.remove("tabBar-hide")
    }
  }
  componentWillUnmount() {
    let tabBar = document.getElementById("TabBar")
    tabBar && tabBar.classList.remove("tabBar-hide")
  }

  render() {
    if (this.state.loading) return <LoadingPage />

    let params = this.props.match.params
    let isMain = params.path === 'f' || params.path.indexOf('/f') !== -1
    let isPhotos = params.path === 'p' || params.path.indexOf('/p') !== -1
    let isComments = params.path === 'c' || params.path.indexOf('/c') !== -1

    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>Review</title>
            <meta name="description" content="Review" />
            {params.path !== "f" &&
              <link rel="canonical" href={`${process.env.REACT_APP_url_LINK}/f/${params.foodname}/${params.username}`} />
            }
          </Helmet></HelmetProvider>
          <ErrorBoundary>

            {isMain && <ReviewMain {...this.props} data={data} />}
            {isPhotos && <ReviewPhotos {...this.props} data={data} />}
            {isComments && <ReviewUserComment {...this.props} data={data} />}

          </ErrorBoundary>
        </div>
      </FadeTransition>
    )
  }
}

const ReviewMain = (props) => {
  let params = props.match.params
  let tab = ''
  if (params.path) {
    if (params.path.indexOf('search') === 0) tab = '/search'
    else if (params.path.indexOf('saved') === 0) tab = '/saved'
    else if (params.path.indexOf('account') === 0) tab = '/account'
  }
  return (
    <>
      <Card {...props.data} tab={tab} params={params} />

      <ReviewTags price={props.data.price} tags={props.data.tags} />

      <ProgressBar pts={props.data.ptsTaste} label={'Taste'} />
      <ProgressBar pts={props.data.ptsAppearance} label={'Appearance'} />
      <ProgressBar pts={props.data.ptsTexture} label={'Texture'} />
      <ProgressBar pts={props.data.ptsAroma} label={'Aroma'} />
      <ProgressBar pts={props.data.ptsBalance} label={'Balance'} />

      <div className="box-margin-top-40 box-border-top box-padding-15">
        <TextareaAutosize rows={3}
          id="review"
          placeholder="User review..."
          className="box-expand-width box-textarea box-text-5"
          value={props.data.review}
          disabled={true}
          onChange={(e) => console.log(e)} />
        <div className="box-margin-top-10 box-flex-between">
          <h6 className="box-text-nobold box-text-7 ">
            <ReviewTime time={props.data.updatedAt} />
          </h6>
          <FlagButton flagged={props.data.flagged} />
        </div>
      </div>

      <ReviewStats likesCount={props.data.likesCount} commentsCount={props.data.commentsCount} />
      <ReviewComments comments={props.data.comments} tab={tab} />
      <div className="box-margin-bottom-60"></div>
    </>
  )
}

const ReviewTags = ({ price, tags }) => {
  return (
    <div className="box-flex-row box-flex-wrap box-margin-15">
      <h6 className="box-tags box-text-7">{`$${price}`}</h6>
      {tags.map((tag) => {
        return <h6 key={tag._id} className="box-tags box-color-gray box-text-7 box-text-nobold">{tag.name}</h6>
      })}
    </div>
  )
}

const ReviewStats = ({ likesCount, commentsCount }) => {
  let likesString = likesCount === 1 ? '1 Like' : `${likesCount} Likes`
  let commentsString = commentsCount === 1 ? '1 Comment' : `${commentsCount} Comments`

  return (
    <div className="box-flex-acenter box-flex-between review-statsHeight box-border-bottom">
      <h6 className="box-text-bold">{commentsString}</h6>
      <h6 className="box-text-nobold box-text-7">{likesString}</h6>
    </div>
  )
}

const ReviewTime = ({ time }) => {
  let timeVal = new Date(time)
  let timeNow = new Date()

  let returnTime = timeVal.toLocaleString('default', { month: 'short' }) + " " + timeVal.getDate()
  if (timeVal.getFullYear() !== timeNow.getFullYear()) {
    returnTime = returnTime + " " + timeVal.getFullYear()
  }
  return returnTime
}

const ReviewPhotos = (props) => {
  return (
    <>{props.data.photos.map((photo, index) => {
      let altTxt = `${props.data.foodTitle}, ${props.data.address}, Image ${index}`
      return (
        <div className="box-expand-width box-flex-col box-position-relative" key={altTxt}>
          <img className="box-expand-width" src={photo ? photo : Photo} alt={altTxt} />
        </div>
      )
    })}</>
  )
}

const ReviewComments = ({ comments, tab }) => {
  return (
    <>{comments.map(comment => {
      let username = comment.user && comment.user.username ? comment.user.username : 'username'
      let image = comment.user && comment.user.image ? comment.user.image : Photo
      let likesString = comment.likes === 1 ? '1 like' : `${comment.likesCount} likes`
      return (
        <div key={comment._id}
          className="box-flex-row box-color-black box-margin-15">
          <Link to={`${tab}/a/${username}`} >
            <img src={image}
              className="card-userImage box-img box-margin-right-10"
              alt={username} />
          </Link>
          <div className="box-flex-1 box-display-inline">
            <Link to={`${tab}/a/${username}`}
              className="box-display-inline box-text-bold box-margin-right-5 box-text-6 box-color-black">
              {username}
            </Link>

            <h6 className="box-display-inline box-text-nobold box-margin-right-5">{comment.comment}</h6>

            <div className="box-text-8 box-color-gray box-margin-top-3">
              {likesString}
              {', '}
              {comment.updatedAt && <Ago time={comment.updatedAt} />}
            </div>
          </div>
          <LikeTrashButton isLiked={comment.isLiked} _id={comment._id} />
        </div>
      )
    })}</>
  )
}

const ReviewUserComment = (props) => {
  let params = props.match.params
  let tab = ''
  if (params.path) {
    if (params.path.indexOf('search') === 0) tab = '/search'
    else if (params.path.indexOf('saved') === 0) tab = '/saved'
    else if (params.path.indexOf('account') === 0) tab = '/account'
  }
  return (
    <>
      <ReviewStats likesCount={props.data.likesCount} commentsCount={props.data.commentsCount} />
      <ReviewComments comments={props.data.comments} tab={tab} />
      <ReviewInput />
      <div className="box-margin-bottom-60"></div>
    </>
  )
}

let data = {
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
  updatedAt: new Date(),

  price: 15,
  tags: [{ _id: 10, name: 'Example Tag1' }, { _id: 11, name: 'Example Tag2' }, { _id: 12, name: 'Example Tag3' }, { _id: 13, name: 'Example Tag4' }],
  ptsTaste: 5,
  ptsAppearance: 5,
  ptsTexture: 5,
  ptsAroma: 5,
  ptsBalance: 5,
  review: "Review of the food dish goes here. You can expect it to be a short but detailed review of the aspects of the food dish. While it may be a bit long, it will cover all the ratings such as taste, appearance, texture, aroma, balance, and other things about the food dish. This is just the beta version, but we will see how reviewers would like to discuss about their favorite food dish.",
  flagged: false,
  comments: [
    {
      _id: 123,
      user: { image: null, username: 'username1' },
      comment: 'Comment from user. It can be really long, or really short depending on what the user wants to say.',
      isLiked: false,
      likesCount: 5,
      updatedAt: new Date()
    }
  ]
}

export default connect(mapStateToProps)(Review)