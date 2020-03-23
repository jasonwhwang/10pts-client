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
  let divID = props.account ? props.foodname + "-" + props.account.username : props.foodname
  return (
    <FadeTransition>
      <div id={divID}>
        <AccountHeading account={props.account} tab={props.tab} changeFollowing={props.changeFollowing} />

        <Photos {...props} />

        <Buttons _id={props._id}
          isLiked={props.isLiked} isSaved={props.isSaved}
          isReviewed={props.isReviewed}
          foodname={props.foodname} account={props.account} />

        <FoodHeading {...props} />

        <StatsHeading
          likesCount={props.likesCount} commentsCount={props.commentsCount}
          savedCount={props.savedCount} reviewsCount={props.reviewsCount}
          time={props.updatedAt} params={props.params} account={props.account} />
      </div>
    </FadeTransition>
  )
}

const AccountHeading = ({ tab, account, changeFollowing }) => {
  if (!account) return null
  return (
    <div className="box-flex-row box-flex-stretch card-userHeading">
      <Link to={`${tab}/a/${account.username}`} className="box-flex-acenter box-flex-1 box-margin-left-10">
        <img className="box-img card-userImage"
          src={account.image ? account.image : Image}
          alt={account.username} />
        <h6 className="box-text-bold box-margin-left-10 box-color-black">{account.username}</h6>
      </Link>

      <FollowButton className="" username={account.username} isFollowing={account.isFollowing} changeFollowing={changeFollowing} />
    </div>
  )
}

const Photos = ({ photos, account, foodname, foodTitle, address, params, tab }) => {
  if(!photos) return null
  let pathLetter = params.path && (params.path === 'f' || params.path.indexOf("/f") !== -1) ? 'p' : 'f'
  let username = account && account.username ? `/${account.username}` : ""
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

const Buttons = ({ _id, isLiked, isSaved, isReviewed, foodname, account }) => {
  let username = account && account.username ? account.username : null
  return (
    <div className="card-buttons box-flex-row box-flex-stretch">
      {account &&
        <React.Fragment>
          <LikeButton isLiked={isLiked} _id={_id} />
          <CommentButton foodname={foodname} username={username} />
        </React.Fragment>
      }
      <ShareButton foodname={foodname} username={username} />
      {!account && <ReviewButton isReviewed={isReviewed} foodname={foodname} />}
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
  let username = props.account && props.account.username ? `/${props.account.username}` : ""

  let foodLink = `${props.tab}/f/${props.foodname}`
  let reviewLink = `${props.tab}/f/${props.foodname}${username}`
  let searchLink = `/search?${addressURL}`
  let mapLink = `${props.tab}/map?${addressURL}`

  return (
    <div className="card-foodHeading box-flex-row box-margin-bottom-20">
      <div className="box-flex-1 box-flex-col box-margin-right-20">
        <Link to={foodLink} className="box-text-4 box-text-bold box-color-black">{props.foodTitle}</Link>
        <Link to={searchLink} className="box-color-black box-text-5">{place}</Link>
        <Link to={mapLink} className="box-color-black box-text-6">{addressTxt}</Link>
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

const StatsHeading = ({ likesCount, commentsCount, savedCount, reviewsCount, time, params, account }) => {
  if (params.foodname) return null

  let likesString, commentsString, savedString, reviewsString
  if (account) {
    likesString = likesCount === 1 ? '1 like' : `${likesCount} likes`
    commentsString = commentsCount === 1 ? '1 comment' : `${commentsCount} comments`
  } else {
    savedString = savedCount === 1 ? '1 save' : `${savedCount} saves`
    reviewsString = reviewsCount === 1 ? '1 review' : `${reviewsCount} reviews`
  }
  let statsString = account ? likesString + ', ' + commentsString : savedString + ', ' + reviewsString

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