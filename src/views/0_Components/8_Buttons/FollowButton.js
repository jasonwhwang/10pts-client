import React from 'react'
import './Buttons.css'

class FollowButton extends React.Component {
  render() {
    return (
      <button className={`${this.props.className} nav-padding10 box-text-8 follow-blue box-text-bold`}>
        Follow
      </button>
    )
  }
}

export default FollowButton