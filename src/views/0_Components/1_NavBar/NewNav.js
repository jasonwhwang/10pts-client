import React from 'react'
import './NavBar.css'
import FadeTransition from '../7_FadeTransition/FadeTransition'
import { Link } from 'react-router-dom'
import { X, ChevronLeft, ChevronRight } from 'react-feather'

const NewNav = (props) => {
  let path = props.location.pathname.indexOf("/new") === 0 ? "/new" : `/edit/${props.match.params.foodname}`
  if (props.match.params.route === "details") return <DetailsNew history={props.history} path={path} />
  if (props.match.params.route === "review") return <ReviewNew history={props.history} path={path} />
  else return <PhotosNew history={props.history} path={path} />
}

const PhotosNew = (props) => {
  return (
    <FadeTransition>
      <div className="navBar-wrapper box-expand-height box-flex-stretch">
        <button onClick={() => props.history.goBack()}
          className="box-flex-row-acenter nav-padding15 nav-buttonWidth defaultNav-button">
          <X size={20} />
        </button>

        <h6 className="box-text-bold box-flex-1 box-flex-row-center">Photos</h6>

        <Link to={`${props.path}/details`}
          className="box-flex-row-acenter box-flex-end chevron-right defaultNav-button">
          <ChevronRight size={24} />
        </Link>
      </div>
    </FadeTransition>
  )
}

const DetailsNew = (props) => {
  return (
    <FadeTransition>
      <div className="navBar-wrapper box-expand-height box-flex-stretch">
        <button onClick={() => props.history.goBack()}
          className="box-flex-row-acenter chevron-left defaultNav-button">
          <ChevronLeft size={24} />
        </button>

        <h6 className="box-text-bold box-flex-1 box-flex-row-center">Details</h6>

        <Link to={`${props.path}/review`}
          className="box-flex-row-acenter box-flex-end chevron-right defaultNav-button">
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
          className="box-flex-row-acenter chevron-left defaultNav-button">
          <ChevronLeft size={24} />
        </button>

        <h6 className="box-text-bold box-flex-1 box-flex-row-center">Review</h6>

        <button
          className="box-flex-row-center chevron-right defaultNav-button box-text-extraBold box-text-6">
          Post
        </button>
      </div>
    </FadeTransition>
  )
}

export default NewNav