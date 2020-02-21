import React from 'react'
import './New.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import { ReviewPtsSlider } from '../0_Components/Other/Sliders'
import PhotosList from './PhotosList'

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

  render() {
    if (this.state.loading) return <LoadingPage />

    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>Review</title>
            <meta name="description" content="Review" />
          </Helmet></HelmetProvider>

          <PhotosList photos={this.props.review.photos} changeVal={this.props.changeVal} />

          <FoodLabels foodTitle={this.props.review.foodTitle} />

          <ReviewPtsSlider pts={this.props.review.pts} changeVal={this.props.changeVal} type={'pts'} />

        </div>
      </FadeTransition>
    )
  }
}

const FoodLabels = ({ foodTitle }) => {
  if(!foodTitle) return null
  return (
    <div className="box-margin-15">
      <h6 className="box-text-nobold box-text-7 box-color-gray box-margin-bottom-3">{foodTitle}</h6>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)