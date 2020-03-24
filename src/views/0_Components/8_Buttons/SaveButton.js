import React, { useState } from 'react'
import './Buttons.css'
import { Bookmark } from 'react-feather'
import { putData } from '../../../services/api'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({
  user: state.common.user,
  page: state.page
})

const mapDispatchToProps = dispatch => ({
  changeVal: (type, val) =>
    dispatch({ type, val })
})

const SaveButton = (props) => {
  let [saved, changeSaved] = useState(props.isSaved)
  let [loading, changeLoading] = useState(false)
  let p = props.match.params

  const setSaved = (val) => {
    if(p.foodname) props.changeVal('isSaved', val)
    else changeSaved(val)
  }

  const onSave = async () => {
    if(loading) return
    changeLoading(true)
    let foodname = p.foodname ? props.page.foodname : props.foodname
    let res = null
    let savedVal = p.foodname ? props.page.isSaved : saved
    if(savedVal) res = await putData(`/food/unsave/${foodname}`)
    else res = await putData(`/food/save/${foodname}`)
    if(!res || res.error || res.errors) return
    setSaved(res.isSaved)
    if(props.changeSavedCount) props.changeSavedCount(res.savedCount)
    changeLoading(false)
  }

  let savedVal = p.foodname ? props.page.isSaved : saved

  return (
    <button onClick={onSave}
      className={`${props.className} defaultNav-button nav-padding10`}>
      <Bookmark size={18} className={savedVal ? "box-fill-gold box-color-gold" : ""} />
    </button>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SaveButton))