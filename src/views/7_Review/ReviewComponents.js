import React, { useState } from 'react'
import TextareaAutosize from 'react-autosize-textarea'
import { Send } from 'react-feather'
import Photo from '../../img/user.png'
import { Link } from 'react-router-dom'
import Ago from '../0_Components/Other/Ago'
import LikeTrashButton from '../0_Components/8_Buttons/LikeTrashButton'
import Loading from '../0_Components/4_Loading/Loading'
import { postData } from '../../services/api'

export const ReviewStats = ({ likesCount, commentsCount }) => {
  let likesString = likesCount === 1 ? '1 like' : `${likesCount} likes`
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

export const ReviewComments = (props) => {
  return (
    <>{props.comments.map(comment => {
      return <ReviewComment comment={comment} {...props} key={comment._id} />
    })}</>
  )
}
export const ReviewComment = ({ user, comment, tab, changeComments }) => {
  let [likes, changeLikes] = useState(comment.likesCount)
  let username = comment.account && comment.account.username ? comment.account.username : 'username'
  let image = comment.account && comment.account.image ? comment.account.image : Photo
  let likesString = likes === 1 ? '1 like' : `${likes} likes`
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
      <LikeTrashButton
        isLiked={comment.isLiked}
        _id={comment._id}
        showTrash={user._id === comment.account._id}
        changeLikes={changeLikes}
        changeComments={changeComments} />
    </div>
  )
}

export const ReviewUserComment = (props) => {
  if (!props.user) props.history.push('/login')
  let params = props.match.params
  let tab = ''
  if (params.path) {
    if (params.path.indexOf('search') === 0) tab = '/search'
    else if (params.path.indexOf('saved') === 0) tab = '/saved'
    else if (params.path.indexOf('account') === 0) tab = '/account'
  }
  return (
    <>
      <ReviewStats likesCount={props.data.likesCount} commentsCount={props.data.comments.length} />
      <ReviewComments comments={props.data.comments} tab={tab} changeComments={props.changeComments} user={props.user} />
      <ReviewInput changeComments={props.changeComments} _id={props.data._id} />
      <div className="box-margin-bottom-60"></div>
    </>
  )
}

class ReviewInput extends React.Component {
  state = { comment: '', loading: false }
  changeInput = (e) => this.setState({ [e.target.id]: e.target.value })
  onComment = async () => {
    if (this.state.loading || !this.state.comment) return
    this.setState({ ...this.state, loading: true })
    let res = await postData(`/comment/${this.props._id}`, { comment: this.state.comment })
    if (!res || res.error || res.errors) this.setState({ ...this.state, loading: false })
    else {
      this.props.changeComments(res.comments)
      this.setState({ comment: '', loading: false })
    }
  }
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
        <div className="box-background-white">
          <button onClick={this.onComment}
            className="follow-blue send-margin">
            {this.state.loading ?
              <Loading small={true} />
              :
              <Send size={18} />}
          </button>
        </div>
      </div>
    )
  }
}
