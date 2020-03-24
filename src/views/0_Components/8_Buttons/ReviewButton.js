import React from 'react'
import './Buttons.css'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
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
  let foodTitle = props.foodTitle || props.page.foodTitle
  let address = props.address || props.page.address
  let link = null
  if (!props.user) link = '/login'
  else if(pts && pts !== -1) link = `/f/${foodname}/${props.user.username}`
  else link = '/new'

  const redirectLink = () => {
    if(link === '/new') {
      props.changeVal('resetReview', null)
      props.changeVal('foodTitle', foodTitle)
      props.changeVal('address', address)
    }
    props.history.push(link)
  }

  return (
    <button onClick={redirectLink}
      className="defaultNav-button nav-padding10">
      {pts === -1 ?
        <PlusSquare size={18} />
        :
        <h6 className="card-pts-small box-flex-row-center box-text-7">{pts}</h6>
      }
    </button>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReviewButton))