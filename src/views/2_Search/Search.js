import React from 'react'
import './Search.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import List from '../0_Components/11_List/List'
import ErrorBoundary from '../0_Components/3_ErrorBoundary/ErrorBoundary'
import ListRow from '../0_Components/11_List/ListRow'
import { FoodData, UserSearchData } from '../0_Components/Other/_data'

const mapStateToProps = state => ({
  category: state.search.category
})

const mapDispatchToProps = dispatch => ({
  changeVal: (type, val) =>
    dispatch({ type, val })
})

class Search extends React.Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    this.initializeState()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) this.initializeState()
  }
  componentWillUnmount() {
    this.props.changeVal("keywords", "")
  }

  initializeState = () => {
    let query = this.props.location.search
    if (query) {
      let q = new URLSearchParams(this.props.location.search).get('q')
      this.props.changeVal("keywords", q)
    }
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
          <ErrorBoundary>

            {!this.props.category ?
              <List
                data={FoodData}
                match={this.props.match}
                location={this.props.location} />
              :
              <ListRow
                data={UserSearchData}
                match={this.props.match}
                location={this.props.location} />
            }

          </ErrorBoundary>
        </div>
      </FadeTransition>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)