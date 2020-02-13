import React from 'react'
import './Buttons.css'
import { Heart } from 'react-feather'

class LikeButton extends React.Component {
  render() {
    return (
      <button className={`${this.props.className} defaultNav-button nav-padding10`}>
        <Heart size={18} />
      </button>
    )
  }
}

export default LikeButton