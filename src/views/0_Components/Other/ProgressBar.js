import React from 'react'
import './ProgressBar.css'

const ProgressBar = ({ pts, label }) => {
  return (
    <div className="box-margin-15 box-margin-top-20 box-flex-acenter box-flex-row">
      <h6 className="box-text-nobold box-text-8 reviewLabel-width box-flex-row box-flex-acenter">{label}</h6>
      <div className="box-margin-left-10 box-margin-right-10 box-flex-1 box-flex-row-center">
        <Bar percentage={pts*10}/>
      </div>
      <h6 className="box-flex-acenter box-flex-end reviewLabel-pts">{pts}</h6>
    </div>
  )
}

const Bar = (props) => {
  return (
    <div className="progress-bar box-flex-1">
      <Filler percentage={props.percentage} />
    </div>
  )
}
const Filler = (props) => {
  return <div className="filler" style={{ width: `${props.percentage}%` }} />
}

export default ProgressBar