import React from 'react'
import './NavBar.css'
import FadeTransition from '../7_FadeTransition/FadeTransition'
import { Link } from 'react-router-dom'
import { X, ChevronLeft, ChevronRight } from 'react-feather'
import PostButton from '../8_Buttons/PostButton'

const NewNav = (props) => {
  let path = props.location.pathname.indexOf("/new") === 0 ? "/new" : `/edit/${props.match.params.foodname}`
  if (props.match.params.route === "details") return <DetailsNew history={props.history} path={path} />
  else if (props.match.params.route === "review") return <ReviewNew history={props.history} path={path} />
  else return <PhotosNew history={props.history} path={path} route={props.match.params.route} />
}

const PhotosNew = (props) => {
  return (
    <FadeTransition>
      <div className="navBar-wrapper box-expand-height box-flex-stretch">
        <button onClick={() => props.history.goBack()}
          className="box-flex-acenter nav-padding15 nav-buttonWidth defaultNav-button">
          {!props.route ?
            <X size={20} /> :
            <ChevronLeft size={24} />
          }
        </button>

        {!props.route &&
          <React.Fragment>
            <h6 className="box-text-bold box-flex-1 box-flex-row-center">Photos</h6>

            <Link to={`${props.path}/details`}
              className="box-flex-acenter box-flex-end chevron-right defaultNav-button">
              <ChevronRight size={24} />
            </Link>
          </React.Fragment>
        }
      </div>
    </FadeTransition>
  )
}

const DetailsNew = (props) => {
  return (
    <FadeTransition>
      <div className="navBar-wrapper box-expand-height box-flex-stretch">
        <button onClick={() => props.history.goBack()}
          className="box-flex-acenter chevron-left defaultNav-button">
          <ChevronLeft size={24} />
        </button>

        <h6 className="box-text-bold box-flex-1 box-flex-row-center">Details</h6>

        <Link to={`${props.path}/review`}
          className="box-flex-acenter box-flex-end chevron-right defaultNav-button">
          <ChevronRight size={24} />
        </Link>
      </div>
    </FadeTransition>
  )
}

const ReviewNew = (props) => {
  return (
    <FadeTransition>
      <div className="navBar-wrapper box-expand-height box-flex-stretch">
        <button onClick={() => props.history.goBack()}
          className="box-flex-acenter chevron-left defaultNav-button">
          <ChevronLeft size={24} />
        </button>

        <h6 className="box-text-bold box-flex-1 box-flex-row-center">Review</h6>

        <PostButton />
      </div>
    </FadeTransition>
  )
}

export default NewNav