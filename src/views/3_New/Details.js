import React from 'react'
import './New.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import AutoSearch from '../0_Components/Other/AutoSearch'
import FoodInput from './FoodInput'
import PhotosList from './PhotosList'
import Tags from '../0_Components/6_Tags/Tags'
import ErrorBoundary from '../0_Components/3_ErrorBoundary/ErrorBoundary'

const mapStateToProps = state => ({
  review: state.review
})

const mapDispatchToProps = dispatch => ({
  changeVal: (type, val) =>
    dispatch({ type, val })
})

class Details extends React.Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    this.setState({ ...this.state, loading: false })
  }
  changeInput = (e) => {
    let value = e.target.value
    if (e.target.id === 'address') value = value.replace(/[^0-9A-Za-z&, ]/gi, '')
    else if (e.target.id === 'price') {
      value = value.replace(/[^0-9]/gi, '')
      if (!value || (value.length === 1 && value === '0')) value = ''
      else value = '$' + value
    }
    else if (e.target.id === 'foodTitle') value = value.replace(/[^A-Za-z ]/gi, '')
    this.props.changeVal(e.target.id, value)
  }
  changeAddress = (val) => { this.props.changeVal('address', val) }
  changeFood = (val) => { this.props.changeVal('foodTitle', val) }

  render() {
    if (this.state.loading) return <LoadingPage />

    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>Details</title>
            <meta name="description" content="Details" />
          </Helmet></HelmetProvider>
          <ErrorBoundary>

            <PhotosList photos={this.props.review.photos} changeVal={this.props.changeVal} />

            <AutoSearch
              address={this.props.review.address}
              changeInput={this.changeInput}
              changeAddress={this.changeAddress} />

            <div className="box-margin-15 box-flex-row-center">
              <FoodInput
                foodTitle={this.props.review.foodTitle}
                address={this.props.review.address}
                changeInput={this.changeInput}
                changeFood={this.changeFood} />
              <input
                id="price"
                placeholder="Price ($)"
                className="box-input review-price"
                value={this.props.review.price}
                onChange={this.changeInput}
              />
            </div>

            <div className="box-margin-15">
              <Tags
                borderColor={'border'}
                tags={this.props.review.tags}
                changeVal={this.props.changeVal}
                allowNew={true}
                type={'tags'} />
            </div>

          </ErrorBoundary>
        </div>
      </FadeTransition>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)