import React from 'react'
import './Account.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import List from '../0_Components/11_List/List'
import ListRow from '../0_Components/11_List/ListRow'
import ErrorBoundary from '../0_Components/3_ErrorBoundary/ErrorBoundary'
import Image from '../../img/user.png'
import { Link } from 'react-router-dom'
import FlagButton from '../0_Components/8_Buttons/FlagButton'
import { getData } from '../../services/api'
// import { ReviewData } from '../0_Components/Other/_data'

const mapStateToProps = state => ({
  authUser: state.common.user
})

class Account extends React.Component {
  state = {
    account: this.props.account,
    data: [],
    error: '',
    loading: true
  }

  initializeState = async () => {
    let params = this.props.match.params
    if (params.path.indexOf('account') !== -1 && !this.props.authUser) {
      this.props.history.push('/login')
      return
    }
    
    this.setState({ data: [], loading: true })
    let username = params.username ? params.username : this.props.authUser.username
    let route = params.route
    let res = null

    if (route === 'saved' || route === 'likes' || route === 'followers' || route === 'following') {
      res = await getData(`/account/${route}/${username}`)
    } else res = await getData(`/account/reviews/${username}`)

    if (res.error) this.setState({ account: this.props.account, data: [], error: res.error, loading: false })
    else this.setState({ account: res.account, data: res.data, error: '', loading: false })
  }

  componentDidMount() {
    this.initializeState()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) this.initializeState()
  }

  render() {
    if (this.state.loading) return <LoadingPage />

    let username = this.props.match.params.username ? this.props.match.params.username : null
    if (username === null && this.props.authUser) username = this.props.authUser.username
    let cLink = `${process.env.REACT_APP_url_LINK}/a/${username}`

    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>Account</title>
            <meta name="description" content="Account" />
            <link rel="canonical" href={cLink} />
          </Helmet></HelmetProvider>
          <ErrorBoundary>

            <AccountStats
              match={this.props.match}
              {...this.state.account} />

            <AccountDetails
              authUser={this.props.authUser}
              match={this.props.match}
              {...this.state.account} />

            <AccountTabs
              match={this.props.match} />

            <AccountList
              data={this.state.data}
              match={this.props.match}
              location={this.props.location} />

          </ErrorBoundary>
        </div>
      </FadeTransition>
    )
  }
}

Account.defaultProps = {
  account: {
    image: null,
    username: '',
    name: '',
    bio: '',
    reviewsCount: 0,
    savedCount: 0,
    followersCount: 0,
    isFlagged: false
  }
}

const AccountStats = (props) => {
  let params = props.match.params
  let tab = params.username ? `/${params.path}/${params.username}` : `/${params.path}`
  let reviewText = props.reviewsCount === 1 ? 'Review' : 'Reviews'
  let followerText = props.followersCount === 1 ? 'Follower' : 'Followers'
  return (
    <div className="box-flex-acenter box-margin-15">
      <img src={props.image ? props.image : Image}
        className="account-image box-img box-margin-right-10"
        alt={props.username} />
      <Link to={`${tab}`}
        className="box-flex-col-center box-flex-1 box-color-black">
        <h3 className="box-text-bold">{props.reviewsCount}</h3>
        <h6 className="box-text-nobold box-text-7">{reviewText}</h6>
      </Link>
      <Link to={`${tab}/saved`}
        className="box-flex-col-center box-flex-1 box-color-black">
        <h3 className="box-text-bold">{props.savedCount}</h3>
        <h6 className="box-text-nobold box-text-7">Saved</h6>
      </Link>
      <Link to={`${tab}/followers`}
        className="box-flex-col-center box-flex-1 box-color-black">
        <h3 className="box-text-bold">{props.followersCount}</h3>
        <h6 className="box-text-nobold box-text-7">{followerText}</h6>
      </Link>
    </div>
  )
}

const AccountDetails = (props) => {
  let isAuthUser = props.authUser && props.authUser.username === props.match.params.username
  return (
    <div className="box-margin-15">
      <h6 className="box-text-bold">{props.name ? props.name : props.username}</h6>
      <div className="box-flex-row box-margin-bottom-20">
        <h6 className="box-text-nobold box-text-prewrap account-allowSelect">
          {props.bio}
        </h6>

        {props.match.params.username && !isAuthUser &&
          <div className="box-flex-col box-flex-end">
            <FlagButton flagged={props.isFlagged} />
          </div>
        }
      </div>
    </div>
  )
}

const AccountTabs = (props) => {
  let params = props.match.params
  let tab = params.username ? `/${params.path}/${params.username}` : `/${params.path}`

  if (params.route === 'saved' || params.route === 'likes') {
    return (
      <div className="box-border-top box-border-bottom box-flex-stretch account-tabs">
        <Link to={`${tab}/saved`}
          className={`${params.route === 'saved' ? "saved-selected" : "saved-border"} box-color-black box-flex-row-center box-flex-1 box-text-8 box-text-bold`}>
          Saved
        </Link>
        <Link to={`${tab}/likes`}
          className={`${params.route === 'likes' ? "saved-selected" : "saved-border"} box-color-black box-flex-row-center box-flex-1 box-text-8 box-text-bold`}>
          Likes
        </Link>
      </div>
    )
  }
  if (params.route === 'followers' || params.route === 'following') {
    return (
      <div className="box-border-top box-border-bottom box-flex-stretch account-tabs">
        <Link to={`${tab}/followers`}
          className={`${params.route === 'followers' ? "saved-selected" : "saved-border"} box-color-black box-flex-row-center box-flex-1 box-text-8 box-text-bold`}>
          Followers
        </Link>
        <Link to={`${tab}/following`}
          className={`${params.route === 'following' ? "saved-selected" : "saved-border"} box-color-black box-flex-row-center box-flex-1 box-text-8 box-text-bold`}>
          Following
        </Link>
      </div>
    )
  }
  return <div className="box-border-bottom"></div>
}

const AccountList = (props) => {
  if (props.data.length <= 0) {
    return (
      <h6 className="box-color-gray box-text-nobold box-flex-row-center box-text-8 box-margin-15">
        None
      </h6>
    )
  }

  let route = props.match.params.route
  if (route === 'saved' || route === 'likes' || route === 'followers' || route === 'following') {
    return (
      <ListRow
        data={props.data}
        match={props.match}
        location={props.location} />
    )
  }
  return (
    <List
      data={props.data}
      match={props.match}
      location={props.location} />
  )
}

export default connect(mapStateToProps)(Account)