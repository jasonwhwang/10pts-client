import React from 'react'
import './Account.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import List from '../0_Components/11_List/List'

const mapStateToProps = state => ({
  user: state.common.user
})

class Account extends React.Component {
  state = {
    data: null,
    loading: true
  }
  initializeState = async () => {
    if(this.props.location.pathname === "/account" && !this.props.user) {
      this.setState({ data: null, loading: false })
      return
    }
    
    this.setState({ data: null, loading: true })
    // Get User Account
    this.setState({ data: {}, loading: false })
  }

  componentDidMount() {
    // if(!this.props.user) this.props.history.push("/login")
    this.initializeState()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) this.initializeState()
  }

  render() {
    if (this.state.loading) return <LoadingPage />

    // let params = this.props.match.params
    // let linkUsername = params.username ? params.username : this.props.user.username
    // let route = params.route ? `/${params.route}` : ""
    // let cLink = `${process.env.REACT_APP_url_LINK}/a/${linkUsername}${route}`
    let cLink = `${process.env.REACT_APP_url_LINK}/account`

    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>Account</title>
            <meta name="description" content="Account" />
            <link rel="canonical" href={cLink} />
          </Helmet></HelmetProvider>

          <List
            data={data}
            match={this.props.match}
            location={this.props.location} />

        </div>
      </FadeTransition>
    )
  }
}

let data = [
  {
    user: { image: null, username: "username", isFollowing: false },
    photos: [null, null, null],
    foodname: "food-name1",
    foodTitle: "Food Name1",
    address: "City Hall, New York, NY",
    pts: 5,
    isLiked: false,
    isSaved: false,
    likesCount: 3,
    commentsCount: 5,
    updatedAt: new Date()
  },
  {
    user: { image: null, username: "username", isFollowing: false },
    photos: [null, null, null],
    foodname: "food-name2",
    foodTitle: "Food Name2",
    address: "City Hall, New York, NY",
    pts: 5,
    isLiked: false,
    isSaved: false,
    likesCount: 3,
    commentsCount: 5,
    updatedAt: new Date()
  },
  {
    user: { image: null, username: "username", isFollowing: false },
    photos: [null, null, null],
    foodname: "food-name3",
    foodTitle: "Food Name3",
    address: "City Hall, New York, NY",
    pts: 5,
    isLiked: false,
    isSaved: false,
    likesCount: 3,
    commentsCount: 5,
    updatedAt: new Date()
  }
]

export default connect(mapStateToProps)(Account)