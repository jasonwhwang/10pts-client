import React from 'react'
import './Search.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import List from '../0_Components/11_List/List'

const mapStateToProps = state => ({
  user: state.common.user
})

class Search extends React.Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    // console.log(this.props.location.search)
    this.setState({ ...this.state, loading: false })
  }

  render() {
    if (this.state.loading) return <LoadingPage />

    return (
      <FadeTransition>
        <div className="page box-flex-col">
          <HelmetProvider><Helmet>
            <title>Search</title>
            <meta name="description" content="Search" />
          </Helmet></HelmetProvider>

          <List tab={'/search'} params={this.props.match.params} col={2} />

        </div>
      </FadeTransition>
    )
  }
}

export default connect(mapStateToProps)(Search)