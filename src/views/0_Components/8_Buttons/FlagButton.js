import React, { useState, useEffect } from 'react'
import { MoreHorizontal, Flag } from 'react-feather'
import { putData } from '../../../services/api'

const FlagButton = (props) => {
  let [showFlag, changeFlag] = useState(false)
  let [flagged, changeFlagged] = useState(false)
  let [loading, changeLoading] = useState(false)

  const initialize = () => {
    if(props.flagged) {
      changeFlag(true)
      changeFlagged(true)
    }
  }

  useEffect(initialize, [])

  const onFlag = async () => {
    if(loading) return
    changeLoading(true)
    let res = null
    if(flagged) res = await putData(`/${props.type}/unflag/${props.target}`)
    else res = await putData(`/${props.type}/flag/${props.target}`)
    if(!res || res.error || res.errors) return
    changeFlagged(res.isFlagged)
    changeLoading(false)
  }

  return (
    <div className="box-position-relative flagDropdown box-flex-row-center">
      {!flagged && !showFlag &&
        <button onClick={() => changeFlag(!showFlag)}
          className="box-expand-height box-expand-width box-flex-row-center">
          <MoreHorizontal size={14} />
        </button>
      }
      {showFlag &&
        <button onClick={onFlag}
          className="box-expand-height box-expand-width box-flex-row-center">
          <Flag size={14} className={flagged ? "box-fill-red box-color-red" : ""} />
        </button>
      }
    </div>
  )
}
FlagButton.defaultProps = { flagged: false }

export default FlagButton