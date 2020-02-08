import React from 'react'
import './NavBar.css'
import FadeTransition from '../7_FadeTransition/FadeTransition'
import { Link } from 'react-router-dom'
import { X, ChevronLeft, ChevronRight } from 'react-feather'

const NewNav = (props) => {
  if (props.match.params.route === "details") return <DetailsNew {...props} />
  if (props.match.params.route === "review") return <ReviewNew {...props} />
  else return <PhotosNew {...props} />
}

const PhotosNew = (props) => {
  return (
    <FadeTransition>
      <div className="navBar-wrapper box-expand-height box-flex-stretch">
        <button onClick={() => props.history.goBack()}
          className="box-flex-row-acenter defaultNav-buttonPadding">
          <X size={24} className="box-color-black" />
        </button>

        <h6 className="box-text-bold box-flex-1 box-flex-row-center">Photos</h6>

        <Link to="/new/details"
          className="box-flex-row-acenter box-flex-end chevron-right">
          <ChevronRight size={24} className="box-color-black" />
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
          className="box-flex-row-acenter chevron-left">
          <ChevronLeft size={24} className="box-color-black" />
        </button>

        <h6 className="box-text-bold box-flex-1 box-flex-row-center">Details</h6>

        <Link to="/new/review"
          className="box-flex-row-acenter box-flex-end chevron-right">
          <ChevronRight size={24} className="box-color-black" />
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
          className="box-flex-row-acenter chevron-left">
          <ChevronLeft size={24} className="box-color-black" />
        </button>

        <h6 className="box-text-bold box-flex-1 box-flex-row-center">Review</h6>

        <button
          className="box-flex-row-center chevron-right box-color-black box-text-extraBold box-text-6">
          Post
        </button>
      </div>
    </FadeTransition>
  )
}

export default NewNav