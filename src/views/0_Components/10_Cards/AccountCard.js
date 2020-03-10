import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Photo from '../../../img/user.png'
import FollowButton from '../8_Buttons/FollowButton'

const AccountCard = (props) => {
  let username = props.username ? props.username : 'username'
  let [fCount, changeCount] = useState(props.followersCount)
  let followersTxt = fCount === 1 ? '1 follower' : `${fCount} followers`

  return (
    <div className="box-flex-stretch card-follow-margin">
      <Link to={`${props.tab}/a/${username}`}
        className="box-flex-acenter box-color-black box-flex-1" >
        <img src={props.image ? props.image : Photo}
          className="card-userImage-l box-img"
          alt={username} />
        <div className="box-flex-1 box-margin-15">
          <h6 className="box-text-bold">{username}</h6>
          <h6 className="box-text-nobold box-color-gray box-text-8">{props.name}</h6>
        </div>
        <h6 className="box-text-nobold box-text-8 box-color-gray box-margin-right-10">{followersTxt}</h6>
      </Link>
      <FollowButton className="" type="icon"
        username={props.username} isFollowing={props.isFollowing} changeCount={changeCount} />
    </div>
  )
}

export default AccountCard