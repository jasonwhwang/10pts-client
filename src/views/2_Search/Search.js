import React from 'react'
import './Search.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import List from '../0_Components/11_List/List'
import ErrorBoundary from '../0_Components/3_ErrorBoundary/ErrorBoundary'
import ListRow from '../0_Components/11_List/ListRow'

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
      query = this.props.location.search.replace("?q=", "").replace(/,/g, ", ").replace(/\+/g, ' ')
      this.props.changeVal("keywords", query)
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
                data={data}
                match={this.props.match}
                location={this.props.location} />
              :
              <ListRow
                data={data2}
                match={this.props.match}
                location={this.props.location} />
            }

          </ErrorBoundary>
        </div>
      </FadeTransition>
    )
  }
}

let data = [
  {
    photos: [null, null, null],
    foodname: "food-name1",
    foodTitle: "Food Name1",
    address: "City Hall, New York, NY",
    pts: 5,
    isSaved: false,
    savedCount: 7,
    reviewsCount: 9,
    hasReviewed: false
  },
  {
    photos: [null, null, null],
    foodname: "food-name2",
    foodTitle: "Food Name2",
    address: "City Hall, New York, NY",
    pts: 5,
    isSaved: false,
    savedCount: 7,
    reviewsCount: 9,
    hasReviewed: false
  },
  {
    photos: [null, null, null],
    foodname: "food-name3",
    foodTitle: "Food Name3",
    address: "City Hall, New York, NY",
    pts: 5,
    isSaved: false,
    savedCount: 7,
    reviewsCount: 9,
    hasReviewed: false
  }
]

let data2 = [
  {
    user: { image: null, username: "username1", isFollowing: false }
  },
  {
    user: { image: null, username: "username2", isFollowing: false }
  },
  {
    user: { image: null, username: "username3", isFollowing: false }
  }
]

export default connect(mapStateToProps, mapDispatchToProps)(Search)