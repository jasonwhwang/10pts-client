import React from 'react'
import './Loading.css'

const Loading = (props) => {
  return(
    <div className={`loading ${props.small ? "loading-s" : "loading-l"}`}>
      <div className={`loading-balls ${props.small ? "loading-sb" : "loading-lb"}`}>
        <div className={`loading-balls-item ${props.small ? "loading-sbi" : "loading-lbi"}`}></div>
        <div className={`loading-balls-item ${props.small ? "loading-sbi" : "loading-lbi"}`}></div>
        <div className={`loading-balls-item ${props.small ? "loading-sbi" : "loading-lbi"}`}></div>
      </div>
    </div>
  )
}

export default Loading