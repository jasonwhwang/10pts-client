import React from 'react'
import { Link } from 'react-router-dom'
import Photo from '../../../img/user.png'
import SaveButton from '../8_Buttons/SaveButton'
import LikeButton from '../8_Buttons/LikeButton'

const FoodRowCard = ({ tab, photos, account, foodname, foodTitle, address, pts, isLiked, isSaved }) => {
  if(!foodname) return null
  let username = account && account.username ? `/${account.username}` : ""
  let linkPath = `${tab}/f/${foodname}${username}`
  let photo = photos && photos[0] ? photos[0] : Photo
  let restaurant = address.split(',')[0]

  return (
    <div className="list-item-3 box-border-bottom box-flex-row box-color-black">
      <Link to={linkPath}
        className="list-saved-image box-background">
        <img src={photo} className="box-img" alt={`${foodTitle}, ${address}, ${pts}`} />
      </Link>

      <div className="box-flex-col box-flex-1">
        <Link to={linkPath}
          className="box-flex-row box-flex-1 box-color-black box-margin-top-10 box-margin-left-10 box-margin-right-10">
          <div className="box-flex-1">
            <h6 className="box-text-bold">{foodTitle}</h6>
            <h6 className="box-text-nobold box-text-7">{restaurant}</h6>
          </div>
          <h6 className="box-margin-left-10 card-pts-medium box-flex-row-center">{pts}</h6>
        </Link>

        <CardBottom account={account} isLiked={isLiked} isSaved={isSaved} tab={tab} />
      </div>
    </div>
  )
}

const CardBottom = ({ isLiked, isSaved, account, foodname, tab }) => {
  if (account) {
    return (
      <div className="box-flex-acenter card-list-bottom">
        <Link to={`${tab}/a/${account.username}`}
          className="box-flex-acenter box-color-black box-flex-1">
          <img className="box-img card-userImage-s box-margin-right-5"
            src={account.image ? account.image : Photo}
            alt={account.username} />
          <h6 className="box-text-bold box-text-8 box-flex-1">{account.username}</h6>
        </Link>
        <LikeButton isLiked={isLiked} foodname={foodname} username={account.username} />
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

FoodRowCard.defaultProps = {
  photos: [null],
  foodTitle: "",
  address: "",
  pts: 0
}

export default FoodRowCard