import React from 'react'
import './Buttons.css'
import { Heart, Trash2 } from 'react-feather'
import { putData, deleteData } from '../../../services/api'

class LikeTrashButton extends React.Component {
  state = { isLiked: false }
  componentDidMount() {
    this.setState({ isLiked: this.props.isLiked })
  }
  onTrash = async () => {
    let res = await deleteData(`/comment/${this.props._id}`)
    if(!res || res.error || res.errors) return
    this.props.changeComments(res.comments)
  }
  onLike = async () => {
    let res = null
    if(this.state.isLiked) res = await putData(`/comment/unlike/${this.props._id}`)
    else res = await putData(`/comment/like/${this.props._id}`)
    if(!res || res.error || res.errors) return
    this.setState({ isLiked: res.isLiked })
    this.props.changeLikes(res.likesCount)
  }
  render() {
    if (this.props.showTrash) {
      return (
        <button onClick={this.onTrash}
          className={`defaultNav-button likeButton box-flex-row-center box-margin-left-10`}>
          <Trash2 size={12} />
        </button>
      )
    }

    return (
      <button onClick={this.onLike}
        className={`defaultNav-button likeButton box-flex-row-center box-margin-left-10`}>
        <Heart size={12} className={this.state.isLiked ? "box-fill-red box-color-red" : ""} />
      </button>
    )
  }
}

export default LikeTrashButton