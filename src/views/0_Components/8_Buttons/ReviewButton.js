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
  let pts = props.isReviewed || props.page.isReviewed
  let foodname = props.foodname || props.page.foodname
  let link = null
  if (!props.user) link = '/login'
  else link = `/f/${foodname}/${props.user.username}`

  return (
    <Link to={link}
      className="defaultNav-button nav-padding10">
      {pts === -1 ?
        <PlusSquare size={18} />
        :
        <h6 className="card-pts-small box-flex-row-center box-text-7">{pts}</h6>
      }
    </Link>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewButton)