import React from 'react'
import './Buttons.css'
import { Send } from 'react-feather'

const onShare = (foodname, username) => {
  let fName = foodname.replace(/-/g, ' ')
    .replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase() })

  let shareText = username ? `Food review by ${username}.` : `${fName}, view on 10pts.`

  if (navigator.share) {
    navigator.share({
      title: `10pts: ${fName}`,
      text: shareText,
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

ShareButton.defaultProps = {
  foodname: "Food Name",
  username: "Username"
}

export default ShareButton