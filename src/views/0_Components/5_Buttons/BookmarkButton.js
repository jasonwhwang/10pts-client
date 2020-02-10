import React from 'react'
import './Buttons.css'
import { Bookmark } from 'react-feather'

class BookmarkButton extends React.Component {
  render() {
    return (
      <button className={`${this.props.className} defaultNav-button nav-padding10`}>
        <Bookmark size={18} />
      </button>
    )
  }
}

export default BookmarkButton