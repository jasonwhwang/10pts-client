import React from 'react'
import './NavBar.css'
import FadeTransition from '../7_FadeTransition/FadeTransition'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ChevronLeft, Edit } from 'react-feather'
import ShareButton from '../8_Buttons/ShareButton'
import LikeButton from '../8_Buttons/LikeButton'
import SaveButton from '../8_Buttons/SaveButton'
import CommentButton from '../8_Buttons/CommentButton'

const mapStateToProps = state => ({
  user: state.common.user,
  page: state.page
})

const FoodNav = (props) => {
  let foodname = props.match.params.foodname
  let username = props.match.params.username
  let authUsername = props.user && props.user.username ? props.user.username : null

  if (username) {
    return (
      <FadeTransition>
        <div className="navBar-wrapper box-expand-height box-flex-stretch">
          <button onClick={() => props.history.goBack()}
            className="box-flex-row-acenter chevron-left defaultNav-button">
            <ChevronLeft size={24} />
          </button>

          {username !== authUsername &&
            <div className="box-flex-1 box-flex-row-acenter box-flex-end box-margin-right-5">
              <LikeButton />
              <CommentButton foodname={foodname} username={username} />
              <ShareButton foodname={foodname} username={username} />
            </div>
          }

          {username === authUsername &&
            <div className="box-flex-1 box-flex-row-acenter box-flex-end box-margin-right-5">
              <Link to={`/edit/${foodname}`}
                className="defaultNav-button nav-padding10">
                <Edit size={18} />
              </Link>
              <ShareButton foodname={foodname} username={username} />
            </div>
          }
        </div>
      </FadeTransition>
    )
  }

  return (
    <FadeTransition>
      <div className="navBar-wrapper box-expand-height box-flex-stretch">
        <button onClick={() => props.history.goBack()}
          className="box-flex-row-acenter chevron-left defaultNav-button">
          <ChevronLeft size={24} />
        </button>

        <div className="box-flex-1 box-flex-row-center box-text-bold"></div>

        <ShareButton foodname={foodname} username={username} />
        <SaveButton className="box-margin-right-5"/>
      </div>
    </FadeTransition>
  )
}

export default connect(mapStateToProps)(FoodNav)