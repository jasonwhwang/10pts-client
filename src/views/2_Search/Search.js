import React from 'react'
import './Search.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import List from '../0_Components/11_List/List'
import ErrorBoundary from '../0_Components/3_ErrorBoundary/ErrorBoundary'
import ListRow from '../0_Components/11_List/ListRow'
// import { FoodData, UserSearchData } from '../0_Components/Other/_data'

const mapStateToProps = state => ({
  category: state.search.category,
  data: state.search.searchData,
  loading: state.search.searchLoading
})

class Search extends React.Component {
  render() {
    if (this.props.loading) return <LoadingPage />

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
                data={this.props.data}
                match={this.props.match}
                location={this.props.location} />
              :
              <ListRow
                data={this.props.data}
                match={this.props.match}
                location={this.props.location} />
            }

          </ErrorBoundary>
        </div>
      </FadeTransition>
    )
  }
}

export default connect(mapStateToProps)(Search)