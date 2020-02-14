import React from 'react'
import './List.css'
import Card from '../10_Cards/Card'
import Card2 from '../10_Cards/Card2'

const List = (props) => {
  if (props.col === 1) return <OneList {...props} />
  else if (props.col === 2) return <TwoList {...props} />

  return null
}
List.defaultProps = {
  data: [null, null, null, null, null],
  col: 1,
  tab: '',
  params: {}
}

const OneList = ({ data, tab, params }) => {
  return (
    <React.Fragment>
      {data.map((foodItem, index) => {
        if (foodItem) return <Card {...foodItem} key={foodItem.foodname + index} tab={tab} params={params} />
        else return <Card key={"index" + index} tab={tab} params={params} />
      })}
    </React.Fragment>
  )
}

const TwoList = ({ data, tab, params }) => {
  return (
    <div className="list-grid-2 box-flex-1">
      <Card2 />
      <Card2 />
      <Card2 />
      <Card2 />

    </div>
  )
}

export default List