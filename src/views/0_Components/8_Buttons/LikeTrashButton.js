import React from 'react'
import './Buttons.css'
import { Heart } from 'react-feather'

class LikeTrashButton extends React.Component {
  render() {
    if (this.props._id) {
      // If username matches user, show delete button
      return (
        <button className={`defaultNav-button likeButton box-flex-row-center box-margin-left-10`}>
          <Heart size={12} />
        </button>
      )
    }

    return (
      <button className={`defaultNav-button likeButton box-flex-row-center box-margin-left-10`}>
        <Heart size={12} />
      </button>
    )
  }
}

export default LikeTrashButton