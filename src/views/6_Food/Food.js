import React from 'react'
import './Food.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'

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

    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>Food</title>
            <meta name="description" content="Food" />
          </Helmet></HelmetProvider>

          <div className="box-box">Food</div>
          <div className="box-box">Food</div>
          <div className="box-box">Food</div>

        </div>
      </FadeTransition>
    )
  }
}

export default connect(mapStateToProps)(Food)