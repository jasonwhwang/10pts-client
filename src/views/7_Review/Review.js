import React from 'react'
import './Review.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import ErrorBoundary from '../0_Components/3_ErrorBoundary/ErrorBoundary'
import FlagButton from '../0_Components/8_Buttons/FlagButton'
import { CardRatings, PhotosList } from '../0_Components/10_Cards/CardRatings'
import { HideTabBarRoute } from '../0_Components/Other/HideTabBar'
import { ReviewStats, ReviewComments, ReviewTime, ReviewUserComment } from './ReviewComponents'
// import { ReviewMainData } from '../0_Components/Other/_data'
import { getData } from '../../services/api'

const mapStateToProps = state => ({
  user: state.common.user,
  likesCount: state.page.likesCount
})

const mapDispatchToProps = dispatch => ({
  changeVal: (type, val) =>
    dispatch({ type, val })
})

class Review extends React.Component {
  state = {
    review: null,
    loading: true
  }
  async componentDidMount() {
    let p = this.props.match.params
    let res = await getData(`/review/${p.foodname}/${p.username}`)
    if (!res || res.error || res.errors) {
      this.setState({ ...this.state, loading: false })
      return
    }
    this.setState({ ...this.state, review: res.review, loading: false })
    let page = {
      _id: res.review._id,
      isLiked: res.review.isLiked,
      isSaved: res.review.isSaved,
      likesCount: res.review.likesCount
    }
    this.props.changeVal('setPage', page)
  }
  changeComments = (comments) => {
    let review = this.state.review
    review.comments = comments
    this.setState({ ...this.state, review: review })
    window.scrollTo(0, document.body.scrollHeight)
  }

  render() {
    if (this.state.loading || !this.state.review) return <LoadingPage />

    let params = this.props.match.params
    let isMain = params.path === 'f' || params.path.indexOf('/f') !== -1
    let isPhotos = params.path === 'p' || params.path.indexOf('/p') !== -1
    let isComments = params.path === 'c' || params.path.indexOf('/c') !== -1

    let r = this.state.review
    let title = r ? `${r.foodTitle} | ${r.address} | ${this.props.match.params.username}` : 'Review'
    let description = r ? `${r.foodTitle} at ${r.address} reviewed by ${this.props.match.params.username}, 10pts` : 'Review'

    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            {params.path !== "f" &&
              <link rel="canonical" href={`${process.env.REACT_APP_url_LINK}/f/${params.foodname}/${params.username}`} />
            }
          </Helmet></HelmetProvider>
          <ErrorBoundary>
            <HideTabBarRoute location={this.props.location} match={this.props.match} />

            {isMain && <ReviewMain {...this.props} data={this.state.review} changeComments={this.changeComments} />}
            {isPhotos && <PhotosList {...this.props} data={this.state.review} />}
            {isComments && 
              <FadeTransition>
                <ReviewUserComment
                  {...this.props}
                  history={this.props.history}
                  user={this.props.user}
                  changeComments={this.changeComments}
                  data={this.state.review} />
              </FadeTransition>
            }

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
        <h5 className="box-text-nobold box-text-prewrap account-allowSelect box-flex-1 box-text-lineheight1">
          {props.data.review}
        </h5>
        <div className="box-margin-top-20 box-flex-between">
          <h6 className="box-text-nobold box-text-8 ">
            <ReviewTime time={props.data.updatedAt} />
          </h6>
          {props.user && props.data.account && props.user.username !== props.data.account.username &&
            <FlagButton
              flagged={props.data.isFlagged}
              type={'review'}
              target={props.data._id} />
          }
        </div>
      </div>

      <ReviewStats likesCount={props.likesCount} commentsCount={props.data.comments.length} />
      <ReviewComments comments={props.data.comments} tab={tab} changeComments={props.changeComments} user={props.user} />
      <div className="box-margin-bottom-60"></div>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)