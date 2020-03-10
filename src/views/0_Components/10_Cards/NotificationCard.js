import React from 'react'
import { Link } from 'react-router-dom'
import Photo from '../../../img/user.png'
import Ago from '../Other/Ago'

const NotificationCard = ({ type, review, from, createdAt }) => {
  if(!type) return null
  let username = from && from.username ? from.username : 'username'
  let image = from && from.image ? from.image : Photo
  let notification = ""
  if(type === 'like') notification = 'liked your review'
  else if(type === 'comment') notification = 'commented on your review'
  else if(type === 'follow') notification = 'is following you'
  else if(type === 'new') notification = 'has a new review'

  return (
    <div
      className="box-flex-row box-color-black box-margin-15">
      <Link to={`/saved/a/${username}`} >
        <img src={image}
          className="card-userImage box-img box-margin-right-10"
          alt={username} />
      </Link>
      <div className="box-flex-1 box-display-inline">
        <Link to={`/saved/a/${username}`}
          className="box-display-inline box-text-bold box-margin-right-5 box-text-6 box-color-black">
          {username}
        </Link>
        <h6 className="box-display-inline box-text-nobold box-margin-right-5">{notification}</h6>
        {review &&
          <Link to={`/saved/f/${review.foodname}/${review.username}`}
            className="box-text-6 box-color-black" >
            {review.foodTitle}
          </Link>
        }
        <div className="box-text-8 box-color-gray box-margin-top-3">
          {createdAt && <Ago time={createdAt} />}
        </div>
      </div>
    </div>
  )
}

export default NotificationCard