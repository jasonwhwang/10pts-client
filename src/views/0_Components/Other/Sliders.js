import React from 'react'
import Slider from 'rc-slider/lib/Slider'
import Range from 'rc-slider/lib/Range'
import './Slider.css'

let scale = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const SearchPtsSlider = ({ minPts, maxPts, changeVal }) => {
  return (
    <div className="slider-wrapper">
      <div className="box-flex-row slider-labels">
        <h6 className="box-text-uppercase">Points</h6>
        <div className="box-flex-1"></div>
        <PtsLabel pts={minPts} />
        <h6>-</h6>
        <PtsLabel pts={maxPts} />
      </div>

      <div className="box-flex-row-center box-position-relative box-margin-bottom-5">
        <h3>{minPts}</h3>
        <h3 className="box-text-bold box-margin-left-3 box-margin-right-3">-</h3>
        <h3>{maxPts}</h3>
      </div>

      <div className="box-margin-left-5 box-margin-right-5">
        <Range value={[minPts, maxPts]} allowCross={false}
          min={0} max={10} pushable={true}
          onChange={(val) => {
            if (val[0] !== minPts) changeVal('minPts', val[0])
            if (val[1] !== maxPts) changeVal('maxPts', val[1])
          }}
        />
      </div>

      <div className="box-flex-between box-margin-top-10 scale-margin">
        {scale.map((index) => {
          return (
            <h6 key={index}
              className={`box-flex-row-center ${index === minPts || index === maxPts ? 'pts-selected' : 'pts-not'}`}>
              {index}
            </h6>
          )
        })}
      </div>
    </div>
  )
}

const SearchPriceSlider = ({ minPrice, maxPrice, changeVal }) => {
  return (
    <div className="slider-wrapper">
      <div className="box-flex-row slider-labels">
        <h6 className="box-text-uppercase">Price</h6>
      </div>

      <div className="box-flex-row-center box-position-relative box-margin-bottom-5">
        <h6>{'$' + minPrice}</h6>
        <h6 className="box-text-bold box-margin-left-3 box-margin-right-3">-</h6>
        <h6>{maxPrice === 100 ? '> $100' : '$' + maxPrice}</h6>
      </div>

      <div className="box-margin-left-5 box-margin-right-5">
        <Range value={[minPrice, maxPrice]} allowCross={false}
          min={0} max={100} step={10} pushable={true}
          onChange={(val) => {
            if (val[0] !== minPrice) changeVal('minPrice', val[0])
            if (val[1] !== maxPrice) changeVal('maxPrice', val[1])
          }}
        />
      </div>

      <div className="box-flex-between box-margin-top-10 box-margin-left-3">
        <h6 className={`box-flex-row-center ${minPrice === 0 ? 'pts-selected' : 'pts-not'}`}>
          $0
        </h6>
        <h6 className={`box-flex-row-center ${maxPrice === 100 ? 'pts-selected' : 'pts-not'}`}>
          {'> $100'}
        </h6>
      </div>
    </div>
  )
}

const ReviewPtsSlider = ({ pts, changeVal, type }) => {
  return (
    <div className="slider-wrapper">
      <div className="box-flex-between slider-labels">
        <h6 className="box-text-uppercase">Rating</h6>
        <PtsLabel pts={pts} />
      </div>

      <div className="box-flex-row-center box-position-relative box-margin-bottom-10">
        <h3 className="card-pts box-flex-row-center">{pts}</h3>
      </div>

      <div className="box-margin-left-5 box-margin-right-5">
        <Slider min={0} max={10}
          value={pts}
          onChange={(val) => changeVal(type, val)} />
      </div>

      <div className="box-flex-between box-margin-top-10 scale-margin">
        {scale.map((index) => {
          return (
            <h6 key={index}
              className={`box-flex-row-center ${pts === index ? 'pts-selected' : 'pts-not'}`}>
              {index}
            </h6>
          )
        })}
      </div>
    </div>
  )
}

const ReviewSmallSlider = ({ pts, changeVal, type, label }) => {
  return (
    <div className="slider-wrapper box-flex-acenter box-flex-row">
      <h6 className="box-text-nobold box-text-8 reviewLabel-width box-flex-row box-flex-acenter">{label}</h6>
      <div className="box-margin-left-10 box-margin-right-10 box-flex-1 box-flex-row-center">
        <Slider min={0} max={10}
          value={pts}
          onChange={(val) => changeVal(type, val)} />
      </div>
      <h6 className="box-flex-acenter box-flex-end reviewLabel-pts">{pts}</h6>
    </div>
  )
}

const PtsLabel = ({ pts }) => {
  if (pts === 0) return <h6>Hazard</h6>
  else if (pts === 1) return <h6>Danger</h6>
  else if (pts === 2) return <h6>Terrible</h6>
  else if (pts === 3) return <h6>Bad</h6>
  else if (pts === 4) return <h6>Average</h6>
  else if (pts === 5) return <h6>Good</h6>
  else if (pts === 6) return <h6>Delicious</h6>
  else if (pts === 7) return <h6>Extraordinary</h6>
  else if (pts === 8) return <h6>Topclass</h6>
  else if (pts === 9) return <h6>Masterclass</h6>
  else if (pts === 10) return <h6>Perfect</h6>
  return null
}

export {
  SearchPtsSlider,
  SearchPriceSlider,
  ReviewPtsSlider,
  ReviewSmallSlider
}