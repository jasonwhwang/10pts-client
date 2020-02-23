import React from 'react'
import { Link } from 'react-router-dom'
import Photo from '../../../img/user.png'
import Ago from '../Other/Ago'

const Card5 = ({ tab, user, notification, review, updatedAt }) => {
  let username = user && user.username ? user.username : 'username'
  return (
    <div
      className="box-flex-row box-color-black box-margin-15">
      <Link to={`${tab}/a/${username}`} >
        <img src={user && user.image ? user.image : Photo}
          className="card-userImage box-img box-margin-right-10"
          alt={username} />
      </Link>
      <div className="box-flex-1 box-display-block">
        <Link to={`${tab}/a/${username}`}
          className="box-display-block box-text-bold box-margin-right-5 box-text-6 box-color-black">
          {username}
        </Link>
        <h6 className="box-display-block box-text-nobold box-margin-right-5">{notification}</h6>
        {review &&
          <Link to={`${tab}/f/${review.foodname}/${review.username}`}
            className="box-text-6 box-color-black" >
            {review.foodTitle}
          </Link>
        }
        <div className="box-text-8 box-color-gray box-margin-top-3">
          {updatedAt && <Ago time={updatedAt} />}
        </div>
      </div>
    </div>
  )
}

Card5.defaultProps = {
  photos: [null],
  foodname: "",
  foodTitle: "",
  address: "",
  pts: 0
}

export default Card5