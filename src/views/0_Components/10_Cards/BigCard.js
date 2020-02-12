import React from 'react'
import './Cards.css'
import FadeTransition from '../7_FadeTransition/FadeTransition'
import Carousel from '../9_Carousel/Carousel'
import Dots from '../9_Carousel/Dots'
import { Link } from 'react-router-dom'
import Image from '../../../img/user.png'

const BigCard = (props) => {
  return (
    <FadeTransition>
      <React.Fragment>
        <Heading {...props.user} path={props.path} />

        <div className="box-box">
          <Carousel widgets={[Dots]}>
            <div className="">Home</div>
            <div className="">Home</div>
            <div className="">Home</div>
          </Carousel>
        </div>

        <div>Heading</div>

        <div>buttons</div>

        <div>Likes & Comments</div>
      </React.Fragment>
    </FadeTransition>
  )
}

const Heading = ({ path, image, username, isFollowing }) => {
  return (
    <div className="box-flex-row box-flex-stretch">
      <Link to={`${path}/a/${username}`} className="box-flex-row-acenter box-flex-1">
        <img className="box-img bigCard-userImage" src={Image} alt={username} />
        <h6 className="box-text-bold box-margin-left-10">{username}</h6>
      </Link>

      <button className="box-text-8">Follow</button>
    </div>
  )
}

BigCard.defaultProps = {
  path: "",
  user: { image: null, username: "username", isFollowing: false },
  images: [null],
  foodname: "Food Name",
  location: "Location & Address",
  rating: 5,
  isLiked: false,
  isBookmarked: false,
  likes: 0,
  comments: 0
}

export default BigCard