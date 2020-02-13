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

const BigCard = (props) => {
  return (
    <FadeTransition>
      <React.Fragment>
        <UserHeading {...props.user} path={props.path} />

        <Photos {...props} />

        <Buttons isLiked={props.isLiked} isSaved={props.isSaved}
          foodname={props.foodname} username={props.user.username} />

        <FoodHeading {...props} />

        <StatsHeading />
      </React.Fragment>
    </FadeTransition>
  )
}

const UserHeading = ({ path, image, username, isFollowing }) => {
  return (
    <div className="box-flex-row box-flex-stretch bigCard-userHeading">
      <Link to={`${path}/a/${username}`} className="box-flex-row-acenter box-flex-1 box-margin-left-10">
        <img className="box-img bigCard-userImage" src={image ? image : Image} alt={username} />
        <h6 className="box-text-bold box-margin-left-10 box-color-black">{username}</h6>
      </Link>

      <FollowButton className="" username={username} isFollowing={isFollowing} />
    </div>
  )
}

const Photos = ({ photos, user, foodname, foodnameTitle, address, path }) => {
  return (
    <div className="box-box">
      <Carousel widgets={[Dots]}>
        {photos.map((fImg, index) => {
          let altTxt = `${foodnameTitle}, ${address}, Image ${index}`
          if (!fImg) {
            return (
              <Link key={altTxt} className="box-img"
                to={`${path}/p/${foodname}/${user.username}`}></Link>
            )
          } else {
            return (
              <Link key={altTxt} className="box-img"
                to={`${path}/p/${foodname}/${user.username}`}>
                <img className="box-img" src={fImg} alt={altTxt} key={altTxt} />
              </Link>
            )
          }
        })}
      </Carousel>
    </div>
  )
}

const Buttons = ({ isLiked, isSaved, foodname, username }) => {
  return (
    <div className="bigCard-buttons box-flex-row box-flex-stretch box-margin-bottom-3">
      <LikeButton isLiked={isLiked} foodname={foodname} username={username} />
      <CommentButton foodname={foodname} username={username} />
      <ShareButton foodname={foodname} username={username} />
      <div className="box-flex-1"></div>
      <SaveButton isSaved={isSaved} foodname={foodname} />
    </div>
  )
}

const FoodHeading = (props) => {
  // let addressURL = props.address.replace(/, /g, ",").replace(/\s/g, '+')
  let addressURL = props.address.split(", ")
  let place = addressURL.shift()
  let addressTxt = addressURL.join(", ")
  addressURL = props.address.replace(/, /g, ",").replace(/\s/g, '+')
  console.log(addressURL)

  let foodLink = `${props.path}/f/${props.foodname}/${props.user.username}`
  let searchLink = `/search?q=${addressURL}`
  let mapLink = `${props.path}/m/${addressURL}`
  return (
    <div className="bigCard-foodHeading box-flex-row">
      <div className="box-flex-1 box-flex-col">
        <Link to={foodLink} className="box-text-4 box-text-bold box-color-black">{props.foodnameTitle}</Link>
        <div className="">
          <Link to={searchLink} className="box-color-black box-text-5 bigCard-subText">{place}</Link>
          <Link to={mapLink} className="box-color-black box-text-6 bigCard-subText">{addressTxt}</Link>
        </div>
      </div>

      <div className="box-flex-row">
        <Link to={foodLink}
          className="bigCard-pts box-flex-col-center box-color-white box-text-extraBold box-text-4">
          {props.pts}
        </Link>
      </div>
    </div>
  )
}

const StatsHeading = (props) => {
  return (
    <div className="bigCard-stats box-text-7 box-border-bottom box-color-gray">
      Likes, Comments, Time ago
    </div>
  )
}

BigCard.defaultProps = {
  path: "",
  user: { image: null, username: "username", isFollowing: false },
  photos: [Image, null, null],
  foodname: "food-name",
  foodnameTitle: "Food Name",
  address: "City Hall, New York, NY",
  pts: 5,
  isLiked: false,
  isSaved: false,
  likes: 0,
  comments: 0
}

export default BigCard