import React from 'react'
import { Link } from 'react-router-dom'

const Card2 = ({ tab, foodname, foodTitle, address, pts }) => {
  return (
    <Link to={`${tab}/f/${foodname}`} className="list-item-2 box-border-bottom box-color-black">
      <div className="list-image-2 box-background"></div>
      <div className="box-flex-row list-description-2">
        <div className="box-flex-1">
          <h6 className="box-text-bold">{foodTitle}</h6>
          <h6 className="box-text-nobold box-text-7">{address}</h6>
        </div>
        <h6 className="box-margin-left-10 box-margin-right-3">{pts}</h6>
      </div>
    </Link>
  )
}

Card2.defaultProps = {
  tab: "/search",
  foodname: "food-name",
  foodTitle: "Food Name",
  address: "City Hall, New York, NY",
  pts: 5
}

export default Card2