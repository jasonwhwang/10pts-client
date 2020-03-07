import React from 'react'
import './Saved.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import ListRow from '../0_Components/11_List/ListRow'
import ErrorBoundary from '../0_Components/3_ErrorBoundary/ErrorBoundary'
import { ReviewData, FoodData, NotificationData } from '../0_Components/Other/_data'

const mapStateToProps = state => ({
  user: state.common.user
})

class Saved extends React.Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    this.setState({ ...this.state, loading: false })
  }

  render() {
    if (this.state.loading) return <LoadingPage />

    let dataSource = FoodData
    if (this.props.match.params.path === 'saved/likes') dataSource = ReviewData
    else if (this.props.match.params.path === 'saved/following') dataSource = NotificationData

    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>Saved</title>
            <meta name="description" content="Saved" />
          </Helmet></HelmetProvider>
          <ErrorBoundary>

            <ListRow
              data={dataSource}
              location={this.props.location}
              match={this.props.match}
            />

          </ErrorBoundary>
        </div>
      </FadeTransition>
    )
  }
}

export default connect(mapStateToProps)(Saved)