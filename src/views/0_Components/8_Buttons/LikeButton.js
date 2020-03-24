import React, { useState } from 'react'
import './Buttons.css'
import { Heart } from 'react-feather'
import { putData } from '../../../services/api'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({
  user: state.common.user,
  page: state.page
})

const mapDispatchToProps = dispatch => ({
  changeVal: (type, val) =>
    dispatch({ type, val })
})

const LikeButton = (props) => {
  let [liked, changeLiked] = useState(props.isLiked)
  let [loading, changeLoading] = useState(false)
  let p = props.match.params

  const setLiked = (val) => {
    if(p.username) props.changeVal('isLiked', val)
    else changeLiked(val)
  }

  const onLike = async () => {
    if(loading) return
    changeLoading(true)
    let _id = p.username ? props.page._id : props._id
    let res = null
    let likedVal = p.username ? props.page.isLiked : liked
    if(likedVal) res = await putData(`/review/unlike/${_id}`)
    else res = await putData(`/review/like/${_id}`)
    if(!res || res.error || res.errors) return
    setLiked(res.isLiked)
    if(props.changeLikesCount) props.changeLikesCount(res.likesCount)
    changeLoading(false)
  }

  let likedVal = p.username ? props.page.isLiked : liked

  return (
    <button onClick={onLike}
      className={`${props.className} defaultNav-button nav-padding10`}>
      <Heart size={18} className={likedVal ? "box-fill-red box-color-red" : ""} />
    </button>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LikeButton))