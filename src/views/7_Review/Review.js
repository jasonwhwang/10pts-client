import React from 'react'
import './Review.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import ErrorBoundary from '../0_Components/3_ErrorBoundary/ErrorBoundary'
import TextareaAutosize from 'react-autosize-textarea'
import FlagButton from '../0_Components/8_Buttons/FlagButton'
import { CardRatings, PhotosList } from '../0_Components/10_Cards/CardRatings'
import { HideTabBarRoute } from '../0_Components/Other/HideTabBar'
import { ReviewStats, ReviewComments, ReviewTime, ReviewUserComment } from './ReviewComponents'
// import { ReviewMainData } from '../0_Components/Other/_data'
import { getData } from '../../services/api'

const mapStateToProps = state => ({
  user: state.common.user
})

class Review extends React.Component {
  state = {
    review: null,
    loading: true
  }
  async componentDidMount() {
    let p = this.props.match.params
    let res = await getData(`/review/${p.foodname}/${p.username}`)
    if(!res || res.error || res.errors) this.setState({ ...this.state, loading: false })
    else this.setState({ ...this.state, review: res.review, loading: false })
  }

  render() {
    if (this.state.loading || !this.state.review) return <LoadingPage />

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
            <HideTabBarRoute location={this.props.location} match={this.props.match}/>

            {isMain && <ReviewMain {...this.props} data={this.state.review} />}
            {isPhotos && <PhotosList {...this.props} data={this.state.review} />}
            {isComments && <FadeTransition><ReviewUserComment {...this.props} data={this.state.review} /></FadeTransition>}

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
      <CardRatings data={props.data} tab={tab} params={params} />

      <div className="box-margin-top-40 box-border-top box-padding-15">
        <TextareaAutosize rows={3}
          id="review"
          placeholder="User review..."
          className="box-expand-width box-textarea box-text-5"
          value={props.data.review}
          disabled={true}
          onChange={(e) => console.log(e)} />
        <div className="box-margin-top-10 box-flex-between">
          <h6 className="box-text-nobold box-text-8 ">
            <ReviewTime time={props.data.updatedAt} />
          </h6>
          <FlagButton flagged={props.data.isFlagged} />
        </div>
      </div>

      <ReviewStats likesCount={props.data.likesCount} commentsCount={props.data.comments.length} />
      <ReviewComments comments={props.data.comments} tab={tab} />
      <div className="box-margin-bottom-60"></div>
    </>
  )
}

export default connect(mapStateToProps)(Review)