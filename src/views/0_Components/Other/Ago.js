import React from 'react'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'

const en_s = (number, index) => {
  return [
    ['just now', 'right now'],
    ['just now', 'in %ss'],
    ['1m', 'in 1m'],
    ['%sm', 'in %sm'],
    ['1h', 'in 1h'],
    ['%sh', 'in %sh'],
    ['1d', 'in 1d'],
    ['%sd', 'in %sd'],
    ['1w', 'in 1w'],
    ['%sw', 'in %sw'],
    ['1mo', 'in 1mo'],
    ['%smo', 'in %smo'],
    ['1y', 'in 1yr'],
    ['%sy', 'in %syr'],
  ][index]
}
timeago.register('en_s', en_s)

const Ago = ({ time }) => {
  let timeVal = new Date(time)
  let timeNow = new Date()

  if (timeVal.getMonth() !== timeNow.getMonth()) {
    return timeVal.toLocaleString('default', { month: 'short' }) + " " + timeVal.getDate()
  } else if (timeVal.getFullYear() !== timeNow.getFullYear()) {
    return timeVal.toLocaleString('default', { month: 'short' }) + " " + timeVal.getDate() + " " + timeVal.getFullYear()
  } else return <TimeAgo datetime={timeVal} locale='en_s' live={true} />
}
Ago.defaultProps = {
  time: new Date()
}

export default Ago