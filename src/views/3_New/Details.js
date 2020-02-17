import React from 'react'
import './New.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import AutoSearch from '../0_Components/Other/AutoSearch'

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
  changeInput = (e) => { this.props.changeVal(e.target.id, e.target.value) }
  changeAddress = (val) => { this.props.changeVal('address', val) }

  render() {
    if (this.state.loading) return <LoadingPage />

    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>Details</title>
            <meta name="description" content="Details" />
          </Helmet></HelmetProvider>

          <AutoSearch
            address={this.props.review.address}
            changeInput={this.changeInput}
            changeAddress={this.changeAddress} />

        </div>
      </FadeTransition>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)