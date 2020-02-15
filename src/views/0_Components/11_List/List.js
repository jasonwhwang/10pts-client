import React from 'react'
import './List.css'
import Card from '../10_Cards/Card'
import Card2 from '../10_Cards/Card2'

class List extends React.Component {
  async componentDidMount() {
    this.initializeState()
  }
  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) this.initializeState()
  }

  initializeState = async () => {
    await this.setState({})

    if(this.props.location.hash) {
      let divID = this.props.location.hash.replace("#", "")
      let divEL = document.getElementById(divID)
      if(divEL) {
        divEL.scrollIntoView({block: 'start'})
        window.scrollBy(0, -50)
      }
    }
  }

  render() {
    let col = 1
    if(this.props.match.params.path === "search") col = 2
    if (col === 1) return <OneList {...this.props} params={this.props.match.params} />
    else if (col === 2) return <TwoList {...this.props} params={this.props.match.params} />

    return null
  }
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
      {data.map((foodItem, index) => {
        if (foodItem) return <Card2 {...foodItem} key={foodItem.foodname + index} tab={tab} params={params} />
        else return <Card2 key={"index" + index} tab={tab} params={params} />
      })}
    </div>
  )
}

List.defaultProps = {
  data: [null, null, null],
  tab: ''
}

export default List