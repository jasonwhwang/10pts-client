import React from 'react'
import { Link } from 'react-router-dom'
import Photo from '../../../img/user.png'
import SaveButton from '../8_Buttons/SaveButton'
import LikeButton from '../8_Buttons/LikeButton'

const CardRow1 = ({ tab, photos, user, foodname, foodTitle, address, pts, isLiked, isSaved }) => {
  let username = user && user.username ? `/${user.username}` : ""
  let linkPath = `${tab}/f/${foodname}${username}`

  let photo = photos && photos[0] ? photos[0] : Photo

  return (
    <div className="list-item-3 box-border-bottom box-flex-row box-color-black">
      <Link to={linkPath}
        className="list-saved-image box-background">
        <img src={photo} className="box-img" alt={`${foodTitle}, ${address}, ${pts}`} />
      </Link>

      <div className="box-flex-col box-flex-1">
        <Link to={linkPath}
          className="box-flex-row box-flex-1 box-padding-15 box-color-black">
          <div className="box-flex-1">
            <h5 className="box-text-bold">{foodTitle}</h5>
            <h6 className="box-text-nobold box-text-7">{address}</h6>
          </div>
          <h6 className="box-margin-left-10 card-pts-medium box-flex-row-center">{pts}</h6>
        </Link>

        <CardBottom user={user} isLiked={isLiked} isSaved={isSaved} tab={tab} />
      </div>
    </div>
  )
}

const CardBottom = ({ isLiked, isSaved, user, foodname, tab }) => {
  if (user) {
    return (
      <div className="box-flex-acenter card-list-bottom">
        <Link to={`${tab}/a/${user.username}`}
          className="box-flex-acenter box-color-black box-flex-1">
          <img className="box-img card-userImage-s box-margin-right-5"
            src={user.image ? user.image : Photo}
            alt={user.username} />
          <h6 className="box-text-bold box-text-7 box-flex-1">{user.username}</h6>
        </Link>
        <LikeButton isLiked={isLiked} foodname={foodname} username={user.username} />
      </div>
    )
  }

  return (
    <div className="box-flex-row card-list-bottom">
      <div className="box-text-nobold box-text-7 box-flex-1"></div>
      <SaveButton isSaved={isSaved} foodname={foodname} />
    </div>
  )
}

CardRow1.defaultProps = {
  photos: [null],
  foodname: "",
  foodTitle: "",
  address: "",
  pts: 0
}

export default CardRow1