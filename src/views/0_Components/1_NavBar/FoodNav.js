import React from 'react'
import './NavBar.css'
import FadeTransition from '../7_FadeTransition/FadeTransition'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ChevronLeft, Bookmark, Heart, MessageCircle, Edit, Send } from 'react-feather'

const mapStateToProps = state => ({
  user: state.common.user,
  currentPage: state.common.currentPage
})

const onShare = (foodname, username) => {
  let fName = foodname.replace(/-/g, ' ')
    .replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase() })

  if (navigator.share) {
    navigator.share({
      title: `10pts: ${fName}`,
      text: `Food review by ${username}.`,
      url: window.location.href,
    })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
  } else console.log("Not Supported")
}

const ShareButton = (props) => {
  if (navigator.share) {
    return (
      <button onClick={() => onShare(props.foodname, props.username)}
        className="defaultNav-button nav-padding10">
        <Send size={16} />
      </button>
    )
  } else {
    return null
  }
}

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
              <button className="defaultNav-button nav-padding10">
                <Heart size={18} />
              </button>
              <Link to={`/c/${foodname}/${username}`}
                className="defaultNav-button nav-padding10">
                <MessageCircle size={18} />
              </Link>
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
        <button className="defaultNav-button nav-padding10 box-margin-right-5">
          <Bookmark size={18} />
        </button>
      </div>
    </FadeTransition>
  )
}

export default connect(mapStateToProps)(FoodNav)