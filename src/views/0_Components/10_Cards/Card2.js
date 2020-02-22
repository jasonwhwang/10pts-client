import React from 'react'
import { Link } from 'react-router-dom'
import Photo from '../../../img/user.png'

const Card2 = ({ tab, photos, foodname, foodTitle, address, pts }) => {
  let photo = photos && photos[0] ? photos[0] : Photo
  return (
    <Link to={`${tab}/list#${foodname}`} className="list-item-2 box-border-bottom box-color-black">
      <div className="list-image-2 box-background">
        <img src={photo} className="box-img" alt={`${foodTitle}, ${address}, ${pts}`} />
      </div>
      <div className="box-flex-row list-description-2">
        <div className="box-flex-1">
          <h6 className="box-text-bold">{foodTitle}</h6>
          <h6 className="box-text-nobold box-text-7">{address}</h6>
        </div>
        <h6 className="box-margin-left-10 card-pts-small box-flex-row-center box-text-7">{pts}</h6>
      </div>
    </Link>
  )
}

Card2.defaultProps = {
  tab: "/search",
  photos: [null],
  foodname: "",
  foodTitle: "",
  address: "",
  pts: 0
}

export default Card2