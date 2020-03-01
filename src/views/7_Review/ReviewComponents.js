import React from 'react'
import TextareaAutosize from 'react-autosize-textarea'
import { Send } from 'react-feather'
import Photo from '../../img/user.png'
import { Link } from 'react-router-dom'
import Ago from '../0_Components/Other/Ago'
import LikeTrashButton from '../0_Components/8_Buttons/LikeTrashButton'

export const ReviewStats = ({ likesCount, commentsCount }) => {
  let likesString = likesCount === 1 ? '1 Like' : `${likesCount} Likes`
  let commentsString = commentsCount === 1 ? '1 Comment' : `${commentsCount} Comments`

  return (
    <div className="box-flex-acenter box-flex-between review-statsHeight box-border-bottom">
      <h6 className="box-text-bold">{commentsString}</h6>
      <h6 className="box-text-nobold box-text-7">{likesString}</h6>
    </div>
  )
}

export const ReviewTime = ({ time }) => {
  let timeVal = new Date(time)
  let timeNow = new Date()

  let returnTime = timeVal.toLocaleString('default', { month: 'short' }) + " " + timeVal.getDate()
  if (timeVal.getFullYear() !== timeNow.getFullYear()) {
    returnTime = returnTime + " " + timeVal.getFullYear()
  }
  return returnTime
}

export const ReviewComments = ({ comments, tab }) => {
  return (
    <>{comments.map(comment => {
      let username = comment.user && comment.user.username ? comment.user.username : 'username'
      let image = comment.user && comment.user.image ? comment.user.image : Photo
      let likesString = comment.likes === 1 ? '1 like' : `${comment.likesCount} likes`
      return (
        <div key={comment._id}
          className="box-flex-row box-color-black box-margin-15">
          <Link to={`${tab}/a/${username}`} >
            <img src={image}
              className="card-userImage box-img box-margin-right-10"
              alt={username} />
          </Link>
          <div className="box-flex-1 box-display-inline">
            <Link to={`${tab}/a/${username}`}
              className="box-display-inline box-text-bold box-margin-right-5 box-text-6 box-color-black">
              {username}
            </Link>

            <h6 className="box-display-inline box-text-nobold box-margin-right-5">{comment.body}</h6>

            <div className="box-text-8 box-color-gray box-margin-top-3">
              {likesString}
              {', '}
              {comment.updatedAt && <Ago time={comment.updatedAt} />}
            </div>
          </div>
          <LikeTrashButton isLiked={comment.isLiked} _id={comment._id} />
        </div>
      )
    })}</>
  )
}

export const ReviewUserComment = (props) => {
  let params = props.match.params
  let tab = ''
  if (params.path) {
    if (params.path.indexOf('search') === 0) tab = '/search'
    else if (params.path.indexOf('saved') === 0) tab = '/saved'
    else if (params.path.indexOf('account') === 0) tab = '/account'
  }
  return (
    <>
      <ReviewStats likesCount={props.data.likesCount} commentsCount={props.data.commentsCount} />
      <ReviewComments comments={props.data.comments} tab={tab} />
      <ReviewInput />
      <div className="box-margin-bottom-60"></div>
    </>
  )
}

class ReviewInput extends React.Component {
  state = { comment: '' }
  changeInput = (e) => this.setState({ [e.target.id]: e.target.value })
  render() {
    return (
      <div className="box-border-top review-textarea box-flex-row">
        <TextareaAutosize rows={3} maxRows={10}
          id="comment"
          placeholder="Comment..."
          className="box-textarea box-text-5 box-flex-1 box-padding-15"
          value={this.state.comment}
          autoFocus={true}
          onChange={this.changeInput} />
        <div><button className="follow-blue send-margin">
          <Send size={18}/>
        </button></div>
      </div>
    )
  }
}
