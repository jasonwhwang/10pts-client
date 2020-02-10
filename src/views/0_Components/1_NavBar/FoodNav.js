import React from 'react'
import './NavBar.css'
import FadeTransition from '../7_FadeTransition/FadeTransition'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ChevronLeft, Bookmark, Heart, MessageCircle, Edit } from 'react-feather'

const mapStateToProps = state => ({
  authUser: state.common.authUser,
  currentPage: state.common.currentPage
})

const FoodNav = (props) => {
  let foodname = props.match.params.foodname
  let username = props.match.params.username
  let authUsername = props.authUser && props.authUser.username ? props.authUser.username : null
  return (
    <FadeTransition>
      <div className="navBar-wrapper box-expand-height box-flex-stretch">
        <button onClick={() => props.history.goBack()}
          className="box-flex-row-acenter chevron-left defaultNav-button">
          <ChevronLeft size={24} />
        </button>

        <div className="box-flex-1 box-flex-row-center box-text-bold"></div>

        {!username &&
          <button className="defaultNav-button nav-padding10 box-margin-right-5">
            <Bookmark size={18} />
          </button>
        }

        {username && username !== authUsername &&
          <React.Fragment>
            <button className="defaultNav-button nav-padding10">
              <Heart size={18} />
            </button>
            <button className="defaultNav-button nav-padding10 box-margin-right-5">
              <MessageCircle size={18} />
            </button>
          </React.Fragment>
        }

        {username && username === authUsername &&
          <Link to={`/edit/${foodname}`}
            className="defaultNav-button nav-padding10 box-margin-right-5">
            <Edit size={18} />
          </Link>
        }
      </div>
    </FadeTransition>
  )
}

export default connect(mapStateToProps)(FoodNav)