import React from 'react'
import './Search.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'

const mapStateToProps = state => ({
  user: state.common.user
})

class Search extends React.Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    console.log(this.props.location.search)
    this.setState({ ...this.state, loading: false })
  }

  render() {
    if (this.state.loading) return <LoadingPage />

    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>Search</title>
            <meta name="description" content="Search" />
          </Helmet></HelmetProvider>

          <div className="box-box">Search</div>
          <div className="box-box">Search</div>
          <div className="box-box">Search</div>

        </div>
      </FadeTransition>
    )
  }
}

export default connect(mapStateToProps)(Search)