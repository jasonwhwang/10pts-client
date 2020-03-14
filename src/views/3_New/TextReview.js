import React from 'react'
import './New.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import { ReviewPtsSlider, ReviewSmallSlider } from '../0_Components/Other/Sliders'
import PhotosList from './PhotosList'
import TextareaAutosize from 'react-autosize-textarea'
import ErrorBoundary from '../0_Components/3_ErrorBoundary/ErrorBoundary'
import ListErrors from '../0_Components/Other/ListErrors'
import DeleteButton from '../0_Components/8_Buttons/DeleteButton'

const mapStateToProps = state => ({
  review: state.review
})

const mapDispatchToProps = dispatch => ({
  changeVal: (type, val) =>
    dispatch({ type, val })
})

class Review extends React.Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    this.setState({ ...this.state, loading: false })
  }
  changeInput = (e) => { this.props.changeVal(e.target.id, e.target.value) }

  render() {
    if (this.state.loading) return <LoadingPage />

    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>Review</title>
            <meta name="description" content="Review" />
          </Helmet></HelmetProvider>
          <ErrorBoundary>
            
            <ReviewErrors reviewErrors={this.props.review.reviewErrors} />

            <PhotosList photos={this.props.review.photos} changeVal={this.props.changeVal} />

            <FoodLabels foodTitle={this.props.review.foodTitle} address={this.props.review.address} />

            <ReviewPtsSlider pts={this.props.review.pts} changeVal={this.props.changeVal} type={'pts'} />

            <div className="review-spacing">
              <ReviewSmallSlider
                pts={this.props.review.ptsTaste}
                changeVal={this.props.changeVal}
                type={'ptsTaste'}
                label={'Taste'} />
            </div>

            <ReviewSmallSlider
              pts={this.props.review.ptsAppearance}
              changeVal={this.props.changeVal}
              type={'ptsAppearance'}
              label={'Appearance'} />

            <ReviewSmallSlider
              pts={this.props.review.ptsTexture}
              changeVal={this.props.changeVal}
              type={'ptsTexture'}
              label={'Texture'} />

            <ReviewSmallSlider
              pts={this.props.review.ptsAroma}
              changeVal={this.props.changeVal}
              type={'ptsAroma'}
              label={'Aroma'} />

            <ReviewSmallSlider
              pts={this.props.review.ptsBalance}
              changeVal={this.props.changeVal}
              type={'ptsBalance'}
              label={'Balance'} />

            <div className="box-margin-top-40 box-border-top box-padding-15">
              <TextareaAutosize rows={3}
                id="review"
                placeholder="Add your review..."
                className="box-expand-width box-textarea box-text-5"
                value={this.props.review.review}
                onChange={this.changeInput} />
            </div>

            <DeleteButton />

          </ErrorBoundary>
        </div>
      </FadeTransition>
    )
  }
}

const FoodLabels = ({ foodTitle, address }) => {
  if (!foodTitle || !address) return null
  return (
    <div className="review-heading">
      <span className="box-text-7 box-margin-right-10 box-text-bold">{foodTitle}</span>
      <span className="box-text-7 box-text-nobold">{address}</span>
    </div>

  )
}

const ReviewErrors = ({ reviewErrors }) => {
  if(!reviewErrors) return null

  return (
    <FadeTransition>
      <div className="box-border-bottom errorPadding">
        <ListErrors errors={reviewErrors} />
      </div>
    </FadeTransition>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)