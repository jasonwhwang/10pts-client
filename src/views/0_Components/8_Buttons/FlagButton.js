import React, { useState, useEffect } from 'react'
import { MoreHorizontal, Flag } from 'react-feather'

const FlagButton = (props) => {
  let [showFlag, changeFlag] = useState(false)
  let [flagged, changeFlagged] = useState(false)

  const initialize = () => {
    if(props.flagged) {
      changeFlag(true)
      changeFlagged(true)
    }
  }

  useEffect(initialize, [])

  return (
    <div className="box-position-relative flagDropdown box-flex-row-center">
      {!flagged && !showFlag &&
        <button onClick={() => changeFlag(!showFlag)}
          className="box-expand-height box-expand-width box-flex-row-center">
          <MoreHorizontal size={14} />
        </button>
      }
      {showFlag &&
        <button onClick={() => changeFlagged(!flagged)}
          className="box-expand-height box-expand-width box-flex-row-center">
          <Flag size={14} className={flagged ? "box-fill-red box-color-red" : ""} />
        </button>
      }
    </div>
  )
}
FlagButton.defaultProps = { flagged: false }

export default FlagButton