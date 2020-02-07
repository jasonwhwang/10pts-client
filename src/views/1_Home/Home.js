import React from 'react'
import './Home.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'

const mapStateToProps = state => ({
  user: state.common.user
})

class Home extends React.Component {
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
            <title>10pts - Home</title>
            <meta name="description" content="10pts - Home" />
          </Helmet></HelmetProvider>

          <div className="test">Test</div>
          <div className="test">Test</div>
          <div className="test">Test</div>

        </div>
      </FadeTransition>
    )
  }
}

export default connect(mapStateToProps)(Home)