import React from 'react'
import './Buttons.css'
import { Check, Plus } from 'react-feather'
import { putData } from '../../../services/api'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  authUser: state.common.user,
})

class FollowButton extends React.Component {
  state = { isFollowing: false, loading: false }
  componentDidMount() {
    this.setState({ ...this.state, isFollowing: this.props.isFollowing })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isFollowing !== this.props.isFollowing) {
      this.setState({ ...this.state, isFollowing: this.props.isFollowing })
    }
  }
  onClick = async () => {
    if (!this.props.authUser || this.state.loading) return
    await this.setStateAsync({ ...this.state, loading: true })
    let res = null
    if (!this.state.isFollowing) res = await putData(`/account/follow/${this.props.username}`)
    else res = await putData(`/account/unfollow/${this.props.username}`)
    if (res.error) return
    await this.setStateAsync({ isFollowing: res.isFollowing, loading: false })
    if (this.props.changeCount) this.props.changeCount(res.followersCount)
    if (this.props.changeFollowing) this.props.changeFollowing(this.props.username, res.isFollowing)
  }
  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  render() {
    if (this.props.type === 'icon') {
      return (
        <button onClick={this.onClick}
          className={`${this.props.className}
            ${this.props.username === this.props.authUser.username ? 'box-hide' : ''}
            ${this.state.isFollowing ? 'follow-blue' : 'button-default'}
            nav-padding10 box-text-8 box-text-bold box-flex-acenter`}>
          {this.state.isFollowing ? <Check size={12} /> : <Plus size={12} />}
        </button>
      )
    }

    return (
      <button onClick={this.onClick}
        className={`${this.props.className}
        ${this.props.username === this.props.authUser.username ? 'box-hide' : ''}
        ${this.state.isFollowing ? 'follow-blue' : 'button-default'}
        nav-padding10 box-text-8 box-text-bold box-flex-acenter`}>
        {this.state.isFollowing ? <Check size={12} /> : 'Follow'}
      </button>
    )
  }
}

export default connect(mapStateToProps)(FollowButton)