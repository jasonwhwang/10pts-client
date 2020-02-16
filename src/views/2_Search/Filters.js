import React from 'react'
import './Search.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'

const mapStateToProps = state => ({
  search: state.search
})

const mapDispatchToProps = dispatch => ({
  changeVal: (type, val) =>
    dispatch({ type, val })
})

class Filters extends React.Component {
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
            <title>Filters</title>
            <meta name="description" content="Filters" />
          </Helmet></HelmetProvider>

          <div className="box-box">Filters</div>

        </div>
      </FadeTransition>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)