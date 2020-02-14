import React from 'react'
import './Buttons.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { PlusSquare } from 'react-feather'

const mapStateToProps = state => ({
  user: state.common.user,
  page: state.page
})

const mapDispatchToProps = dispatch => ({
  changeVal: (type, val) =>
    dispatch({ type, val })
})

const ReviewButton = (props) => {
  return (
    <Link to={`/f/${props.foodname}/${props.authUsername}`}
      className="defaultNav-button nav-padding10">
      <PlusSquare size={18} />
    </Link>
  )
}
ReviewButton.defaultProps = {
  authUsername: "AuthUsername",
  foodname: "PageFoodName"
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewButton)