import React from 'react'
import './Saved.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import ListRow from '../0_Components/11_List/ListRow'
import ErrorBoundary from '../0_Components/3_ErrorBoundary/ErrorBoundary'
// import { ReviewData, FoodData, NotificationData } from '../0_Components/Other/_data'
import { getData } from '../../services/api'

const mapStateToProps = state => ({
  user: state.common.user
})

class Saved extends React.Component {
  state = {
    data: [],
    loading: true,
    error: ''
  }
  componentDidMount() {
    this.initializeState()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) this.initializeState()
  }
  initializeState = async () => {
    if (!this.props.user) this.props.history.push('/login')
    this.setState({ data: [], loading: true, error: '' })
    let res = null, path = this.props.match.params.path, username = this.props.user.username

    if (path === 'saved/likes') res = await getData(`/account/likes/${username}`)
    else if (path === 'saved/following') res = await getData('/user/notifications')
    else res = await getData(`/account/saved/${username}`)
    
    if (res.error) this.setState({ data: [], loading: false, error: res.error })
    else this.setState({ data: res.data, loading: false, error: '' })
  }

  render() {
    if (this.state.loading) return <LoadingPage />

    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>Saved</title>
            <meta name="description" content="Saved" />
          </Helmet></HelmetProvider>
          <ErrorBoundary>

            {this.state.data.length > 0 ?
              <ListRow
                data={this.state.data}
                location={this.props.location}
                match={this.props.match}
              />
              :
              <h6 className="box-color-gray box-text-nobold box-flex-row-center box-text-8 box-margin-15">
                None
              </h6>
            }

          </ErrorBoundary>
        </div>
      </FadeTransition>
    )
  }
}

export default connect(mapStateToProps)(Saved)