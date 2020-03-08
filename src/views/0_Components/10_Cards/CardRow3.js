import React from 'react'
import { Link } from 'react-router-dom'
import Photo from '../../../img/user.png'
import FollowButton from '../8_Buttons/FollowButton'

const CardRow3 = (props) => {
  let username = props.username ? props.username : 'username'
  return (
    <div className="box-flex-stretch card-follow-margin">
      <Link to={`${props.tab}/a/${username}`}
        className="box-flex-acenter box-color-black box-flex-1" >
        <img src={props.image ? props.image : Photo}
          className="card-userImage-l box-img"
          alt={username} />
        <h6 className="box-text-bold box-flex-1 box-margin-15">{username}</h6>
      </Link>
      <FollowButton className="" username={props.username} isFollowing={props.isFollowing} />
    </div>
  )
}

export default CardRow3