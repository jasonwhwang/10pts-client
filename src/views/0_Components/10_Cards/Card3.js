import React from 'react'
import { Link } from 'react-router-dom'
import Photo from '../../../img/user.png'

const Card3 = ({ photos, user, foodname, foodTitle, address, pts, params }) => {
  let linkPath = params.path === 'account' ? '/account' : `/${params.path}/${user.username}`

  let photo = photos && photos[0] ? photos[0] : Photo
  return (
    <Link to={`${linkPath}/list#${foodname}-${user.username}`} className="list-item-3 box-border-bottom">
      <div className="list-image-3 box-background">
        <img src={photo} className="box-img" alt={`${foodTitle}, ${address}, ${pts}`} />
      </div>
    </Link>
  )
}

Card3.defaultProps = {
  photos: [null],
  user: { username: ""},
  foodname: "",
  foodTitle: "",
  address: "",
  pts: 0
}

export default Card3