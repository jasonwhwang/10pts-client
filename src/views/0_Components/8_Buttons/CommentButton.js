import React from 'react'
import './Buttons.css'
import { Link } from 'react-router-dom'
import { MessageCircle } from 'react-feather'

const CommentButton = ({ foodname, username }) => {
  return (
    <Link to={`/c/${foodname}/${username}`}
      className="defaultNav-button nav-padding10">
      <MessageCircle size={18} />
    </Link>
  )
}

export default CommentButton