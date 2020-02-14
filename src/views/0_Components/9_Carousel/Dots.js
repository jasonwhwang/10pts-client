import React from 'react'

// https://github.com/amio/re-carousel/blob/master/src/indicator-dots.js

function Dot(props) {
  return (
    <div style={{
      height: props.selected ? '5px' : '4px',
      width: props.selected ? '5px' : '4px',
      borderRadius: '50%',
      backgroundColor: 'var(--black)',
      margin: '0px 2px',
      opacity: props.selected ? '1' : '0.3',
      transitionDuration: '300ms'
    }} />
  )
}

export default function Dots(props) {
  const wrapperStyle = {
    height: '40px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: '20',
    bottom: '-40px'
  }

  if (props.total < 2) {
    // Hide dots when there is only one dot.
    return <div style={wrapperStyle} />
  } else {
    return (
      <div style={wrapperStyle}>{
        Array.apply(null, Array(props.total)).map((x, i) => {
          return <Dot key={i} selected={props.index === i} />
        })
      }</div>
    )
  }
}