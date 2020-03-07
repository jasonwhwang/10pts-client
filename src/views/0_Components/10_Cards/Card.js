import React from 'react'
import './Cards.css'
import FadeTransition from '../7_FadeTransition/FadeTransition'
import Carousel from '../9_Carousel/Carousel'
import Dots from '../9_Carousel/Dots'
import { Link } from 'react-router-dom'
import Image from '../../../img/user.png'
import FollowButton from '../8_Buttons/FollowButton'
import LikeButton from '../8_Buttons/LikeButton'
import SaveButton from '../8_Buttons/SaveButton'
import ShareButton from '../8_Buttons/ShareButton'
import CommentButton from '../8_Buttons/CommentButton'
import ReviewButton from '../8_Buttons/ReviewButton'
import Ago from '../Other/Ago'

const Card = (props) => {
  let divID = props.user ? props.foodname + "-" + props.user.username : props.foodname
  return (
    <FadeTransition>
      <div id={divID}>
        <UserHeading user={props.user} tab={props.tab} />

        <Photos {...props} />

        <Buttons
          isLiked={props.isLiked} isSaved={props.isSaved}
          hasReviewed={props.hasReviewed}
          foodname={props.foodname} user={props.user} />

        <FoodHeading {...props} />

        <StatsHeading
          likesCount={props.likesCount} commentsCount={props.commentsCount}
          savedCount={props.savedCount} reviewsCount={props.reviewsCount}
          time={props.updatedAt} params={props.params} user={props.user} />
      </div>
    </FadeTransition>
  )
}

const UserHeading = ({ tab, user }) => {
  if (!user) return null
  return (
    <div className="box-flex-row box-flex-stretch card-userHeading">
      <Link to={`${tab}/a/${user.username}`} className="box-flex-acenter box-flex-1 box-margin-left-10">
        <img className="box-img card-userImage"
          src={user.image ? user.image : Image}
          alt={user.username} />
        <h6 className="box-text-bold box-margin-left-10 box-color-black">{user.username}</h6>
      </Link>

      <FollowButton className="follow-blue" username={user.username} isFollowing={user.isFollowing} />
    </div>
  )
}

const Photos = ({ photos, user, foodname, foodTitle, address, params, tab }) => {
  let pathLetter = params.path && (params.path === 'f' || params.path.indexOf("/f") !== -1) ? 'p' : 'f'
  let username = user && user.username ? `/${user.username}` : ""
  return (
    <div className="box-box">
      <Carousel widgets={[Dots]}>
        {photos.map((fImg, index) => {
          let altTxt = `${foodTitle}, ${address}, Image ${index}`
          if (!fImg) {
            return (
              <Link key={altTxt} className="box-img box-display-block"
                to={`${tab}/${pathLetter}/${foodname}${username}`}>
                <img className="box-img" src={Image} alt={altTxt} key={altTxt} />
              </Link>
            )
          } else {
            return (
              <Link key={altTxt} className="box-img box-display-block"
                to={`${tab}/${pathLetter}/${foodname}${username}`}>
                <img className="box-img" src={fImg} alt={altTxt} key={altTxt} />
              </Link>
            )
          }
        })}
      </Carousel>
    </div>
  )
}

const Buttons = ({ isLiked, isSaved, hasReviewed, foodname, user }) => {
  let username = user && user.username ? user.username : null
  return (
    <div className="card-buttons box-flex-row box-flex-stretch">
      {user &&
        <React.Fragment>
          <LikeButton isLiked={isLiked} foodname={foodname} username={username} />
          <CommentButton foodname={foodname} username={username} />
        </React.Fragment>
      }
      <ShareButton foodname={foodname} username={username} />
      {!user && <ReviewButton hasReviewed={hasReviewed} />}
      <div className="box-flex-1"></div>
      <SaveButton isSaved={isSaved} foodname={foodname} />
    </div>
  )
}

const FoodHeading = (props) => {
  let searchParams = new URLSearchParams()
  searchParams.set('q', props.address.replace(/,/g, ""))

  let addressURL = props.address.split(",").map(txt => txt.trim())
  let place = addressURL.shift()
  let addressTxt = addressURL.join(", ")
  addressURL = searchParams.toString()
  let username = props.user && props.user.username ? `/${props.user.username}` : ""

  let foodLink = `${props.tab}/f/${props.foodname}`
  let reviewLink = `${props.tab}/f/${props.foodname}${username}`
  let searchLink = `/search?${addressURL}`
  let mapLink = `${props.tab}/map?${addressURL}`

  return (
    <div className="card-foodHeading box-flex-row">
      <div className="box-flex-1 box-flex-col">
        <Link to={foodLink} className="box-text-4 box-text-bold box-color-black">{props.foodTitle}</Link>
        <div className="box-flex-stretch">
          <Link to={searchLink} className="box-color-black box-text-5 card-subText">{place}</Link>
          <Link to={mapLink} className="box-color-black box-text-6 card-subText address-top">{addressTxt}</Link>
        </div>
      </div>

      <div className="box-flex-row">
        <Link to={reviewLink}
          className="card-pts box-flex-col-center box-color-white box-text-extraBold box-text-4">
          {props.pts}
        </Link>
      </div>
    </div>
  )
}

const StatsHeading = ({ likesCount, commentsCount, savedCount, reviewsCount, time, params, user }) => {
  if (params.foodname) return null

  let likesString, commentsString, savedString, reviewsString
  if (user) {
    likesString = likesCount === 1 ? '1 like' : `${likesCount} likes`
    commentsString = commentsCount === 1 ? '1 comment' : `${commentsCount} comments`
  } else {
    savedString = savedCount === 1 ? '1 save' : `${savedCount} saves`
    reviewsString = reviewsCount === 1 ? '1 review' : `${reviewsCount} reviews`
  }
  let statsString = user ? likesString + ', ' + commentsString : savedString + ', ' + reviewsString

  return (
    <h6 className="card-stats box-text-7 box-border-bottom box-color-gray box-text-nobold">
      {statsString}
      {time && ', '}
      {time && <Ago time={time} />}
    </h6>
  )
}

Card.defaultProps = {
  tab: "",
  photos: [null, null, null],
  foodname: "",
  foodTitle: "",
  address: "",
  pts: 0,
  isLiked: false,
  isSaved: false,
  likesCount: 0,
  commentsCount: 0,
  savedCount: 0,
  reviewsCount: 0,
  hasReviewed: false,
  updatedAt: ""
}

export default Card